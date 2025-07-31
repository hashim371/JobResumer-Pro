
"use client"

import { useEffect, useState, useMemo } from 'react';
import { db } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, FileText, Loader2 } from "lucide-react";
import { getTemplates } from '@/lib/template-store';
import { subDays, format, isAfter, isValid } from 'date-fns';

interface Resume {
  templateId: string;
}

interface User {
  createdAt: string;
  resumes?: { [key: string]: Resume };
}

export default function AdminAnalyticsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const templates = getTemplates();

  useEffect(() => {
    const usersRef = ref(db, 'users/');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersList: User[] = Object.values(usersData);
        setUsers(usersList);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const totalUsers = users.length;
  const totalResumes = useMemo(() => {
    return users.reduce((acc, user) => acc + (user.resumes ? Object.keys(user.resumes).length : 0), 0);
  }, [users]);

  const templateUsageData = useMemo(() => {
    const usage = new Map<string, number>();
    users.forEach(user => {
      if (user.resumes) {
        Object.values(user.resumes).forEach(resume => {
          const templateName = templates.find(t => t.id === resume.templateId)?.name || "Unknown";
          usage.set(templateName, (usage.get(templateName) || 0) + 1);
        });
      }
    });
    return Array.from(usage.entries()).map(([name, count]) => ({ name, count })).sort((a,b) => b.count - a.count);
  }, [users, templates]);
  
  const userSignupsLast30Days = useMemo(() => {
    const last30Days = subDays(new Date(), 30);
    const signups = new Map<string, number>();

    // Initialize map for the last 30 days
    for (let i = 0; i < 30; i++) {
        const date = format(subDays(new Date(), i), 'MMM d');
        signups.set(date, 0);
    }
    
    users.forEach(user => {
        if (user.createdAt && isValid(new Date(user.createdAt))) {
          const createdAtDate = new Date(user.createdAt);
          if (isAfter(createdAtDate, last30Days)) {
            const dateStr = format(createdAtDate, 'MMM d');
            if(signups.has(dateStr)) {
              signups.set(dateStr, (signups.get(dateStr) || 0) + 1);
            }
          }
        }
    });

    return Array.from(signups.entries()).map(([date, count]) => ({ date, count })).reverse();
  }, [users]);

  if (loading) {
    return <div className="flex h-full w-full items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card className="transform hover:-translate-y-1 transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card className="transform hover:-translate-y-1 transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resumes Created</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResumes}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
         <Card className="transform hover:-translate-y-1 transition-transform duration-300">
          <CardHeader>
            <CardTitle>Template Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            {templateUsageData.length > 0 ? (
                 <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={templateUsageData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
                      <YAxis allowDecimals={false} />
                      <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
            ) : <p className="text-muted-foreground text-center py-12">No resume data yet.</p>}
          </CardContent>
        </Card>
         <Card className="transform hover:-translate-y-1 transition-transform duration-300">
          <CardHeader>
            <CardTitle>User Sign-ups (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
             <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userSignupsLast30Days} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} name="New Users" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
