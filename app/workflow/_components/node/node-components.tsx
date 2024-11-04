import { TaskRegistry } from "@/lib/workflow/task/register";
import { AppNodeData } from "@/types/appNode";
import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import NodeInput, { NodeInputs } from "./node-inputs";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;

  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} input={input} nodeId={props.id} />
        ))}
      </NodeInputs>
    </NodeCard>
  );
});

NodeComponent.displayName = "NodeComponent";

export default NodeComponent;
