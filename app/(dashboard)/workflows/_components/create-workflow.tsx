"use client";
import { CommonForm } from "@/components/shared/common-form";
import Modal from "@/components/shared/modal";
import { createWorkflowFormControls } from "@/config/forms/forms-data";
import { useCreateWorkflow } from "@/lib/react-queries";
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from "@/schema/workflows";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {};

const CreateWorkflow = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CreateWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useCreateWorkflow();

  const onSubmit = useCallback(
    async (values: CreateWorkflowSchemaType) => {
      toast.loading("Creating workflow...", { id: "mutation" });
      const response = mutate(values);
      form.reset();
    },
    [mutate]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} triggerText="Create Workflow">
      <CommonForm
        form={form}
        formControls={createWorkflowFormControls}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default CreateWorkflow;
