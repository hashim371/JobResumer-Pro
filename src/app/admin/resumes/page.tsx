
"use client"

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import { Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { getTemplates } from '@/lib/template-store';

interface Resume {
  id: string;
  templateId: string;
  updatedAt: string;
}

interface UserWithResumes {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  resumes: Resume[];
}

export default function AdminResumesPage() {
  const [usersWithResumes, setUsersWithResumes] = useState<UserWithResumes[]>([]);
  const [loading, setLoading] = useState(true);
  const templates = getTemplates();

  useEffect(() => {
    const usersRef = ref(db, 'users/');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersList: UserWithResumes[] = Object.keys(usersData)
          .map(uid => {
            const user = usersData[uid];
            if (user.resumes) {
              return {
                uid,
                name: user.name,
                email: user.email,
                photoURL: user.photoURL,
                resumes: Object.keys(user.resumes).map(resumeId => ({
                  id: resumeId,
                  ...user.resumes[resumeId]
                }))
              };
            }
            return null;
          })
          .filter((user): user is UserWithResumes => user !== null);
        setUsersWithResumes(usersList);
      } else {
        setUsersWithResumes([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const getInitials = (name: string) => {
      if (!name) return 'U';
      return name.split(' ').map(n => n[0]).join('').substring(0, 2);
  }

  const formatDateDistance = (dateString: string) => {
    try {
      if (dateString && !isNaN(new Date(dateString).getTime())) {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true });
      }
      return "N/A";
    } catch (error) {
      return "N/A";
    }
  }
  
  const allResumes = usersWithResumes.flatMap(user => 
    user.resumes.map(resume => ({
      ...resume,
      user
    }))
  ).sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());


  if (loading) {
    return <div className="flex h-full w-full items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
  }

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Resume Logs</h1>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Template Used</TableHead>
                <TableHead className="text-right">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allResumes.length > 0 ? (
                allResumes.map(resume => (
                  <TableRow key={resume.user.uid + '-' + resume.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={resume.user.photoURL} alt={resume.user.name} />
                          <AvatarFallback>{getInitials(resume.user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{resume.user.name}</p>
                          <p className="text-sm text-muted-foreground">{resume.user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {templates.find(t => t.id === resume.templateId)?.name || resume.templateId}
                    </TableCell>
                    <TableCell className="text-right">{formatDateDistance(resume.updatedAt)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No resumes found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
