"use server";

import prisma from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from "@/schema/workflows";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
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

  const initialWorkflow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  // Flow entry point LAUNCH_BROWSER
  initialWorkflow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialWorkflow),
      ...data,
    },
  });

  if (!result) {
    throw new Error("failed to create a workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
};
