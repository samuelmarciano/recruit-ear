import { useCallback, useEffect, useRef, useState } from "react"

import "~style.css"
import "~styles/interview-panel.css"

import { fetchAIMessage } from "~apis"
import { Button } from "~components/ui/button"
import { FETCH_SUGGESTION_INTERVAL_TIME, QUESTION_SUGGESTION_SYSTEM_PROMPT } from "~constants"
import useMediaRecorder from "~hooks/use-media-recorder"
import type { MessageItem } from "~types"
import RecordingState from "~views/interview-panel-page/recording-state"

const systemPrompt: MessageItem = {
  role: "system",
  content: QUESTION_SUGGESTION_SYSTEM_PROMPT
}

function InterviewPanelPage() {
  const tabStreamRef = useRef<MediaStream | null>(null)
  const voiceStreamRef = useRef<MediaStream | null>(null)
  const intervalTime = useRef(+FETCH_SUGGESTION_INTERVAL_TIME)
  const [isRecording, setIsRecording] = useState(false)
  const [isShownStatePanel, setIsShownStatePanel] = useState(false)

  const [messages, setMessages] = useState<MessageItem[]>([systemPrompt])
  const messagesRef = useRef<MessageItem[]>(messages)
  const [hints, setHints] = useState<string[]>([])

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleNewAudioTextAdded = useCallback((text: string) => {
    setMessages((messages) => [
      ...messages,
      {
        id: new Date().getTime().toString(),
        role: "user",
        content: text,
        recorderRole: "candidate"
      }
    ])
  }, [])

  const handleNewVoiceTextAdded = useCallback((text: string, timeText: string) => {
    setMessages((messages) => [
      ...messages,
      {
        id: new Date().getTime().toString(),
        role: "user",
        content: text,
        recorderRole: "recruiter"
      }
    ])
  }, [])

  const { startRecording: startAudioRecording, stopRecording: stopAudioRecording } = useMediaRecorder({
    playAudio: true,
    onNewText: handleNewAudioTextAdded
  })

  const { startRecording: startVoiceRecording, stopRecording: stopVoiceRecording } = useMediaRecorder({
    playAudio: false,
    onNewText: handleNewVoiceTextAdded
  })

  const handleClickStartButton = async () => {
    // Look for the state of the authorization of the microphone
    try {
      const permission = await navigator.permissions.query({
        // @ts-ignore
        name: "microphone"
      })
      if (permission.state === "denied") {
        alert("Microphone permission was denied. Please enable it in your browser settings.")
        return
      }

      if (permission.state === "prompt") {
        chrome.windows.create({
          url: "./tabs/authorize-microphone.html",
          type: "popup",
          width: 400,
          height: 400
        })
        return
      }
    } catch (e) {
      console.log(e)
    }

    setIsShownStatePanel(true)
    setIsRecording(true)
    recordAudio()
    recordVoice()
  }

  const handleClickContinueButton = () => {
    setIsRecording(true)
    recordAudio()
    recordVoice()
    startInterval()
  }

  const handleClickStopButton = () => {
    setIsRecording(false)
    stopAudioRecording()
    stopVoiceRecording()
    tabStreamRef.current = null
    voiceStreamRef.current = null
    stopInterval()
  }

  const recordAudio = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    const tabId = tabs[0].id

    chrome.tabCapture.getMediaStreamId(
      {
        targetTabId: tabId
      },
      async (streamId) => {
        tabStreamRef.current = await navigator.mediaDevices.getUserMedia({
          audio: {
            // @ts-ignore
            mandatory: {
              chromeMediaSource: "tab",
              chromeMediaSourceId: streamId
            }
          },
          video: false
        })

        startAudioRecording(tabStreamRef.current)
      }
    )
  }

  const recordVoice = async () => {
    voiceStreamRef.current = await navigator.mediaDevices.getUserMedia({
      audio: true
    })
    startVoiceRecording(voiceStreamRef.current)
  }

  const fetchHints = useCallback(async () => {
    const messages = messagesRef.current
    if (messages.length <= 1) return

    try {
      const _messages = messages.map((message) => ({
        role: message.role,
        content:
          message?.recorderRole === "candidate"
            ? `Candidate Response: ${message.content}`
            : message?.recorderRole === "recruiter"
              ? `Question: ${message.content}`
              : message.content
      }))
      const response = await fetchAIMessage(_messages)

      const suggestion = response.choices[0].message.content

      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: suggestion
        }
      ])
      setHints((hints) => [suggestion, ...hints])
    } catch (error) {
      console.error(error)
    }
  }, [])

  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      fetchHints()
    }, intervalTime.current)
  }, [messages])

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [intervalRef.current])

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  useEffect(() => {
    if (isShownStatePanel) startInterval()
    else stopInterval()

    return () => stopInterval()
  }, [isShownStatePanel])

  return (
    <div className="monsterpi13-absolute monsterpi13-inset-0 monsterpi13-h-full monsterpi13-w-full monsterpi13-flex monsterpi13-items-center monsterpi13-justify-center">
      {isShownStatePanel ? (
        <RecordingState
          messages={messages}
          hints={hints}
          onStop={handleClickStopButton}
          onContinue={handleClickContinueButton}
          isRecording={isRecording}
        />
      ) : (
        <div className="monsterpi13-flex monsterpi13-flex-col monsterpi13-gap-y-3">
          <Button size="lg" onClick={handleClickStartButton}>
            Start recording
          </Button>
        </div>
      )}
    </div>
  )
}

export default InterviewPanelPage
