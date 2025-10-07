"use client";

import { Gift, User } from "lucide-react";
import Image from "next/image";
import React, { type PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import type { BaseWish, Wish } from "@/types/Wish";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

type WishBaseInfo = Pick<BaseWish, "_id" | "name" | "description">;

interface WishItemContextValue {
  wish: Wish;
}

const WishItemContext = React.createContext<WishItemContextValue | null>(null);

const useWishItem = () => {
  const context = React.useContext(WishItemContext);
  if (!context) {
    throw new Error(
      "WishItem compound components must be used within WishItem",
    );
  }
  return context;
};

// Root component
interface WishItemRootProps {
  wish: Wish;
  children: React.ReactNode;
  className?: string;
}

function WishItemRoot({ wish, children, className }: WishItemRootProps) {
  return (
    <WishItemContext.Provider value={{ wish }}>
      <Card className={className}>{children}</Card>
    </WishItemContext.Provider>
  );
}

function WishImage() {
  const { wish } = useWishItem();

  return (
    <div className="relative top-0 h-32 w-full space-y-3 overflow-hidden rounded-md bg-neutral-200">
      {wish.imageUrl && (
        <Image
          src={wish.imageUrl}
          alt={wish.name}
          fill
          className="object-cover"
          priority
        />
      )}
    </div>
  );
}

interface WishHeaderProps {
  children: ((props: WishBaseInfo) => React.ReactNode) | React.ReactNode;
  props?: React.ComponentProps<typeof CardHeader>;
}

function WishHeader({ children, props }: WishHeaderProps) {
  const { wish } = useWishItem();

  return (
    <CardHeader {...props}>
      {typeof children === "function"
        ? children({
            name: wish.name,
            description: wish.description,
            _id: wish._id,
          })
        : children}
    </CardHeader>
  );
}

interface WishContentProps {
  children?: (props: WishBaseInfo) => React.ReactNode;
  props?: React.ComponentProps<typeof CardContent>;
}

function WishContent({ children, props }: WishContentProps) {
  const { wish } = useWishItem();

  return (
    <CardContent {...props} className={cn("h-full", props?.className)}>
      {children && (
        <div className="not-first:pt-3">
          {children({
            name: wish.name,
            description: wish.description,
            _id: wish._id,
          })}
        </div>
      )}
    </CardContent>
  );
}

interface WishGrantedByProps {
  className?: string;
}

function WishGrantedBy({ className }: WishGrantedByProps) {
  const { wish } = useWishItem();

  if ("grantor" in wish && wish.grantor && typeof wish.grantor === "object") {
    return (
      <p className={cn(className, "flex items-center gap-2")}>
        <span>
          <Gift />
        </span>
        {wish.grantor.name}
      </p>
    );
  }
  return <p className={className}>Granted by Unknown</p>;
}

function WishOwner() {
  const { wish } = useWishItem();

  if (typeof wish.owner === "object") {
    return (
      <div className="flex items-center gap-2 text-neutral-400">
        <User size={20} /> <p className="text-sm">{wish.owner.name}</p>
      </div>
    );
  }
  return <p className="text-neutral-400">Unknown Owner</p>;
}

function WishFooter({ children }: PropsWithChildren) {
  return <CardFooter>{children}</CardFooter>;
}

export const WishComponent = Object.assign(WishItemRoot, {
  Header: WishHeader,
  Content: WishContent,
  Image: WishImage,
  GrantedBy: WishGrantedBy,
  Footer: WishFooter,
  Owner: WishOwner,
});
