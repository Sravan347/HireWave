import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast.success("Email sent! Check your inbox.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error sending email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6E9F5] dark:bg-[#181818] px-4">
      <Card className="w-full max-w-md shadow-xl border border-[#D6CEFA] dark:border-[#333333]">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-[#0A1A4A] dark:text-[#7F5AF0]">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white dark:bg-[#282828] border border-[#1A3A8F]"
            />
            <Button type="submit" className="w-full bg-[#7F5AF0] hover:bg-[#5A3DF0]">
              Send Reset Link
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
