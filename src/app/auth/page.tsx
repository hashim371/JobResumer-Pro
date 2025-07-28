
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
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
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

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.021,35.591,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
  );
}

export default function AuthPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isProcessingRedirect, setIsProcessingRedirect] = useState(true);

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({ resolver: zodResolver(signUpSchema), defaultValues: { email: "", password: "" } });
  const signInForm = useForm<z.infer<typeof signInSchema>>({ resolver: zodResolver(signInSchema), defaultValues: { email: "", password: "" } });

  useEffect(() => {
    const processRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setLoading(true); // Show loading spinner while we process the result
          await handleAuthSuccess(result.user);
        }
      } catch (error) {
        handleAuthError(error);
      } finally {
        setIsProcessingRedirect(false);
      }
    };
    processRedirectResult();
  }, [auth]);

  useEffect(() => {
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
    // The useEffect above will handle the redirect.
    toast({ title: "Welcome!", description: "You have successfully signed in." });
  };
  
  const handleAuthError = (error: any) => {
    setLoading(false);
    if (error.code === 'auth/unauthorized-domain') {
        toast({ 
            variant: "destructive", 
            title: "Domain Not Authorized", 
            description: (
              <>
                This domain is not authorized for authentication. 
                Please add <code className="p-1 bg-muted rounded-sm">{window.location.hostname}</code> to the list of authorized domains in your Firebase console.
              </>
            ),
            duration: 9000,
        });
    } else {
        toast({ variant: "destructive", title: "Authentication Failed", description: error.code === 'auth/invalid-credential' ? 'Incorrect email or password.' : error.message });
    }
  }

  const onSignUp = async (data: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.email.split('@')[0] });
      await handleAuthSuccess({ ...userCredential.user, displayName: data.email.split('@')[0] });
    } catch (error) { handleAuthError(error); } finally { setLoading(false); }
  };

  const onSignIn = async (data: z.infer<typeof signInSchema>) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      await handleAuthSuccess(userCredential.user);
    } catch (error) { handleAuthError(error); } finally { setLoading(false); }
  };

  const onGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      await signInWithRedirect(auth, provider);
    } catch (error) { 
      handleAuthError(error); 
    }
  };
  
  if (authLoading || isProcessingRedirect || user) {
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
                <Button type="submit" className="w-full" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign In</Button>
              </form></Form>
              <div className="relative"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or continue with</span></div></div>
              <Button variant="outline" className="w-full" onClick={onGoogleSignIn} disabled={loading}><GoogleIcon className="mr-2" /> Google</Button>
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
                <Button type="submit" className="w-full" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create Account</Button>
              </form></Form>
               <div className="relative"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or continue with</span></div></div>
              <Button variant="outline" className="w-full" onClick={onGoogleSignIn} disabled={loading}><GoogleIcon className="mr-2" /> Google</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    