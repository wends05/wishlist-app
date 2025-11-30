"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface ReturnButtonProps {
  children: React.ReactNode;
}

export default function ReturnButton({ children }: ReturnButtonProps) {
  const router = useRouter();
  return (
    <Button className="w-max" onClick={() => router.back()}>
      {children}
    </Button>
  );
}
