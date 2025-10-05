import type { PropsWithChildren } from "react";
import Navbar from "@/components/Navbar";
import Footer from "../../components/Footer";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default layout;
