import Link from "next/link";
import { Button } from "../button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "../empty";

interface EmptyWishListProps {
  title?: string;
  description?: string;
}

export default function EmptyWishList({
  title,
  description,
}: EmptyWishListProps) {
  return (
    <Empty className="h-full w-full">
      <EmptyHeader>
        <EmptyTitle>{title || "No Wishes Found"}</EmptyTitle>
        <EmptyDescription>
          {description ||
            "You have no wishes yet. Start by creating a new wish!"}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href={"/wish/create"}>
          <Button>Create a Wish</Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
