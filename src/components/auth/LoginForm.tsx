import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FormEvent } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { toast } from "sonner";

interface LoginFormProps {
  handleToggleIsOnRegister: () => void;
}

export default function LoginForm({
  handleToggleIsOnRegister,
}: LoginFormProps) {
  const { signIn } = useAuthActions();
  const [signingInGithub, setSigningInGithub] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      await signIn("password", formData);
    } catch (error) {
      toast.error("User not found or invalid password");
    }
    setSubmitting(false);
  };

  const handleSignInGithub = async () => {
    setSigningInGithub(true);
    try {
      await signIn("github");
    } catch (error) {
      toast.error("Failed to sign in with Github");
    }
    setSigningInGithub(false);
  };

  return (
    <Card className="w-full max-w-sm px-3">
      <CardHeader>
        <CardTitle>
          <h1>Log in</h1>
        </CardTitle>
        <CardDescription>Get started with your account</CardDescription>
        <CardAction>
          <Button variant={"link"} onClick={handleToggleIsOnRegister}>
            Sign up here
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form
          className="mb-3 flex flex-col items-center gap-3"
          onSubmit={handleLogIn}
        >
          <Input placeholder="Email" name="email" />
          <Input placeholder="Password" name="password" type="password" />
          <input name="flow" value="signIn" type="hidden" />
          <Button disabled={submitting} type="submit" className="mt-3 w-max">
            {submitting ? "Signing in..." : "Log in"}
          </Button>
        </form>
        <div className="flex flex-col gap-3 py-5 text-center">
          <Separator />
          <div>or</div>
          <Separator />
        </div>
        <div className="space-y-2">
          <h4>Log in with</h4>
          <div className="flex flex-col gap-2">
            {/* <Button>Google</Button> */}
            <Button onClick={handleSignInGithub}>
              <SiGithub className="mr-2 h-4 w-4" />
              {signingInGithub ? "Signing in..." : "Github"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
