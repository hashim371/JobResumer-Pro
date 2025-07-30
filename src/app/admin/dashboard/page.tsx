
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, FileText, LayoutTemplate, BarChart2 } from "lucide-react";
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { title: "User Management", icon: <Users className="h-6 w-6 text-primary" />, description: "View, edit, and manage all users.", href: "/admin/users" },
    { title: "Resume Logs", icon: <FileText className="h-6 w-6 text-primary" />, description: "Browse all resumes created by users.", href: "/admin/resumes" },
    { title: "Template Control", icon: <LayoutTemplate className="h-6 w-6 text-primary" />, description: "Add, edit, or remove resume templates.", href: "/admin/templates" },
    { title: "Analytics", icon: <BarChart2 className="h-6 w-6 text-primary" />, description: "View application usage and statistics.", href: "/admin/analytics" },
  ];

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.title}>
            <Card className="hover:shadow-lg transition-shadow duration-300 hover:border-primary cursor-pointer h-full hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {stat.icon}
                  <CardTitle>{stat.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{stat.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
