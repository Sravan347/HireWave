// /pages/candidate/components/Header.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-white px-6 py-4 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">Hello, {user.name}</h1>
      <button onClick={logout} className="text-red-600 font-bold hover:underline">Logout</button>
    </header>
  );
}
