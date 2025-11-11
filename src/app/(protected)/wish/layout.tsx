import { Card } from "@/components/ui/card";

export default function CardPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="h-[90vh] w-[95vw] overflow-hidden">{children}</Card>
    </div>
  );
}
