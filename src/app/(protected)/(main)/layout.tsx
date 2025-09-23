import HomeHeader from "@/components/home/HomeHeader";
import HomeSidebar from "@/components/home/HomeSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div>
      <SidebarProvider>
        <HomeSidebar />
        <SidebarInset className="p-2">
          <HomeHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
