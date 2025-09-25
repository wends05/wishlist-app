"use client";
import { useRef } from "react";
import FeatureCard from "./FeatureCard";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Feature from "@/types/Feature";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features: Feature[] = [
  {
    title: "Create a wish",
    description: "Make a wish and let it be known to others",

  },
  {
    title: "Grant a wish",
    description: "Grant other people's wishes",
  }
];

export default function FeatureSection() {
  // const el = useRef(null);
  // const container = useRef(null);

  // useGSAP(
  //   () => {
  //     gsap.to(".feature", {
  //       stagger: {
  //         each: 0.1,
  //       },
  //       scrollTrigger: {
  //         toggleActions: "restart none reverse none",
  //       },
  //       x: 200,
  //       duration: 1,
  //       ease: "power3.inOut",
  //     });
  //   },
  //   {
  //     scope: container,
  //   },
  // );

  return (
    <main className="flex h-screen w-full justify-center">
      <div className="flex w-full flex-col gap-20 sm:max-w-2xl sm:*:odd:self-start sm:*:even:self-end">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </main>
  );
}
