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

interface LoginFormProps {
  handleToggleIsOnRegister: () => void;
}

export default function LoginForm({
  handleToggleIsOnRegister,
}: LoginFormProps) {
  const { signIn } = useAuthActions();

  const handleLogIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    void signIn("password", formData);
  };

  // const handleGoogleLogIn = () => void signIn("google");

  const handleGithubLogIn = () => void signIn("github");

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>Log in with Wishlist App</h1>
          </CardTitle>
          <CardDescription>Get started with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3 mb-3" onSubmit={handleLogIn}>
            <Input placeholder="Email" />
            <Input placeholder="Password" />
          </form>
          <div className="flex flex-col py-5 text-center gap-3">
            <Separator />
            <div>or</div>
            <Separator />
          </div>
          <div>
            <h3>Log in with:</h3>
            <div className="flex flex-col gap-2">
              {/* <Button>Google</Button> */}
              <Button onClick={handleGithubLogIn}>Github</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex w-full justify-between">
          <CardAction>
            <Button>Log in</Button>
          </CardAction>
          <CardAction onClick={handleToggleIsOnRegister}>
            <Button>Sign up</Button>
          </CardAction>
        </CardFooter>
      </Card>
    </main>
  );
}
