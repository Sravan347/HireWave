import React from "react";
import { Linkedin, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#a18cd1] via-[#6d9ee6] to-[#3a7bd5] text-white pt-10 pb-6 border-t border-[#6d9ee6] shadow-inner animate-fade">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-2xl font-extrabold mb-2 tracking-tight">HireWave</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            Connecting talent & opportunities faster than ever.
            <br />
            <span className="text-xs opacity-80">© {new Date().getFullYear()} HireWave. All rights reserved.</span>
          </p>
        </div>

        {/* Column 2 */}
        <div className="flex md:justify-end items-start gap-8">
          {/* Quick links */}
          <nav className="space-y-2 text-sm font-semibold">
            <a href="/" className="hover:underline hover:text-[#ffe066] transition">Home</a> &nbsp;
            <a href="/jobs" className="hover:underline hover:text-[#ffe066] transition">Jobs</a>&nbsp;&nbsp;
            <a href="/about" className="hover:underline hover:text-[#ffe066] transition">About</a>&nbsp;&nbsp;
            <a href="/contact" className="hover:underline hover:text-[#ffe066] transition">Contact</a>&nbsp;
          </nav>

          {/* Social */}
          <div className="flex gap-4 mt-1">
            {[Linkedin, Facebook, Twitter].map((Icon, idx) => (
              <Icon
                key={Icon.displayName || idx}
                size={22}
                className="cursor-pointer text-white hover:text-[#ffe066] transition-colors duration-200 bg-[#6d9ee6] rounded-full p-1 shadow"
                onClick={() => window.open('#', '_blank')}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
