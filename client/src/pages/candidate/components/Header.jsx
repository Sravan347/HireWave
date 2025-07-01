import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <header className="bg-[#E6E9F5] px-6 py-4 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-semibold text-[#0A1A4A]">
          Hello, <span className="font-bold">{user?.name}</span>
        </h1>
        <Button
          onClick={logout}
          variant="destructive"
          className="bg-[#F4A261] hover:bg-[#e28e44] text-white font-medium"
        >
          Logout
        </Button>
      </header>
      <Separator className="bg-[#D6CEFA]" />
    </>
  );
}
