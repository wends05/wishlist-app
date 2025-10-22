"use client";
import { useState } from "react";
import LoginFormPage from "./LoginFormPage";
import RegisterFormPage from "./RegisterFormPage";

export default function AuthPage() {
  const [isOnRegister, setIsOnRegister] = useState(false);

  const handleToggleIsOnRegister = () => {
    setIsOnRegister(!isOnRegister);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {isOnRegister ? (
        <RegisterFormPage handleToggleIsOnRegister={handleToggleIsOnRegister} />
      ) : (
        <LoginFormPage handleToggleIsOnRegister={handleToggleIsOnRegister} />
      )}
    </div>
  );
}
