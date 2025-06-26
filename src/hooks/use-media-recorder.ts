import { useRef } from "react"

import { audioToText } from "~apis"
import { AUDIO_TO_TEXT_INTERVAL_TIME } from "~constants"

interface UseMediaRecorderProps {
  playAudio: boolean
  onNewText?: (text: string, timeText: string) => void
  isNeedMaxRecordingTime?: boolean
}

const useMediaRecorder = ({ playAudio, onNewText, isNeedMaxRecordingTime = true }: UseMediaRecorderProps) => {
  const streamRef = useRef<MediaStream | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const stopRecordRef = useRef(false)
  const mediaRecorderTimeRef = useRef<NodeJS.Timeout>(null)
  const startTimeRef = useRef<Date | null>(null)
  const endTimeRef = useRef<Date | null>(null)
  // const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const lastNonSilentTimeRef = useRef<Date | null>(null)
  const maxRecordingTimeRef = useRef<NodeJS.Timeout | null>(null)

  const startRecording = (stream: MediaStream) => {
    stopRecordRef.current = false
    streamRef.current = stream
    startTimeRef.current = new Date()
    lastNonSilentTimeRef.current = new Date()

    const audioContext = new AudioContext()
    const sourceNode = audioContext.createMediaStreamSource(streamRef.current)
    const destinationNode = audioContext.createMediaStreamDestination()
    const gainNode = audioContext.createGain()

    sourceNode.connect(gainNode)
    if (playAudio) {
      gainNode.connect(audioContext.destination)
    }
    gainNode.connect(destinationNode)

    analyserRef.current = audioContext.createAnalyser()
    analyserRef.current.fftSize = 2048
    gainNode.connect(analyserRef.current)

    const combinedStream = destinationNode.stream
    mediaRecorderRef.current = new MediaRecorder(combinedStream, {
      mimeType: "audio/webm"
    })

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
    }

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" })
      const file = new File([blob], `recording-${Date.now()}.webm`, {
        type: "audio/webm"
      })
      chunksRef.current = []

      const hasSound = await analyzeRecording(blob)
      if (hasSound) {
        const timeText = `[${formatTime(startTimeRef.current)} - ${formatTime(endTimeRef.current)}]`
        uploadAudioFile(file, timeText)
      }

      if (!stopRecordRef.current) {
        mediaRecorderRef.current.start()
        startTimeRef.current = new Date()
        lastNonSilentTimeRef.current = new Date()
        setupMaxRecordingTime()
      }
    }

    mediaRecorderRef.current.start()
    // detectSilence()
    setupMaxRecordingTime()
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null

      mediaRecorderRef.current.stop()
      endTimeRef.current = new Date()
      stopRecordRef.current = true
      if (mediaRecorderTimeRef.current) {
        clearTimeout(mediaRecorderTimeRef.current)
      }
      if (maxRecordingTimeRef.current) {
        clearTimeout(maxRecordingTimeRef.current)
      }
    }
  }

  const setupMaxRecordingTime = () => {
    if (!isNeedMaxRecordingTime) return

    if (maxRecordingTimeRef.current) {
      clearTimeout(maxRecordingTimeRef.current)
    }

    maxRecordingTimeRef.current = setTimeout(() => {
      endTimeRef.current = new Date()
      mediaRecorderRef.current?.stop()
    }, +AUDIO_TO_TEXT_INTERVAL_TIME)
  }

  const analyzeRecording = async (blob: Blob): Promise<boolean> => {
    const audioContext = new AudioContext()
    const arrayBuffer = await blob.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
    const rawData = audioBuffer.getChannelData(0)

    const threshold = 0.01
    const hasSound = rawData.some((sample) => Math.abs(sample) > threshold)

    return hasSound
  }

  const formatTime = (date: Date) => date.toTimeString().split(" ")[0]

  const uploadAudioFile = async (file: File, timeText: string) => {
    const result = await audioToText(file)
    if (!result.text) {
      return
    }
    onNewText(result.text, timeText)

    return { startRecording, stopRecording }
  }

  return { startRecording, stopRecording }
}

export default useMediaRecorder
