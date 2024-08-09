import z from "zod";
export const issueSchema = z.object({
  title: z.string().min(1, "Enter title").max(255),
  description: z.string().min(1, "Enter description"),
});
export const patchIssueSchema = z.object({
  title: z.string().min(1, "Enter title").max(255).optional(),
  description: z.string().min(1, "Enter description").max(65535).optional(),
  assignedToUserId: z
    .string()
    .min(1, "Select assignee")
    .max(255)
    .optional()
    .nullable(),
});
