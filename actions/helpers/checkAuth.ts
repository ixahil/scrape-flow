import { auth } from "@clerk/nextjs/server";

export const CheckAuth = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be logged in to create a workflow");
  }

  return userId;
};
