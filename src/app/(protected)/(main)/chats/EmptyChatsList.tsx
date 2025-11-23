import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

interface EmptyChatsListProps {
  description: string;
}

export default function EmptyChatsList({ description }: EmptyChatsListProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No chats available.</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
}
