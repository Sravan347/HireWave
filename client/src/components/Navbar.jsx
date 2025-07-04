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
    <nav className="bg-gradient-to-r from-[#a18cd1] via-[#6d9ee6] to-[#3a7bd5] shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="HireWave Logo" className="h-10 w-auto rounded-full border-2 border-white shadow-sm" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/login"
            className="text-sm font-semibold px-4 py-2 rounded-full bg-[#FFD700] text-white shadow hover:bg-[#e6be00] transition-colors duration-200 flex items-center gap-1"
          >
            <UserRound size={18} />
            Login
          </Link>

          <Link
            to="/register"
            className="text-sm font-semibold px-4 py-2 rounded-full bg-[#6d9ee6] hover:bg-[#a18cd1] text-white shadow transition-colors duration-200 flex items-center gap-1"
          >
            <UserRound size={18} />
            Register
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white hover:text-[#ffe066] bg-opacity-0 hover:bg-opacity-10 px-4 h-8 text-sm font-semibold gap-1 rounded-full shadow"
              >
                <Briefcase size={18} />
                For Recruiters
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white bg-opacity-90 text-[#3a7bd5] w-52 mt-2 rounded-xl border border-[#a18cd1] shadow-lg">
              <DropdownMenuItem asChild>
                <Link
                  to="/recruiter/login"
                  className="hover:bg-[#a18cd1] hover:text-white w-full px-2 py-2 rounded-lg transition-colors"
                >
                  Recruiter Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/recruiter/register"
                  className="hover:bg-[#a18cd1] hover:text-white w-full px-2 py-2 rounded-lg transition-colors"
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
              <Button variant="ghost" className="text-white p-0 bg-opacity-0 hover:bg-opacity-10 rounded-full">
                <Menu size={24} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-gradient-to-b from-[#a18cd1] via-[#6d9ee6] to-[#3a7bd5] text-white w-64 pt-16 shadow-lg">
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="block font-semibold px-4 py-2 rounded-full bg-[#FFD700] text-white shadow hover:bg-[#e6be00] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block font-semibold px-4 py-2 rounded-full bg-[#6d9ee6] hover:bg-[#a18cd1] text-white shadow transition-colors"
                >
                  Register
                </Link>

                <div>
                  <p className="text-sm font-semibold mb-1">For Recruiters</p>
                  <Link
                    to="/recruiter/login"
                    className="block pl-2 hover:text-[#ffe066] text-sm py-1"
                  >
                    Recruiter Login
                  </Link>
                  <Link
                    to="/recruiter/register"
                    className="block pl-2 hover:text-[#ffe066] text-sm py-1"
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
