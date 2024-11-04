import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import React, { ReactNode } from "react";
import NodeParamField from "./node-param-field";

type NodeInputsProps = {
  children: ReactNode;
};

export const NodeInputs = (props: NodeInputsProps) => {
  return <div className="flex flex-col divide-y gap-2">{props.children}</div>;
};

type NodeInputProps = {
  input: TaskParam;
  nodeId: string;
};

const NodeInput = ({ input, nodeId }: NodeInputProps) => {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4"
          )}
        />
      )}
    </div>
  );
};

export default NodeInput;
