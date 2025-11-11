import { Pencil } from "lucide-react";
import Link from "next/link";
import type { Wish } from "@/types/Wish";
import { Button } from "../button";
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
      <WishComponent.Footer>
        <Link href={`/wish/edit/${wish._id}`}>
          <Button>
            <Pencil /> Edit
          </Button>
        </Link>
      </WishComponent.Footer>
    </WishComponent>
  );
}
