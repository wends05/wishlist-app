import { Item, ItemContent } from "@/components/ui/item";
import { cn } from "@/lib/utils";

interface MessageProps {
  content: string;
  isOwner: boolean;
}
export default function Message({ content, isOwner }: MessageProps) {
  return (
    <Item
      className={cn(
        "max-w-md break-words rounded-md",
        isOwner
          ? "self-end bg-secondary text-secondary-foreground"
          : "self-start"
      )}
      variant={"muted"}
    >
      <ItemContent>{content}</ItemContent>
    </Item>
  );
}
