import React from "react";
import { Linkedin, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A1A4A] text-white pt-10 pb-6 animate-fade">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-2xl font-bold mb-2">HireWave</h3>
          <p className="text-sm opacity-75 leading-relaxed">
            Connecting talent & opportunities faster than ever.
            <br />
            © {new Date().getFullYear()} HireWave. All rights reserved.
          </p>
        </div>

        {/* Column 2 */}
        <div className="flex md:justify-end items-start gap-8">
          {/* Quick links */}
          <nav className="space-y-2 text-sm font-medium">
            <a href="/" className="hover:text-[#B5A9FF] transition">Home</a> &nbsp;
            <a href="/jobs" className="hover:text-[#B5A9FF] transition">Jobs</a>&nbsp;&nbsp;
            <a href="/about" className="hover:text-[#B5A9FF] transition">About</a>&nbsp;&nbsp;
            <a href="/contact" className="hover:text-[#B5A9FF] transition">Contact</a>&nbsp;
          </nav>

          {/* Social */}
          <div className="flex gap-4 mt-1">
            {[Linkedin, Facebook, Twitter].map((Icon) => (
              <Icon
                key={Icon.displayName}
                size={20}
                className="cursor-pointer hover:text-[#B5A9FF] transition"
                onClick={() => window.open('#', '_blank')}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
