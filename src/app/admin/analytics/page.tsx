
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This section will display application usage and statistics.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <BarChart2 className="h-16 w-16 mb-4" />
          <p>Analytics functionality is under construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}
