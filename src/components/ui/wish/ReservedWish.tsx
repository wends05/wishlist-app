import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Wish } from "@/types/Wish";
import { api } from "../../../../convex/_generated/api";
import ConfirmCancel from "../../../app/(protected)/(main)/reserved/ConfirmCancel";
import { Button } from "../button";
import { WishComponent } from "./WishComponent";

type ReservedWishProps = {
  wish: Wish;
};
export default function ReservedWish({ wish }: ReservedWishProps) {
  const createChat = useMutation(api.chats.getChatSessionId);
  const router = useRouter();
  const handleCreateChat = async () => {
    try {
      const chatSessionId = await createChat({ wishId: wish._id });
      router.push(`/chats/${chatSessionId}`);
    } catch (error) {
      if (error instanceof ConvexError) {
        toast.error(error.data);
      }
    }
  };

  return (
    <WishComponent wish={wish} key={wish._id} className="h-full">
      <WishComponent.Header>
        <WishComponent.Image />
      </WishComponent.Header>
      <WishComponent.Content>
        {({ name, description }) => (
          <>
            <h1>{name}</h1>
            <p>{description}</p>
            <WishComponent.Owner />
          </>
        )}
      </WishComponent.Content>
      <WishComponent.Footer>
        <div className="flex w-full justify-end gap-2">
          <ConfirmCancel wishId={wish._id} />
          <Button onClick={handleCreateChat}>Chat</Button>
        </div>
      </WishComponent.Footer>
    </WishComponent>
  );
}
