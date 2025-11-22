import HomeLayout from "./HomeLayout";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: HomeLayoutProps) {
  return <HomeLayout>{children}</HomeLayout>;
}
