import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomeHeader = () => {
  return (
    <main className="pt-2">
      <div className="fixed right-8 flex items-center justify-end gap-4">
        <Button>
          <Bell />
        </Button>
      </div>
    </main>
  );
};

export default HomeHeader;
