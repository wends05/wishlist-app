import { Pencil } from "lucide-react";
import Link from "next/link";
import DeleteWishDialog from "@/app/(protected)/(main)/profile/DeleteWishDialog";
import type { Wish } from "@/types/Wish";
import { Button } from "../../../../components/ui/button";
import { WishComponent } from "../../../../components/wish/WishComponent";

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
      <WishComponent.Footer>
        <div className="flex w-full justify-end space-x-3">
          <Link href={`/wish/edit/${wish._id}`}>
            <Button>
              <Pencil /> Edit
            </Button>
          </Link>
          <DeleteWishDialog
            wish={{
              _id: wish._id,
              name: wish.name,
            }}
          />
        </div>
      </WishComponent.Footer>
    </WishComponent>
  );
}
