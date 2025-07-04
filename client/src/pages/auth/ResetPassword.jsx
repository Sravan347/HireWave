import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be 6+ characters");

    try {
      await resetPassword(token, password);
      toast.success("Password updated. You can now log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6E9F5] dark:bg-[#181818] px-4">
      <Card className="w-full max-w-md shadow-xl border border-[#D6CEFA] dark:border-[#333333]">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-[#0A1A4A] dark:text-[#7F5AF0]">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <Input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white dark:bg-[#282828] border border-[#1A3A8F]"
            />
            <Button type="submit" className="w-full bg-[#7F5AF0] hover:bg-[#5A3DF0]">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
