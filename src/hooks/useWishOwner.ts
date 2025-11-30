import { useQuery } from "convex-helpers/react/cache/hooks";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

interface UseWishOwnerProps {
  wishId: Id<"wishes">;
}

const useWishOwner = ({ wishId }: UseWishOwnerProps) => {
  const user = useQuery(api.users.getCurrentUserDataHandler);
  const wishDetails = useQuery(api.wishes.getWishById, {
    wishId,
  });

  return {
    isOwner: user?._id === wishDetails?.owner,
  };
};

export default useWishOwner;
