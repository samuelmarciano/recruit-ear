import Groq from "groq-sdk"

import { API_KEY } from "~constants"
import type { MessageItem } from "~types"

const groqInstance = new Groq({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true
})

export async function audioToText(file: File) {
  const transcription = await groqInstance.audio.transcriptions.create({
    file,
    model: "whisper-large-v3",
    prompt: "Specify context or spelling",
    response_format: "json",
    language: "en",
    temperature: 0.0
  })
  return transcription
}

export async function fetchAIMessage(chatHistory: MessageItem[]) {
  try {
    const response = await groqInstance.chat.completions.create({
      model: "llama3-70b-8192",
      messages: chatHistory,
      temperature: 1.2
    })
    return response
  } catch (e) {
    console.error(e)
    return e
  }
}
