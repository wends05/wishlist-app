import type { Wish } from "@/types/Wish";
import { WishComponent } from "../../../../components/wish/WishComponent";

interface GrantedWishProps {
  wish: Wish;
}

export default function GrantedWish({ wish }: GrantedWishProps) {
  return (
    <WishComponent key={wish._id} wish={wish}>
      <WishComponent.Header>
        <WishComponent.Image />
      </WishComponent.Header>
      <WishComponent.Content>
        {({ name, description }) => (
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <div className="flex items-end justify-between">
              <WishComponent.GrantedBy className="pt-5 text-secondary" />
            </div>
          </div>
        )}
      </WishComponent.Content>
    </WishComponent>
  );
}
