import { HomeHeaderProvider } from "@/providers/HomeHeaderProvider";
import HomeLayout from "./HomeLayout";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: HomeLayoutProps) {
  return (
    <HomeHeaderProvider>
      <HomeLayout>{children}</HomeLayout>
    </HomeHeaderProvider>
  );
}
