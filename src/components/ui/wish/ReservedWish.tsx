import type { Wish } from "@/types/Wish";
import ConfirmCancel from "../../../app/(protected)/(main)/reserved/ConfirmCancel";
import { WishComponent } from "./WishComponent";

type ReservedWishProps = {
  wish: Wish;
};
export default function ReservedWish({ wish }: ReservedWishProps) {
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
        <div className="flex w-full">
          <ConfirmCancel wishId={wish._id} />
        </div>
      </WishComponent.Footer>
    </WishComponent>
  );
}
