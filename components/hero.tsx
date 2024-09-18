"use client";

import Spline from "@splinetool/react-spline/next";

export default function Hero() {
  return (
    <div className="relative flex flex-col gap-16 items-center">
      {/* Large non-selectable text overlay on Spline */}
      <h1 className="absolute top-1/4 text-4xl md:text-6xl font-bold text-white z-10 select-none">
        Search by VIN
      </h1>

      {/* Spline Design */}
      <main className="w-full h-[500px] md:h-[700px]">
        <Spline
          scene="https://prod.spline.design/eVEg5O3J24l44iEv/scene.splinecode"
        />
      </main>

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
