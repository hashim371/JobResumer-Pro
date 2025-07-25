"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { db } from "@/lib/firebase";
import { ref, onValue, set, off, update } from "firebase/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Loader2, User, Mail, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  name: string;
  email: string;
  lastLogin: string;
}

const updateNameSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
});

export function Dashboard() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateNameSchema>>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (!user) return;
    
    const userRef = ref(db, `users/${user.uid}`);
    const listener = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserData(data);
        form.reset({ name: data.name });
      } else {
        // If no data, create initial data
        const initialData = {
          name: user.displayName || user.email?.split('@')[0] || 'New User',
          email: user.email,
          lastLogin: new Date().toISOString(),
        }
        set(userRef, initialData);
      }
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });
    
    // Update last login time
    update(userRef, { lastLogin: new Date().toISOString() });

    return () => {
      off(userRef, "value", listener);
    };
  }, [user, form]);

  const handleNameUpdate = async (values: z.infer<typeof updateNameSchema>) => {
    if (!user) return;
    try {
      const userRef = ref(db, `users/${user.uid}/name`);
      await set(userRef, values.name);
      toast({
        title: "Success!",
        description: "Your name has been updated.",
      });
    } catch (error) {
      console.error("Error updating name:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Could not update your name. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8 font-headline">Your Realtime Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Display Name</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData?.name || "..."}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{userData?.email || "..."}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Login</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{userData ? new Date(userData.lastLogin).toLocaleString() : "..."}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Update Your Info</CardTitle>
          <CardDescription>See the change to your name reflect in realtime above!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleNameUpdate)} className="flex items-end gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>New Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your new name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
