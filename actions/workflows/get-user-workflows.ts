"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const GetUserWorkflowsAction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Not authenticated");
  }
  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};
