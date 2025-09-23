"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "./ui/button";
import { useState } from "react";

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
