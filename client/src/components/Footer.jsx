import React from "react";
import { Linkedin, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--hw-navy)] text-[var(--hw-soft-bg)] border-t border-[var(--hw-blue)] pt-12 pb-8 animate-fade">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Column 1 */}
        <div>
          <h3 className="text-2xl font-extrabold mb-2 tracking-tight text-[var(--hw-yellow-gold)]">HireWave</h3>
          <p className="text-sm opacity-80 leading-relaxed max-w-md">
            Connecting talent & opportunities faster than ever.<br />
            <span className="text-xs opacity-60">© {new Date().getFullYear()} HireWave. All rights reserved.</span>
          </p>
        </div>

        {/* Column 2 */}
        <div className="flex md:justify-end items-center gap-10 flex-wrap">
          {/* Quick links */}
          <nav className="flex gap-6 text-sm font-semibold">
            <a href="/" className="hover:text-[var(--hw-yellow-gold)] transition-colors duration-200">Home</a>
            <a href="/jobs" className="hover:text-[var(--hw-yellow-gold)] transition-colors duration-200">Jobs</a>
            <a href="/about" className="hover:text-[var(--hw-yellow-gold)] transition-colors duration-200">About</a>
            <a href="/contact" className="hover:text-[var(--hw-yellow-gold)] transition-colors duration-200">Contact</a>
          </nav>

          {/* Social */}
          <div className="flex gap-4 mt-1">
            {[Linkedin, Facebook, Twitter].map((Icon, idx) => (
              <button
                key={Icon.displayName || idx}
                className="rounded-full bg-[var(--hw-blue)] hover:bg-[var(--hw-violet)] p-2 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--hw-yellow-gold)]"
                onClick={() => window.open('#', '_blank')}
                aria-label={Icon.displayName || 'Social'}
                type="button"
              >
                <Icon size={20} className="text-[var(--hw-soft-bg)]" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
