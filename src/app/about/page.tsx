"use client";
import AppLayout from "@/components/layout/AppLayout";

export default function AboutPage() {
  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-slate-500">162 Limited is an AI consultancy.</p>
      </div>
    </AppLayout>
  );
}
