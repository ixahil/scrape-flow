"use client";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React, { ReactNode } from "react";

type Props = {
  nodeId: string;
  children: ReactNode;
  isSelected: boolean;
};

const NodeCard = (props: Props) => {
  const { getNode, setCenter } = useReactFlow();

  const handleViewportCenter = () => {
    const node = getNode(props.nodeId);
    if (!node) return;
    const { position, measured } = node;
    if (!position || !measured) return;
    const { width, height } = measured;
    const x = position.x + width! / 2;
    const y = position.y + height! / 2;

    if (x === undefined || y === undefined) return;

    setCenter(x, y, {
      zoom: 1,
      duration: 500,
    });
  };

  return (
    <div
      onDoubleClick={handleViewportCenter}
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs flex flex-col gap-1",
        props.isSelected && "border-primary"
      )}
    >
      {props.children}
    </div>
  );
};

export default NodeCard;
