"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";

export default function GithubSignInSection() {
  const { signIn } = useAuthActions();
  const handleGithubSignIn = async () => {
    void signIn("github");
  };
  return (
    <div className="space-y-3 pt-4">
      <div>or log in with:</div>
      <Button onClick={handleGithubSignIn}>
        <SiGithub />
        Github
      </Button>
    </div>
  );
}
