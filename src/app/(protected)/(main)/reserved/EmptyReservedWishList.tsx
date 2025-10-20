import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyGrants() {
  return (
    <Empty>
      <EmptyTitle>No Wishes Found</EmptyTitle>
      <EmptyDescription>
        You have not reserved a wish yet. Find a wish to reserve!
      </EmptyDescription>
      <EmptyContent>
        <Link href={"/home"}>
          <Button>Find a Wish</Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
