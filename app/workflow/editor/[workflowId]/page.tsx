import { waitFor } from "@/lib/helpers/waitfor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Editor from "../../_components/editor";

type Props = {
  params: {
    workflowId: string;
  };
};

const EditorPage = async ({ params }: Props) => {
  const { workflowId } = params;
  const { userId } = await auth();

  if (!userId) return <div>Unauthenticated</div>;
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) return <div>Workflow Not Found</div>;

  return <Editor workflow={workflow} />;
};

export default EditorPage;
