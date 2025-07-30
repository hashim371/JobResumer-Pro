
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function AdminResumesPage() {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Resume Logs</h1>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This section will display a log of all resumes created by users.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <FileText className="h-16 w-16 mb-4" />
          <p>Resume log functionality is under construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}
