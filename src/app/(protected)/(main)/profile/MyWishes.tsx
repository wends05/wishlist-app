import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "../../../../../convex/_generated/api";
import GrantedWishes from "./GrantedWishes";
import WishesWithoutStatus from "./WishesWithoutStatus";

export default async function MyWishes() {
  const preloadedGrantedWishes = await preloadQuery(
    api.wishes.getGrantedWishes,
    {},
    {
      token: await convexAuthNextjsToken(),
    }
  );

  const preloadedWishesWithoutStatus = await preloadQuery(
    api.wishes.getWishesWithoutStatus,
    {},
    {
      token: await convexAuthNextjsToken(),
    }
  );

  return (
    <Tabs defaultValue="pending" className="h-full">
      <Card className="h-full">
        <CardContent className="h-full space-y-1">
          <TabsList className="gap-1">
            <TabsTrigger value="pending">My Wishes</TabsTrigger>
            <TabsTrigger value="granted">Granted Wishes</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="pt-4">
            <WishesWithoutStatus
              preloadedWishesWithoutStatus={preloadedWishesWithoutStatus}
            />
          </TabsContent>
          <TabsContent value="granted" className="pt-4">
            <GrantedWishes preloadedGrantedWishes={preloadedGrantedWishes} />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
