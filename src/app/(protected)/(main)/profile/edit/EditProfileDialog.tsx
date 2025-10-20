import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Doc } from "../../../../../../convex/_generated/dataModel";

interface EditProfileModalProps {
  profileDetails: Doc<"users">;
}

export default function EditProfileModal({
  profileDetails,
}: EditProfileModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-max">Additional Info</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Profile Information</DialogTitle>
        <DialogDescription>
          Address: {profileDetails.address || "Not provided"}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Close</Button>
          </DialogClose>
          <Link href={"/profile/edit"}>
            <Button>Edit</Button>
          </Link>
        </DialogFooter>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
