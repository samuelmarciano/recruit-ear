import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "~/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "monsterpi13-flex monsterpi13-h-full monsterpi13-w-full data-[panel-group-direction=vertical]:monsterpi13-flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "monsterpi13-relative monsterpi13-flex monsterpi13-w-px monsterpi13-items-center monsterpi13-justify-center monsterpi13-bg-border after:monsterpi13-absolute after:monsterpi13-inset-y-0 after:monsterpi13-left-1/2 after:monsterpi13-w-1 after:monsterpi13--translate-x-1/2 focus-visible:monsterpi13-outline-none focus-visible:monsterpi13-ring-1 focus-visible:monsterpi13-ring-ring focus-visible:monsterpi13-ring-offset-1 data-[panel-group-direction=vertical]:monsterpi13-h-px data-[panel-group-direction=vertical]:monsterpi13-w-full data-[panel-group-direction=vertical]:after:monsterpi13-left-0 data-[panel-group-direction=vertical]:after:monsterpi13-h-1 data-[panel-group-direction=vertical]:after:monsterpi13-w-full data-[panel-group-direction=vertical]:after:monsterpi13--translate-y-1/2 data-[panel-group-direction=vertical]:after:monsterpi13-translate-x-0 [&[data-panel-group-direction=vertical]>div]:monsterpi13-rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="monsterpi13-z-10 monsterpi13-flex monsterpi13-h-4 monsterpi13-w-3 monsterpi13-items-center monsterpi13-justify-center monsterpi13-rounded-sm monsterpi13-border monsterpi13-bg-border">
        <GripVertical className="monsterpi13-h-2.5 monsterpi13-w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
