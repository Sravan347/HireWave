import React from "react";
import { Linkedin, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#0A1A4A] via-[#4C6EF5] to-[#7F5AF0] text-white pt-0 pb-0 shadow-2xl animate-fade">
      {/* Wavy SVG Top Border */}
      <div className="absolute -top-8 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" className="w-full h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff" fillOpacity="1" d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-3xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-[#FFD700] to-[#B5A9FF] bg-clip-text text-transparent">HireWave</h3>
          <p className="text-sm opacity-80 leading-relaxed mb-4">
            Connecting talent & opportunities faster than ever.
          </p>
          {/* Social */}
          <div className="flex gap-4 mt-2">
            {[Linkedin, Facebook, Twitter].map((Icon) => (
              <Icon
                key={Icon.displayName}
                size={22}
                className="cursor-pointer hover:text-[#FFD700] transition drop-shadow"
                onClick={() => window.open('#', '_blank')}
              />
            ))}
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-3 text-[#FFD700]">Quick Links</h4>
          <nav className="space-y-2 text-sm font-medium flex flex-col">
            <a href="/" className="hover:text-[#FFD700] transition">Home</a>
            <a href="/jobs" className="hover:text-[#FFD700] transition">Jobs</a>
            <a href="/about" className="hover:text-[#FFD700] transition">About</a>
            <a href="/contact" className="hover:text-[#FFD700] transition">Contact</a>
          </nav>
        </div>
        {/* Resources */}
        <div>
          <h4 className="font-bold mb-3 text-[#FFD700]">Resources</h4>
          <nav className="space-y-2 text-sm font-medium flex flex-col">
            <a href="#" className="hover:text-[#FFD700] transition">Blog</a>
            <a href="#" className="hover:text-[#FFD700] transition">Help Center</a>
            <a href="#" className="hover:text-[#FFD700] transition">Privacy Policy</a>
            <a href="#" className="hover:text-[#FFD700] transition">Terms of Service</a>
          </nav>
        </div>
        {/* Newsletter Signup */}
        <div>
          <h4 className="font-bold mb-3 text-[#FFD700]">Stay Updated</h4>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="rounded-full px-4 py-2 text-[#0A1A4A] focus:outline-none focus:ring-2 focus:ring-[#FFD700] shadow"
            />
            <button
              type="submit"
              className="rounded-full px-4 py-2 bg-[#FFD700] text-[#0A1A4A] font-bold hover:bg-[#FBBF24] transition shadow"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs opacity-60 mt-2">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
      {/* Divider and Copyright */}
      <div className="border-t border-white/20 mt-2 py-4 text-center text-xs opacity-80 bg-[#0A1A4A]">
        © {new Date().getFullYear()} <span className="font-bold text-[#FFD700]">HireWave</span>. All rights reserved.
      </div>
    </footer>
  );
}
