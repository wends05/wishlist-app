import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/forms/LoginForm";
import GithubSignInSection from "./GithubSignInSection";

interface LoginFormProps {
  handleToggleIsOnRegister: () => void;
}

export default function LoginFormPage({
  handleToggleIsOnRegister,
}: LoginFormProps) {
  return (
    <Card className="w-full max-w-sm px-3">
      <CardHeader>
        <CardTitle>
          <h1>Log in</h1>
        </CardTitle>
        <CardDescription>Get started with your account</CardDescription>
        <CardAction>
          <Button
            variant={"link"}
            onClick={handleToggleIsOnRegister}
            className="text-neutral-600 dark:text-primary"
          >
            Sign up here
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <GithubSignInSection />
      </CardContent>
    </Card>
  );
}
