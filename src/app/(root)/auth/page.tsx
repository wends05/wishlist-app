"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

export default function Page() {
  const [isOnLogin, setIsOnLogin] = useState(true);
  const handleToggleIsOnRegister = () => {
    setIsOnLogin(!isOnLogin);
  };

  return isOnLogin ? (
    <LoginForm handleToggleIsOnRegister={handleToggleIsOnRegister} />
  ) : (
    <RegisterForm handleToggleIsOnRegister={handleToggleIsOnRegister} />
  );
}
