import { Item, ItemContent, ItemFooter } from "@/components/ui/item";
import { cn } from "@/lib/utils";

interface MessageProps {
  content: string;
  type: "user" | "other" | "system";
  timestamp: number;
}
export default function Message({ content, type, timestamp }: MessageProps) {
  return (
    <Item
      className={cn(
        "max-w-md break-words rounded-md",
        type === "user"
          ? "self-end bg-secondary text-secondary-foreground"
          : type === "other"
            ? "self-start"
            : "self-center"
      )}
      variant={"muted"}
    >
      <ItemContent>
        {content}
        <span className="text-xs opacity-60">
          {new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </ItemContent>
    </Item>
  );
}
