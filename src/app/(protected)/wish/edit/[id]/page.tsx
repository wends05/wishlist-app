import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import BackButton from "@/components/BackButton";
import { CardAction, CardContent, CardHeader } from "@/components/ui/card";
import WishEditForm from "@/forms/WishEditForm";
import { api } from "../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const preloadedWishInformation = await preloadQuery(
    api.wishes.getWishByIdWithCategory,
    {
      wishId: id as Id<"wishes">,
    },
    {
      token: await convexAuthNextjsToken(),
    }
  );

  const preloadedCategories = await preloadQuery(
    api.categories.getAllCategories,
    {},
    {
      token: await convexAuthNextjsToken(),
    }
  );

  if (!preloadedWishInformation) {
    throw new Error("Wish not found");
  }

  return (
    <>
      <CardHeader>
        <h2>Edit this wish</h2>
        <CardAction>
          <BackButton />
        </CardAction>
      </CardHeader>
      <CardContent className="flex h-full w-full flex-col gap-4">
        <p>Edit this wish</p>
        <WishEditForm
          preloadedWishInformation={preloadedWishInformation}
          preloadedCategories={preloadedCategories}
        />
      </CardContent>
    </>
  );
}
