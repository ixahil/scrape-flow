"use server";

import prisma from "@/lib/prisma";
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from "@/schema/workflows";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const CreateWorkflowAction = async (form: CreateWorkflowSchemaType) => {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form data");
  }
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be logged in to create a workflow");
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });

  if (!result) {
    throw new Error("failed to create a workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
};
