import RegisterForm from "@/forms/RegisterForm";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface RegisterFormProps {
  handleToggleIsOnRegister: () => void;
}

export default function RegisterFormPage({
  handleToggleIsOnRegister,
}: RegisterFormProps) {
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
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
