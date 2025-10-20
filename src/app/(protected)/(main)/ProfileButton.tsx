import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProfileButtonProps {
  name: string;
  imageUrl?: string;
}
export default function ProfileButton({ name, imageUrl }: ProfileButtonProps) {
  return (
    <Link href={"/profile"}>
      <Button variant="ghost" className="">
        <div className="flex w-full items-center gap-2">
          <div className="overflow-hidden rounded-full bg-neutral-800">
            {imageUrl ? (
              <div>
                <Image
                  src={imageUrl}
                  alt={name}
                  height={35}
                  width={35}
                  className="rounded-max object-fill"
                />
              </div>
            ) : (
              <div className="p-2">
                <User size={35} />
              </div>
            )}
          </div>
          <div>{name}</div>
        </div>
      </Button>
    </Link>
  );
}
