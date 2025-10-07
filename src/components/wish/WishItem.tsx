import type { FunctionReturnType } from "convex/server";
import { Blocks } from "lucide-react";
import type { api } from "../../../convex/_generated/api";
import { CardTitle } from "../ui/card";
import { WishComponent } from "./WishComponent";

interface WishItemProps {
  wish: FunctionReturnType<typeof api.wishes.getHomePageWishes>["page"][number];
}

export default function WishItem({ wish }: WishItemProps) {
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
        <WishComponent.Owner />
      </WishComponent.Footer>
    </WishComponent>
  );
}
