"use server";

import prisma from "@/lib/prisma";
import { CheckAuth } from "../helpers/checkAuth";
import { auth } from "@clerk/nextjs/server";
import { WorkflowStatus } from "@/types/workflow";
import { revalidatePath } from "next/cache";

export const UpdateWorkflow = async ({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be logged in to create a workflow");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) throw new Error("Workflow not found");
  if (workflow.status !== WorkflowStatus.DRAFT)
    throw new Error("You can only update draft workflows");

  await prisma.workflow.update({
    data: {
      definition,
    },
    where: {
      id,
      userId,
    },
  });

  revalidatePath("/workflows");
};
