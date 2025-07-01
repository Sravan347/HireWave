import React from "react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-[#0A1A4A] text-white px-6 py-5 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Brand */}
        <div className="text-base md:text-lg font-semibold tracking-wide">
          HireWave &copy; {new Date().getFullYear()}
        </div>

        <Separator className="md:hidden bg-[#1A3A8F]" />

        {/* Links */}
        <div className="flex gap-6 text-sm md:text-base font-medium">
          <a
            href="/"
            className="transition-colors hover:text-[#7F5AF0]"
          >
            Home
          </a>
          <a
            href="/jobs"
            className="transition-colors hover:text-[#7F5AF0]"
          >
            Jobs
          </a>
          <a
            href="/about"
            className="transition-colors hover:text-[#7F5AF0]"
          >
            About
          </a>
          <a
            href="/contact"
            className="transition-colors hover:text-[#7F5AF0]"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
