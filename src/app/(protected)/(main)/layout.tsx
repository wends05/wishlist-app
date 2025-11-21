import { Suspense } from "react";
import HomeLayout from "./HomeLayout";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: HomeLayoutProps) {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-background" />}>
      <HomeLayout>{children}</HomeLayout>
    </Suspense>
  );
}
