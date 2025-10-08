import { SiGithub } from "@icons-pack/react-simple-icons";
import LoginForm from "@/forms/LoginForm";
import { useLoginForm } from "@/hooks/useLoginForm";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

interface LoginFormProps {
  handleToggleIsOnRegister: () => void;
}

export default function LoginFormPage({
  handleToggleIsOnRegister,
}: LoginFormProps) {
  const { handleSignInGithub, signingInGithub } = useLoginForm();

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
        <LoginForm />
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
