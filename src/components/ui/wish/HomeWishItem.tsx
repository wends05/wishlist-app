import { useMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { ConvexError } from "convex/values";
import { Blocks } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { Button } from "../button";
import { CardTitle } from "../card";
import { WishComponent } from "./WishComponent";

interface WishItemProps {
  wish: FunctionReturnType<typeof api.wishes.getHomePageWishes>["page"][number];
}

export default function HomeWishItem({ wish }: WishItemProps) {
  const reserveWish = useMutation(api.wishes.reserveWish);
  const handleReserveWish = async () => {
    try {
      await reserveWish({ wishId: wish._id });
    } catch (error) {
      if (error instanceof ConvexError) {
        toast.error(error.data);
      }
    }
  };

  return (
    <WishComponent wish={wish} className="h-full min-h-30 w-full max-w-sm">
      <WishComponent.Header props={{ className: "space-y-3" }}>
        {({ name }) => (
          <>
            <WishComponent.Image />
            <div className="flex flex-col gap-2">
              <CardTitle>
                <h4>{name}</h4>
              </CardTitle>
              <div className="text-secondary *:flex *:items-center *:gap-2">
                <span>
                  <Blocks size={16} />
                  {wish.category.name}
                </span>
              </div>
            </div>
          </>
        )}
      </WishComponent.Header>
      <WishComponent.Content props={{ className: "h-full" }}>
        {({ description }) => (
          <div className="flex flex-col gap-2">
            <p>{description}</p>
          </div>
        )}
      </WishComponent.Content>
      <WishComponent.Footer>
        <div className="flex w-full justify-between gap-5">
          <WishComponent.Owner />
          <div className="flex gap-2">
            <Button onClick={handleReserveWish}>Reserve</Button>
          </div>
        </div>
      </WishComponent.Footer>
    </WishComponent>
  );
}
