"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface BackButtonProps {
  customText?: string;
}

export default function BackButton({ customText }: BackButtonProps) {
  const { back } = useRouter();
  return <Button onClick={back}>{customText || "Back"}</Button>;
}
