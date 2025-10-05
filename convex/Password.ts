import { Password } from "@convex-dev/auth/providers/Password";
import type { DataModel } from "./_generated/dataModel";

export default Password<DataModel>({
  profile(params, _ctx) {
    return {
      email: params.email as string,
      name: params.name as string,
    };
  },
});
