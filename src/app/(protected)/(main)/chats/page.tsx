import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "../../../../../convex/_generated/api";
import GrantingWishChatsList from "./GrantingWishChatsList";
import OwnedWishChatsList from "./OwnedWishChatsList";

export default async function page() {
  const token = await convexAuthNextjsToken();

  const preloadedGrantingWishChats = await preloadQuery(
    api.chats.getGrantingWishChats,
    {},
    { token }
  );
  const preloadedOwningWishChats = await preloadQuery(
    api.chats.getOwningWishChats,
    {},
    { token }
  );
  return (
    <div className="h-full space-y-10 px-8 pt-14">
      <Tabs defaultValue={"granting"}>
        <TabsList>
          <div className="space-x-3">
            <TabsTrigger value="granting">
              Chats for Wishes I'm Granting
            </TabsTrigger>
            <TabsTrigger value="owned">Chats for My Wishes</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="granting">
          <GrantingWishChatsList
            preloadedGrantingWishChats={preloadedGrantingWishChats}
          />
        </TabsContent>
        <TabsContent value="owned">
          <OwnedWishChatsList
            preloadedOwningWishChats={preloadedOwningWishChats}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
