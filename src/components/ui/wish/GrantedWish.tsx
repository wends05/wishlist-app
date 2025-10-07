import type { Wish } from "@/types/Wish";
import { WishComponent } from "./WishComponent";

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
            <WishComponent.GrantedBy className="text-secondary pt-5" />
          </div>
        )}
      </WishComponent.Content>
    </WishComponent>
  );
}
