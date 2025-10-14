import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export type CardProps = {
  cardName: string;
  cardIcon: React.ElementType;
  cardDescription: string;
};

export default function DashboardCard({ cardName, cardIcon: Icon, cardDescription}: CardProps) {
  return (
    <Card className="bg-white px-10 py-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center">
      <Icon className="text-indigo-600 mb-4" size={58}/>
      <div className="space-y-2">
      <CardTitle className="text-2xl font-semibold text-gray-800">{cardName}</CardTitle>
      <CardDescription className="text-gray-500 text-sm">{cardDescription}</CardDescription>
      </div>
    </Card>
  )
} 