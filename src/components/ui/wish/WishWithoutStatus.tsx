import type { Wish } from "@/types/Wish";
import { WishComponent } from "./WishComponent";

interface WishWithoutStatusProps {
  wish: Wish;
}

export default function WishWithoutStatus({ wish }: WishWithoutStatusProps) {
  return (
    <WishComponent key={wish._id} wish={wish}>
      <WishComponent.Header>
        <WishComponent.Image />
      </WishComponent.Header>
      <WishComponent.Content>
        {({ name, description }) => (
          <>
            <h1>{name}</h1>
            <p>{description}</p>
          </>
        )}
      </WishComponent.Content>
    </WishComponent>
  );
}
