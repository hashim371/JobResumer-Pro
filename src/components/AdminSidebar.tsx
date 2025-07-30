
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  FileText,
  LayoutTemplate,
  BarChart2,
  LogOut,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/users', icon: Users, label: 'Users' },
  { href: '/admin/resumes', icon: FileText, label: 'Resumes' },
  { href: '/admin/templates', icon: LayoutTemplate, label: 'Templates' },
  { href: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
  
  const getInitials = (name: string) => {
      if (!name) return 'A';
      return name.split(' ').map(n => n[0]).join('').substring(0, 2);
  }

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-background flex-col hidden lg:flex">
      <div className="p-4 border-b h-16 flex items-center">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="grad2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "hsl(var(--accent))", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                fill="url(#grad2)"
                fillOpacity="0.2"
                stroke="url(#grad2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2V8H20"
                stroke="url(#grad2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
               <path 
                d="M9.5 13.5L11 12L9.5 10.5M14.5 13.5L13 15L14.5 16.5" 
                stroke="hsl(var(--primary))" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            <span className="font-bold font-headline">JobResumer</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <Button
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t mt-auto space-y-2">
        <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/">
                <ArrowLeft className="mr-3 h-5 w-5" />
                Back to Site
            </Link>
        </Button>
        <div className="flex items-center gap-3">
             <Avatar className="h-9 w-9">
                <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'Admin'} />
                <AvatarFallback>{getInitials(user?.displayName ?? 'Admin')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">{user?.displayName}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-muted-foreground flex-shrink-0">
                <LogOut className="h-5 w-5" />
            </Button>
        </div>
      </div>
    </aside>
  );
}
