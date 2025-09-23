"use client";
import React, { useState } from "react";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";

export default function AuthPage() {
  const [isOnRegister, setIsOnRegister] = useState(false);

  const handleToggleIsOnRegister = () => {
    setIsOnRegister(!isOnRegister);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      {isOnRegister ? (
        <RegisterForm handleToggleIsOnRegister={handleToggleIsOnRegister} />
      ) : (
        <LoginForm handleToggleIsOnRegister={handleToggleIsOnRegister} />
      )}
    </div>
  );
}
