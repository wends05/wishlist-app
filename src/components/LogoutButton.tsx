"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const { signOut } = useAuthActions();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setLoggingOut(true);
    await signOut();
    setLoggingOut(false);
  };
  return (
    <Button onClick={handleSignOut}>
      {loggingOut ? "Logging out..." : "Logout"}
    </Button>
  );
}
