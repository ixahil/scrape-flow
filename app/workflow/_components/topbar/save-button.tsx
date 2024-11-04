"use client";

import { Button } from "@/components/ui/button";
import { useUpdateWorkflow } from "@/lib/react-queries";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon, Loader2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  workflowId: string;
};

const SaveButton = ({ workflowId }: Props) => {
  const { toObject } = useReactFlow();

  const { mutate, isPending } = useUpdateWorkflow();

  const handleSave = () => {
    toast.loading("Saving workflow...", { id: "mutation" });
    const workflowDefinition = JSON.stringify(toObject());
    mutate({ id: workflowId, definition: workflowDefinition });
  };

  return (
    <Button
      disabled={isPending}
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={handleSave}
    >
      {isPending ? (
        <Loader2 size={16} className="stroke-green-400" />
      ) : (
        <CheckIcon size={16} className="stroke-green-400" />
      )}
      Save
    </Button>
  );
};

export default SaveButton;
