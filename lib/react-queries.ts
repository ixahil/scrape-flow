import { CreateWorkflowAction } from "@/actions/workflows/create-workflow";
import { DeleteWorkflow } from "@/actions/workflows/delete-workflow";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  successToast: string;
  errorToast: string;
};

export const useCreateWorkflow = () => {
  return useMutation({
    mutationFn: CreateWorkflowAction,
    onSuccess: () => {
      toast.success("Workflow created!", { id: "mutation" });
    },
    onError: () => {
      toast.error("Failed to create workflow", { id: "mutation" });
    },
  });
};

export const useDeleteWorkflow = () => {
  return useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted!", { id: "mutation" });
    },
    onError: () => {
      toast.error("Failed to delete a workflow", { id: "mutation" });
    },
  });
};
