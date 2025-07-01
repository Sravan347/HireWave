import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Inbox } from "lucide-react";

const Offers = () => {
  return (
    <div className="p-6">
      <Card className="bg-[#E6E9F5] shadow-md max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-[#0A1A4A] text-lg flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[#1A3A8F]" />
            Offers
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center text-[#2D3748] py-8">
          <p className="text-4xl mb-4">📬</p>
          <p className="text-sm">Your offers will be listed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Offers;
