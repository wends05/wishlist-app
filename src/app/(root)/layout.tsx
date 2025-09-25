import React, { PropsWithChildren } from "react";
import Footer from "../../components/Footer";
import Navbar from "@/components/Navbar";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-neutral-700 p-2">{children}</div>
      <Footer />
    </>
  );
};

export default layout;
