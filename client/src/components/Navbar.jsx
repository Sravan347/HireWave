import React from "react";
import { Link } from "react-router-dom";
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
  return (
    <nav className="backdrop-blur-md bg-[color:rgba(10,26,74,0.85)] text-[var(--hw-gray-blue)] shadow-lg border-b border-[var(--hw-blue)] fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="HireWave Logo" className="h-12 w-auto drop-shadow-md transition-transform group-hover:scale-105" />
          <span className="text-xl font-extrabold tracking-tight text-[var(--hw-soft-bg)]">HireWave</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/login"
            className="text-base font-medium text-[var(--hw-soft-bg)] hover:text-[var(--hw-yellow-gold)] flex items-center gap-1 transition-colors duration-200"
          >
            <UserRound size={20} />
            Login
          </Link>

          <Link
            to="/register"
            className="ml-2 px-5 py-2 rounded-full bg-[var(--hw-violet)] text-white font-semibold shadow-md hover:bg-[var(--hw-purple)] transition-colors duration-200 text-base border border-[var(--hw-deep-violet)]"
            style={{ boxShadow: '0 2px 8px 0 rgba(89,54,217,0.10)' }}
          >
            Register
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-[var(--hw-soft-bg)] hover:text-[var(--hw-yellow-gold)] px-3 h-10 text-base font-semibold gap-1 transition-colors duration-200 rounded-full"
              >
                <Briefcase size={20} />
                For Recruiters
                <ChevronDown size={18} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-[var(--hw-soft-bg)] text-[var(--hw-gray-blue)] w-56 mt-3 rounded-xl border border-[var(--hw-blue)] shadow-lg">
              <DropdownMenuItem asChild>
                <Link
                  to="/recruiter/login"
                  className="hover:bg-[var(--hw-pale-violet)] hover:text-[var(--hw-navy)] w-full px-3 py-2 rounded-lg transition-colors duration-200 font-medium"
                >
                  Recruiter Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/recruiter/register"
                  className="hover:bg-[var(--hw-pale-violet)] hover:text-[var(--hw-navy)] w-full px-3 py-2 rounded-lg transition-colors duration-200 font-medium"
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
              <Button variant="ghost" className="text-[var(--hw-soft-bg)] p-0">
                <Menu size={28} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-[color:rgba(26,58,143,0.97)] text-[var(--hw-soft-bg)] w-72 pt-20 border-l border-[var(--hw-navy)] shadow-xl rounded-l-2xl">
              <div className="space-y-6">
                <Link
                  to="/login"
                  className="block font-semibold text-lg hover:text-[var(--hw-yellow-gold)] transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block font-semibold text-lg bg-[var(--hw-violet)] text-white rounded-full px-5 py-2 shadow hover:bg-[var(--hw-purple)] border border-[var(--hw-deep-violet)] transition-colors duration-200"
                >
                  Register
                </Link>

                <div>
                  <p className="text-base font-bold mb-2 text-[var(--hw-yellow-gold)]">For Recruiters</p>
                  <Link
                    to="/recruiter/login"
                    className="block pl-3 py-2 rounded-lg hover:text-[var(--hw-yellow-gold)] text-base font-medium transition-colors duration-200"
                  >
                    Recruiter Login
                  </Link>
                  <Link
                    to="/recruiter/register"
                    className="block pl-3 py-2 rounded-lg hover:text-[var(--hw-yellow-gold)] text-base font-medium transition-colors duration-200"
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
