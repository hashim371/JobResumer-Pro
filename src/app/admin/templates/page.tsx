
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutTemplate } from "lucide-react";

export default function AdminTemplatesPage() {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Template Control</h1>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This section will allow you to add, edit, and delete resume templates.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <LayoutTemplate className="h-16 w-16 mb-4" />
          <p>Template management functionality is under construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}
