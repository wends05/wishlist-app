
import useChatHeader from "./useChatHeader";

interface ChatHeaderProps {
  otherPersonName: string;
}

export default function ChatHeader({ otherPersonName }: ChatHeaderProps) {
  useChatHeader({ title: otherPersonName });

  return null;
}
