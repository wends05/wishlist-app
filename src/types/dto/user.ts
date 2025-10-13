import z from "zod";

export const EditProfileSchema = z.object({
  address: z.string().max(200, "Address is too long").optional(),
  name: z.string().max(100, "Name is too long").optional(),
})

export type EditProfileType = z.infer<typeof EditProfileSchema>;
