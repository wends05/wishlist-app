import Github from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";
import Password from "./Password";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password, Github],
});
