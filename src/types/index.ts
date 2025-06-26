export type RecorderRole = "recruiter" | "candidate"

export type role = "user" | "assistant" | "system"

export interface MessageItem {
  id?: string
  role: role
  content: string
  recorderRole?: RecorderRole
}
