"use client";
import { AppNode, ParamProps } from "@/types/appNode";
import { TaskParam, TaskParamType } from "@/types/task";
import { useReactFlow } from "@xyflow/react";
import StringParam from "./params/string-param";
import { useCallback } from "react";

type Props = { param: TaskParam; nodeId: string };

const NodeParamField = ({ param, nodeId }: Props) => {
  const { updateNodeData, getNode } = useReactFlow();

  const node = getNode(nodeId) as AppNode;

  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [nodeId, updateNodeData, param.name, node?.data.inputs]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          update={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
