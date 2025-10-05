"use client";
import { useState } from "react";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";

export default function AuthPage() {
  const [isOnRegister, setIsOnRegister] = useState(false);

  const handleToggleIsOnRegister = () => {
    setIsOnRegister(!isOnRegister);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {isOnRegister ? (
        <RegisterForm handleToggleIsOnRegister={handleToggleIsOnRegister} />
      ) : (
        <LoginForm handleToggleIsOnRegister={handleToggleIsOnRegister} />
      )}
    </div>
  );
}
