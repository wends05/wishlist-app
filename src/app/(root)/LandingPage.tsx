import Link from "next/link";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <main className="flex h-[90vh] w-full flex-col items-center justify-center gap-10 px-12">
      <h1>Wishlist App.</h1>
      <p>List your wishes, share to others, and let it be granted</p>
      <Link href={"/auth"}>
        <Button>Get Started</Button>
      </Link>
    </main>
  );
};

export default LandingPage;
