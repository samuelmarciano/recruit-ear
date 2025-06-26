import { HeadsetIcon, SpeechIcon } from "lucide-react"
import noData from "raw:~assets/images/no_data.svg"
import React, { useEffect, useRef } from "react"

import MarkdownPreviewer from "~components/markdown-previewer"
import { Avatar, AvatarFallback } from "~components/ui/avatar"
import { Button } from "~components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~components/ui/resizable"
import { ScrollArea } from "~components/ui/scroll-area"
import { cn } from "~lib/utils"
import type { MessageItem } from "~types"

interface RecordingStateProps {
  isRecording: boolean
  messages: MessageItem[]
  hints: string[]
  onStop: () => void
  onContinue: () => void
}

const RecordingState = ({ isRecording, messages = [], hints, onStop, onContinue }: RecordingStateProps) => {
  const messageContainerRef = useRef(null)
  const hintContainerRef = useRef(null)

  useEffect(() => {
    const messageScrollContainer = messageContainerRef.current.querySelector("div[data-radix-scroll-area-viewport]")
    if (messages) {
      messageScrollContainer.scrollTo({
        top: messageScrollContainer.scrollHeight,
        behavior: "instant"
      })
    }
  }, [messages])

  return (
    <div className="monsterpi13-w-full monsterpi13-h-full monsterpi13-flex monsterpi13-flex-col">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={60} minSize={25}>
          <div className="monsterpi13-flex monsterpi13-flex-col monsterpi13-h-full monsterpi13-items-center monsterpi13-py-2">
            <div className="monsterpi13-flex monsterpi13-w-full monsterpi13-items-center monsterpi13-bg-background monsterpi13-px-4 monsterpi13-py-3 monsterpi13-border-b monsterpi13-border-border">
              <div className="monsterpi13-font-medium monsterpi13-text-xl">Captions</div>
            </div>
            <ScrollArea
              className="monsterpi13-relative monsterpi13-flex-1 monsterpi13-h-full monsterpi13-bg-muted monsterpi13-w-full"
              ref={messageContainerRef}>
              <div className="monsterpi13-grid monsterpi13-overflow-hidden monsterpi13-p-4 monsterpi13-gap-4">
                {messages.length === 1 && (
                  <div className="monsterpi13-absolute monsterpi13-inset-0 monsterpi13-w-full monsterpi13-h-full monsterpi13-flex monsterpi13-items-center monsterpi13-justify-center">
                    <img src={noData} width="50%" height="50%" className="monsterpi13-w-auto monsterpi13-h-1/2" />
                  </div>
                )}

                {messages.map(
                  (item, index) =>
                    item.recorderRole && (
                      <div
                        key={`${item.recorderRole}_${item.id}_${index}`}
                        className={cn(
                          "monsterpi13-flex monsterpi13-items-start monsterpi13-gap-4",
                          item.recorderRole === "recruiter" && "monsterpi13-flex-row-reverse"
                        )}>
                        <Avatar className="monsterpi13-w-10 monsterpi13-h-10 monsterpi13-rounded-full">
                          <AvatarFallback
                            className={cn(
                              item.recorderRole === "candidate" ? "monsterpi13-bg-secondary" : "monsterpi13-bg-primary"
                            )}>
                            {item.recorderRole === "candidate" && (
                              <SpeechIcon className="monsterpi13-w-5 monsterpi13-h-5 monsterpi13-text-white" />
                            )}
                            {item.recorderRole === "recruiter" && (
                              <HeadsetIcon className="monsterpi13-w-5 monsterpi13-h-5" />
                            )}
                          </AvatarFallback>
                        </Avatar>

                        <div
                          className={cn(
                            "monsterpi13-grid monsterpi13-gap-1 monsterpi13-bg-card monsterpi13-p-4 monsterpi13-rounded-md"
                          )}>
                          <div className="monsterpi13-font-bold monsterpi13-text-card-foreground">
                            <div
                              className={cn(
                                "monsterpi13-flex monsterpi13-items-baseline monsterpi13-gap-2",
                                item.recorderRole === "recruiter" && "monsterpi13-flex-row-reverse"
                              )}>
                              <div className="monsterpi13-font-bold monsterpi13-text-base">{item.recorderRole}:</div>
                            </div>
                            <div className="monsterpi13-max-w-prose monsterpi13-text-card-foreground">
                              {item.content}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40} minSize={25}>
          <div className="monsterpi13-flex monsterpi13-flex-col monsterpi13-h-full monsterpi13-items-center monsterpi13-py-2">
            <div className="monsterpi13-flex monsterpi13-w-full monsterpi13-items-center monsterpi13-bg-secondary monsterpi13-text-white monsterpi13-px-4 monsterpi13-py-3 monsterpi13-border-b monsterpi13-border-border">
              <div className="monsterpi13-font-medium monsterpi13-text-xl">Suggestions</div>
            </div>
            <div className="monsterpi13-flex monsterpi13-gap-6 monsterpi13-flex-col monsterpi13-w-full monsterpi13-h-full monsterpi13-pb-10">
              <ScrollArea
                className="monsterpi13-flex-1 monsterpi13-bg-primary monsterpi13-relative monsterpi13-h-full monsterpi13-w-full"
                ref={hintContainerRef}>
                <div className="monsterpi13-grid monsterpi13-overflow-hidden monsterpi13-p-4 monsterpi13-gap-4">
                  {hints.length === 0 && (
                    <div className="monsterpi13-absolute monsterpi13-inset-0 monsterpi13-w-full monsterpi13-h-full monsterpi13-flex monsterpi13-items-center monsterpi13-justify-center">
                      <img src={noData} width="50%" height="50%" className="monsterpi13-w-auto monsterpi13-h-1/2" />
                    </div>
                  )}

                  {hints.length !== 0 &&
                    hints.slice(0, 2).map((hint, index) => (
                      <div key={`${hint}_${index}`} className={cn("suggestion-card", index % 2 === 0 ? "recruiter" : "")}>
                        <div className="suggestion-content">{hint}</div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <div className="monsterpi13-flex monsterpi13-items-center monsterpi13-justify-center monsterpi13-gap-4 monsterpi13-p-6">
        {isRecording ? (
          <div className="recording-button recording" onClick={onStop}>
            Stop recording
          </div>
        ) : (
          <div className="recording-button not-recording" onClick={onContinue}>
            Continue recording
          </div>
        )}
      </div>
    </div>
  )
}

export default RecordingState