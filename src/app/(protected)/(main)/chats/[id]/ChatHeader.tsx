
import { Id } from "../../../../../../convex/_generated/dataModel";
import useChatHeader from "./useChatHeader";

interface ChatHeaderProps {
  otherPersonName: string;
  wishId: Id<"wishes">;
}

export default function ChatHeader({ otherPersonName, wishId }: ChatHeaderProps) {
  useChatHeader({ title: otherPersonName, wishId });

  return null;
}
