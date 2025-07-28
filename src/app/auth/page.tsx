
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { set, ref, get, update } from "firebase/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, "Password is required."),
});

export default function AuthPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [formLoading, setFormLoading] = useState(false);
  
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({ resolver: zodResolver(signUpSchema), defaultValues: { email: "", password: "" } });
  const signInForm = useForm<z.infer<typeof signInSchema>>({ resolver: zodResolver(signInSchema), defaultValues: { email: "", password: "" } });

  useEffect(() => {
    // This effect handles redirecting the user away from the auth page if they are logged in.
    if (!authLoading && user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const handleAuthSuccess = async (authUser: User) => {
    const userRef = ref(db, `users/${authUser.uid}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      await set(userRef, {
        name: authUser.displayName || authUser.email?.split('@')[0] || 'Anonymous',
        email: authUser.email,
        photoURL: authUser.photoURL,
        lastLogin: new Date().toISOString(),
      });
    } else {
      await update(userRef, { lastLogin: new Date().toISOString(), photoURL: authUser.photoURL });
    }
  };
  
  const handleAuthError = (error: any) => {
    setFormLoading(false);
    console.error("Authentication Error: ", error);
    let description = error.message;
    if (error.code === 'auth/invalid-credential') {
      description = 'Incorrect email or password.';
    }
    toast({ 
        variant: "destructive", 
        title: "Authentication Failed", 
        description: description,
        duration: 9000,
    });
  }

  const onSignUp = async (data: z.infer<typeof signUpSchema>) => {
    setFormLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.email.split('@')[0] });
      await handleAuthSuccess({ ...userCredential.user, displayName: data.email.split('@')[0] });
    } catch (error) { handleAuthError(error); } finally { setFormLoading(false); }
  };

  const onSignIn = async (data: z.infer<typeof signInSchema>) => {
    setFormLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      await handleAuthSuccess(userCredential.user);
    } catch (error) { handleAuthError(error); } finally { setFormLoading(false); }
  };

  if (authLoading) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>
  }

  // If we are done loading and we have a user, this will also show the spinner
  // while the redirect effect above takes place.
  if(user) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
       <Link href="/" className="absolute top-4 left-4 rounded-md p-2 hover:bg-accent transition-colors">&larr; Back to Home</Link>
      <Tabs defaultValue="signin" className="w-full max-w-md animate-fadeIn">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader><CardTitle>Sign In</CardTitle><CardDescription>Enter your credentials to access your account.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <Form {...signInForm}><form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                <FormField control={signInForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="m@example.com" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                <FormField control={signInForm.control} name="password" render={({ field }) => (<FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                <Button type="submit" className="w-full" disabled={formLoading}>{formLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign In</Button>
              </form></Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
           <Card>
            <CardHeader><CardTitle>Sign Up</CardTitle><CardDescription>Create a new account to get started.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <Form {...signUpForm}><form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                <FormField control={signUpForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="m@example.com" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                <FormField control={signUpForm.control} name="password" render={({ field }) => (<FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                <Button type="submit" className="w-full" disabled={formLoading}>{formLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create Account</Button>
              </form></Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
