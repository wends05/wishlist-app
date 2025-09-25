import BackButton from "@/components/BackButton";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import WishCreateForm from "@/components/wish/WishCreateForm";
import { preloadQuery } from "convex/nextjs";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

export default async function CreateWishPage() {
  const preloadedCategories = await preloadQuery(
    api.categories.getAllCategories,
    {},
    {
      token: await convexAuthNextjsToken(),
    },
  );

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="h-[90vh] w-[95vw] overflow-hidden">
        <CardHeader>
          <h2>Create a new wish</h2>
          <CardAction>
            <BackButton />
          </CardAction>
        </CardHeader>
        <CardContent className="flex h-full w-full flex-col gap-4">
          <p>Fill out the form below to create a new wish.</p>
          <WishCreateForm preloadedCategories={preloadedCategories} />
        </CardContent>
      </Card>
    </div>
  );
}
