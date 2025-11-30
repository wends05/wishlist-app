import type { ChatDetails } from "@/types/Chat";
import useChatHeader from "./useChatHeader";

interface ChatHeaderProps {
  otherPersonName: string;
  wish: ChatDetails["wish"];
}

export default function ChatHeader({ otherPersonName, wish }: ChatHeaderProps) {
  useChatHeader({
    title: otherPersonName,
    wishId: wish._id,
    isDelivering: wish.status === "delivering",
  });

  return null;
}
