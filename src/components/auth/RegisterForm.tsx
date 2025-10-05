import { useAuthActions } from "@convex-dev/auth/react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
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

interface RegisterFormProps {
  handleToggleIsOnRegister: () => void;
}

export default function RegisterForm({
  handleToggleIsOnRegister,
}: RegisterFormProps) {
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      if (formData.get("password") !== formData.get("confirmPassword")) {
        toast.error("Passwords do not match");
        return;
      }
      void (await signIn("password", formData));
    } catch {
      toast.error("Failed to sign up");
    }
    setSubmitting(false);
  };

  return (
    <Card className="w-full max-w-sm px-3">
      <CardHeader>
        <CardTitle>
          <h1>Sign Up</h1>
        </CardTitle>
        <CardDescription>Get started with your account</CardDescription>
        <CardAction>
          <Button variant={"link"} onClick={handleToggleIsOnRegister}>
            Sign in here
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form
          className="mb-3 flex flex-col items-center gap-3"
          onSubmit={handleRegister}
        >
          <Input name="name" id="name" placeholder="Name" />
          <Input name="email" id="email" placeholder="Email" />
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Password"
          />
          <Input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <input name="flow" value="signUp" type="hidden" />
          <Button disabled={submitting} type="submit" className="mt-3 w-max">
            {submitting ? "Signing up..." : "Sign up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
