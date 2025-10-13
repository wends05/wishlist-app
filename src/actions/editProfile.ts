"use server";

import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import type { EditProfileType } from "@/types/dto/user";
import { api } from "../../convex/_generated/api";

export const editProfile = async (data: EditProfileType) => {
  console.log("editProfile data:", data);
  await fetchMutation(api.users.updateProfile, data, {
    token: await convexAuthNextjsToken(),
  });
};
