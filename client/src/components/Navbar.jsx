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
    <nav className="bg-[#0A1A4A] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="HireWave Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/login"
            className="text-sm font-medium hover:text-[#FFD447] flex items-center gap-1 transition"
          >
            <UserRound size={18} />
            Login
          </Link>

          <Link
            to="/register"
            className="text-sm font-medium hover:text-[#FFD447] flex items-center gap-1 transition"
          >
            <UserRound size={18} />
            Register
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white hover:text-[#FFD447] px-2 h-8 text-sm font-medium gap-1"
              >
                <Briefcase size={18} />
                For Recruiters
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-[#E6E9F5] text-[#2D3748] w-52 mt-2 rounded-md border border-[#1A3A8F] shadow-md">
              <DropdownMenuItem asChild>
                <Link
                  to="/recruiter/login"
                  className="hover:bg-[#D6CEFA] hover:text-[#0A1A4A] w-full px-2 py-1.5 rounded-sm"
                >
                  Recruiter Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/recruiter/register"
                  className="hover:bg-[#D6CEFA] hover:text-[#0A1A4A] w-full px-2 py-1.5 rounded-sm"
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
                <Menu size={24} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-[#1A3A8F] text-white w-64 pt-16">
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="block font-medium hover:text-[#FFD447]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block font-medium hover:text-[#FFD447]"
                >
                  Register
                </Link>

                <div>
                  <p className="text-sm font-semibold mb-1">For Recruiters</p>
                  <Link
                    to="/recruiter/login"
                    className="block pl-2 hover:text-[#FFD447] text-sm"
                  >
                    Recruiter Login
                  </Link>
                  <Link
                    to="/recruiter/register"
                    className="block pl-2 hover:text-[#FFD447] text-sm"
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
