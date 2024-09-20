"use client";

export default function Hero() {
  return (
    <div className="relative flex flex-col gap-16 items-center w-full">
      {/* Large non-selectable text overlay */}
      <h1 className="absolute top-[10%] md:top-[15%] text-4xl md:text-6xl font-bold text-white z-10 select-none text-center whitespace-nowrap px-4">
        Search by VIN Tool
      </h1>

      {/* Divider */}
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
