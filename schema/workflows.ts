import { z } from "zod";

export const createWorkflowSchema = z.object({
  name: z.string().min(3).max(20),
  description: z.string().max(80).optional(),
});

export type CreateWorkflowSchemaType = z.infer<typeof createWorkflowSchema>;
