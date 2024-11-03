"use client";
import { AlertModal } from "@/components/shared/alert-modal";
import TooltipWrapper from "@/components/shared/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteWorkflow } from "@/lib/react-queries";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const WorkflowCardActions = ({ workflowId }: { workflowId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useDeleteWorkflow();

  const onDelete = async () => {
    toast.loading("Deleting workflow...", { id: "mutation" });
    mutate(workflowId);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <TooltipWrapper content={"More actions"}>
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onSelect={() => setIsOpen(true)}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertModal isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onDelete} />
    </>
  );
};
