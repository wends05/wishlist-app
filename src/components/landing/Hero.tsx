import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div className="flex h-screen w-full items-center justify-center *:flex *:h-full *:w-1/2 *:flex-col *:items-center *:justify-center *:px-10 *:text-center">
      <section>
        <h1>WishList App</h1>
        <p>
          dolor minim veniam et sunt ipsum magna laborum ea eiusmod veniam et
          dolor sunt ea ea aliquip nulla tempor ut est do et consequat
          consectetur cupidatat amet labore velit Lorem aliqua deserunt
        </p>
      </section>
      <section>
        <div>
          <Image src="/placeholder.svg" alt="" width={300} height={300} />
        </div>
      </section>
    </div>
  );
}
