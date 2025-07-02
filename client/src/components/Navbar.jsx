import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Briefcase, ChevronDown, Menu, UserRound } from "lucide-react";
import logo from "../assets/logo.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-gradient-to-r from-[#7F5AF0] via-[#4C6EF5] to-[#0A1A4A] dark:from-[#232347] dark:via-[#4C6EF5] dark:to-[#181818] shadow-lg border-b border-white/10 sticky top-0 z-50 transition">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-4 group">
          {/* Cube-style logo background (no border) */}
          <span className="inline-flex items-center justify-center h-16 w-16 shadow-2xl" style={{ perspective: '400px' }}>
            <span className="relative h-14 w-14 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #7F5AF0 0%, #4C6EF5 60%, #0A1A4A 100%)',
                borderRadius: '12%',
                boxShadow: '0 6px 24px 0 rgba(79,70,229,0.25)',
                transform: 'rotateY(18deg) rotateX(12deg)',
              }}
            >
              <img src={logo} alt="HireWave Logo" className="h-10 w-10 object-contain drop-shadow-lg" />
              {/* Cube edges removed for a cleaner look */}
            </span>
          </span>
          <span className="hidden md:inline-block text-3xl font-extrabold text-white dark:text-white tracking-tight drop-shadow-lg group-hover:opacity-90 transition-opacity">HireWave</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/login"
            className={`text-base font-medium px-5 py-2 rounded-full bg-transparent text-white hover:bg-white/10 hover:text-[#B5A9FF] transition-all duration-200 flex items-center gap-1 ${location.pathname === "/login" ? "underline underline-offset-4 decoration-[#B5A9FF]" : ""}`}
          >
            <UserRound size={20} />
            Login
          </Link>

          <Link
            to="/register"
            className={`text-base font-medium px-5 py-2 rounded-full bg-white text-[#7F5AF0] hover:bg-[#B5A9FF] hover:text-white transition-all duration-200 flex items-center gap-1 font-semibold shadow ${location.pathname === "/register" ? "underline underline-offset-4 decoration-[#B5A9FF]" : ""}`}
          >
            <UserRound size={20} />
            Register
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white px-3 h-10 text-base font-medium gap-1 rounded-full bg-white/10 hover:bg-[#B5A9FF]/20 hover:text-[#B5A9FF] transition"
              >
                <Briefcase size={20} />
                For Recruiters
                <ChevronDown size={18} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-gradient-to-br from-[#E6E9F5] via-[#B5A9FF] to-[#7F5AF0] dark:from-[#232347] dark:via-[#4C6EF5] dark:to-[#181818] text-[#0A1A4A] dark:text-[#B5A9FF] w-56 mt-2 rounded-xl border border-[#B5A9FF]/30 shadow-2xl">
              <DropdownMenuItem asChild>
                <Link
                  to="/recruiter/login"
                  className="hover:bg-[#B5A9FF]/30 hover:text-[#0A1A4A] w-full px-4 py-2 rounded-lg transition"
                >
                  Recruiter Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/recruiter/register"
                  className="hover:bg-[#B5A9FF]/30 hover:text-[#0A1A4A] w-full px-4 py-2 rounded-lg transition"
                >
                  Recruiter Register
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-white p-0">
                <Menu size={28} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-gradient-to-br from-[#E6E9F5] via-[#B5A9FF] to-[#7F5AF0] dark:from-[#232347] dark:via-[#4C6EF5] dark:to-[#181818] text-[#0A1A4A] dark:text-[#B5A9FF] w-72 pt-20 shadow-2xl border-l border-[#B5A9FF]/20">
              <div className="space-y-8">
                <Link
                  to="/login"
                  className="block font-medium px-5 py-3 rounded-full bg-transparent text-[#7F5AF0] hover:bg-[#B5A9FF]/20 hover:text-[#0A1A4A] transition text-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block font-medium px-5 py-3 rounded-full bg-white text-[#7F5AF0] hover:bg-[#B5A9FF] hover:text-white font-semibold transition text-lg shadow"
                >
                  Register
                </Link>
                <div className="border-t border-[#B5A9FF]/20 my-4"></div>
                <div>
                  <p className="text-base font-semibold mb-3">For Recruiters</p>
                  <Link
                    to="/recruiter/login"
                    className="block pl-3 py-2 rounded-lg hover:bg-[#B5A9FF]/20 hover:text-[#0A1A4A] text-base transition"
                  >
                    Recruiter Login
                  </Link>
                  <Link
                    to="/recruiter/register"
                    className="block pl-3 py-2 rounded-lg hover:bg-[#B5A9FF]/20 hover:text-[#0A1A4A] text-base transition"
                  >
                    Recruiter Register
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
