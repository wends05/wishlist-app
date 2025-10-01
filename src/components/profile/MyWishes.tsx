import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import GrantedWishes from "./GrantedWishes";
import PendingWishes from "./PendingWishes";

export default async function MyWishes() {
  const pendingWishes = await preloadQuery(
    api.wishes.getPendingWishes,
    {},
    {
      token: await convexAuthNextjsToken(),
    },
  );

  return (
    <Tabs defaultValue="pending">
      <Card>
        <CardContent className="space-y-1">
          <TabsList className="gap-1">
            <TabsTrigger value="pending">My Wishes</TabsTrigger>
            <TabsTrigger value="granted">Granted Wishes</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <PendingWishes pendingWishes={pendingWishes} />
          </TabsContent>
          <TabsContent value="granted">
            <GrantedWishes />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
