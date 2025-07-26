
"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CheckCircle, Briefcase, DraftingCompass, Star } from "lucide-react";

const companyLogos: { [key: string]: React.ReactNode } = {
    Google: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100px" height="34px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.021,35.591,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
    ),
    Microsoft: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" width="90px" height="34px"><path fill="#f25022" d="M1 1h9v9H1z"/><path fill="#00a4ef" d="M1 11h9v9H1z"/><path fill="#7fba00" d="M11 1h9v9h-9z"/><path fill="#ffb900" d="M11 11h9v9h-9z"/></svg>
    ),
    Apple: (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.883C12.98 5.883 14.473 5.348 15.31 4.54C14.35 3.59 13.217 3.55 12.565 3.55C10.837 3.55 9.613 4.695 9.613 6.37C9.613 8.084 10.95 9.095 12.522 9.095C13.235 9.095 14.12 8.777 14.87 8.354C14.825 8.39 12.98 9.575 12.98 11.54C12.98 13.94 15.24 14.99 15.355 15.034C15.355 15.056 15.333 15.078 15.31 15.1C14.473 15.655 13.38 15.995 12.435 15.995C10.922 15.995 9.89 15.225 8.93 15.225C7.948 15.225 6.855 15.93 5.81 15.93C4.217 15.93 3.003 14.478 3.003 12.374C3.003 9.475 5.152 7.502 7.228 7.502C8.21 7.502 9.2 8.015 9.87 8.015C10.54 8.015 11.75 7.42 12.89 7.42C12.935 7.42 12.98 7.42 13.024 7.442C12.13 6.452 12 5.883 12 5.883ZM10.522 2.003C11.412 2.003 12.235 2.516 12.825 2.516C13.415 2.516 14.508 1.96 15.62 1.96C16.825 1.96 17.88 2.603 18.532 3.55C17.062 4.608 16.24 6.22 16.24 7.934C16.24 9.854 17.522 11.02 18.992 11.562C18.992 11.562 19.013 11.585 19.035 11.607C19.148 11.54 20.372 10.748 20.372 9.056C20.372 7.73 19.66 6.566 18.792 5.752C17.568 4.385 15.955 3.395 14.288 3.395C13.042 3.395 11.97 4.015 11.23 4.015C10.49 4.015 9.48 3.48 8.275 3.48C6.178 3.48 4.645 4.89 4.645 7.15C4.645 9.412 6.133 10.864 8.078 10.864C9.15 10.864 10.045 10.288 10.635 10.288C11.225 10.288 12.138 10.864 13.148 10.864C13.882 10.864 14.652 10.524 15.31 10.034C14.308 11.242 14.288 12.81 14.288 13.624C14.288 15.82 15.842 17.03 16.138 17.294C15.225 17.84 14.192 18.17 13.38 18.192L13.335 18.192C12.435 18.192 11.5 17.656 10.588 17.656C9.678 17.656 8.52 18.232 7.275 18.232C5.02 18.232 3.488 16.74 3.488 14.636C3.488 11.95 5.542 10.37 7.74 10.37C8.65 10.37 9.48 10.72 10.025 10.72C10.568 10.72 11.458 10.308 12.458 10.308C12.568 10.308 12.678 10.308 12.788 10.33C12.545 9.94 11.832 8.71 11.832 7.42C11.832 5.587 13.19 4.54 14.012 3.992C13.065 2.808 11.852 2.003 10.522 2.003Z"/></svg>
    ),
    Amazon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="34" viewBox="0 0 1024 1024" fill="currentColor"><path d="M495.839 778.112c22.11 0 44.22-3.13 65.65-9.39 42.849-12.52 79.239-33.64 109.17-63.35 29.93-29.71 51.05-67.31 63.57-112.75 8.92-32.96 13.4-67.92 13.4-104.91 0-35.03-3.95-68.59-11.83-100.59-7.88-31.99-18.9-61.6-32.96-88.82-14.06-27.22-31.42-51.05-51.84-71.47-20.42-20.42-43.86-37.31-70.22-49.83-26.36-12.52-54.94-22.33-85.7-29.32-30.76-6.99-62.77-11.41-95.84-13.2-1.17-0.06-2.34-0.1-3.52-0.1-36.99 0-72.63 4.88-106.96 14.69-34.33 9.8-65.46 25.1-93.22 45.92-27.76 20.82-51.65 47.74-71.47 80.49-19.82 32.75-34.93 71.47-45.24 116.14-7.39 31.25-11.1 63.8-11.1 97.41 0 25.16 2.34 49.65 7.02 73.44 4.68 23.79 11.41 46.8 20.21 68.99 8.8 22.19 19.58 43.21 32.37 62.96 12.8 19.75 27.65 37.95 44.46 54.59 16.8 16.64 35.53 31.59 55.95 44.78 20.42 13.19 42.43 24.52 65.86 33.9 23.44 9.38 48.24 16.89 74.12 22.42 25.88 5.53 52.44 8.92 79.45 10.14h0.96c0.1 0 0.18-0.01 0.28-0.01l0.28-0.01h0.96c0.1 0 0.18-0.01 0.28-0.01l0.28-0.01h0.96c0.1 0 0.18-0.01 0.28-0.01l0.28-0.01h0.96c0.1 0 0.18-0.01 0.28-0.01l0.28-0.01h0.68z m277.56-43.21c-22.8-59.22-68.9-105.71-131.06-131.28-9.01-3.71-18.29-6.9-27.81-9.58-16.17-4.57-32.9-8.08-50.05-10.47-17.15-2.39-34.46-3.59-51.84-3.59-40.4 0-79.62 6.02-117.2 17.98-37.58 11.96-71.05 29.86-99.77 53.2-28.72 23.34-52.56 51.65-70.89 84.45-18.33 32.8-30.65 69.94-36.5 110.68-4.14 28.52-6.22 57.65-6.22 87.16 0 11.51 0.68 22.92 2.05 34.22 1.36 11.3 3.4 22.5 6.11 33.56 12.31 49.33 37.31 91.07 72.82 121.24 35.52 30.17 79.13 48.24 126.39 52.19 2.57 0.21 5.15 0.38 7.74 0.52 14.82 0.77 29.62 1.16 44.35 1.16 33.24 0 65.65-2.77 96.9-8.31 31.25-5.54 61.14-13.74 89.23-24.52 28.09-10.78 54.3-24.13 78.2-39.88 23.9-15.75 45.47-33.89 64.39-54.19 18.91-20.3 34.92-42.85 47.81-67.44 12.89-24.59 22.56-51.05 28.87-79.05 4.31-19.42 6.47-39.23 6.47-59.22 0-25.77-3.13-50.87-9.39-75.14-6.25-24.27-15.42-47.56-27.32-69.57-11.9-22.01-26.69-42.5-44.14-61.22-17.45-18.72-37.58-35.45-60.1-49.94-22.51-14.49-47.5-26.7-74.65-36.4-27.15-9.71-56.12-16.9-86.58-21.49-30.46-4.58-61.79-6.88-93.74-6.88-29.21 0-57.88 1.95-85.8 5.86-27.92 3.9-54.94 9.68-80.92 17.2-25.98 7.51-50.62 16.78-73.65 27.64-23.03 10.86-44.47 23.44-63.96 37.6-19.5 14.16-37.1 30.01-52.6 47.45-15.5 17.45-28.72 36.59-39.5 57.19-10.78 20.6-19.14 42.43-24.93 65.25-5.79 22.82-8.69 46.38-8.69 70.43 0 29.86 3.69 58.9 11.09 86.89 7.4 27.99 18.06 54.39 31.9 78.94 13.84 24.55 30.65 46.99 50.24 67.16 19.59 20.17 41.7 37.85 66.08 52.81 24.38 14.96 50.84 27.22 79.16 36.59 28.32 9.37 58.12 15.97 89.02 19.67 30.9 3.7 62.47 5.13 94.42 4.25 1.54-0.04 3.08-0.1 4.62-0.18 10.15-0.52 20.26-1.32 30.3-2.4 9.94-1.07 19.8-2.4 29.56-4.01 9.77-1.61 19.43-3.48 28.98-5.64 9.55-2.15 18.99-4.58 28.29-7.29 9.3-2.71 18.49-5.69 27.53-8.96 9.05-3.27 17.98-6.8 26.79-10.6 8.81-3.8 17.5-7.85 26.06-12.17 8.55-4.32 16.99-8.92 25.29-13.81 8.3-4.9 16.48-10.08 24.52-15.56 8.04-5.48 15.96-11.23 23.75-17.26 7.79-6.03 15.46-12.34 22.99-18.91 4.66-4.08 9.25-8.27 13.75-12.57z"></path><path d="M941.87 585.348c-15.22-8.47-30.82-15.82-46.73-21.99-15.91-6.17-32.08-11.1-48.42-14.73-16.34-3.63-32.8-5.87-49.34-6.68-16.53-0.81-33.1-1.12-49.65-0.91-10.83 0.14-21.65 0.7-32.42 1.68-10.77 0.98-21.47 2.37-32.07 4.19-10.6 1.82-21.09 4.07-31.43 6.77-10.34 2.7-20.55 5.84-30.58 9.45-10.03 3.6-19.87 7.66-29.49 12.17-9.61 4.51-18.99 9.46-28.12 14.86-9.13 5.4-18.01 11.23-26.61 17.51-8.6 6.28-16.92 13-24.96 20.14-2.81 2.5-5.58 5.06-8.29 7.68-5.32 5.15-10.5 10.46-15.53 15.9-2.46 2.66-4.89 5.37-7.29 8.11-2.39 2.74-4.75 5.53-7.07 8.35-4.56 5.54-9.01 11.19-13.33 16.96-4.32 5.76-8.52 11.64-12.58 17.62-4.06 5.98-7.99 12.07-11.79 18.26-3.8 6.19-7.48 12.48-11.02 18.86-1.75 3.16-3.47 6.34-5.17 9.54-3.34 6.28-6.61 12.62-9.79 18.99-3.18 6.38-6.27 12.8-9.28 19.25-3 6.45-5.91 12.92-8.74 19.42-2.83 6.49-5.57 13-8.23 19.53-2.66 6.53-5.23 13.08-7.71 19.64-2.48 6.56-4.88 13.14-7.18 19.72-2.31 6.58-4.53 13.17-6.66 19.75-2.13 6.58-4.18 13.17-6.13 19.75-1.95 6.58-3.82 13.16-5.61 19.72-1.79 6.56-3.49 13.12-5.11 19.65-1.62 6.53-3.16 13.06-4.61 19.58-1.45 6.52-2.82 13.03-4.11 19.52-1.29 6.49-2.49 12.96-3.62 19.42-1.13 6.45-2.17 12.89-3.14 19.31-0.97 6.42-1.86 12.83-2.67 19.22-0.81 6.39-1.54 12.77-2.19 19.13-0.65 6.36-1.22 12.7-1.72 19.04-0.5 6.33-0.91 12.65-1.25 18.96-0.34 6.31-0.61 12.6-0.8 18.9-0.19 6.29-0.3 12.56-0.34 18.83l-0.01 0.6c-0.02 2.06-0.02 4.13-0.02 6.19 0 2.06 0 4.13 0.02 6.19l0.01 0.6c0.04 6.27 0.15 12.54 0.34 18.83 0.19 6.3 0.46 12.59 0.8 18.9 0.34 6.31 0.75 12.62 1.25 18.96 0.5 6.34 1.07 12.68 1.72 19.04 0.65 6.36 1.38 12.74 2.19 19.13 0.81 6.39 1.7 12.79 2.67 19.22 0.97 6.42 2.01 12.86 3.14 19.31 1.13 6.46 2.33 12.92 3.62 19.42 1.29 6.49 2.66 13 4.11 19.52 1.45 6.52 2.99 13.04 4.61 19.58 1.62 6.53 3.32 13.09 5.11 19.65 1.79 6.56 3.66 13.14 5.61 19.72 1.95 6.58 3.99 13.17 6.13 19.75 2.13 6.58 4.35 13.17 6.66 19.75 2.3 6.58 4.69 13.16 7.18 19.72 2.48 6.56 5.05 13.11 7.71 19.64 2.66 6.53 5.4 13.04 8.23 19.53 2.83 6.49 5.74 12.96 8.74 19.42 3.01 6.45 6.1 12.87 9.28 19.25 3.18 6.37 6.45 12.71 9.79 18.99 1.7 3.2 3.42 6.38 5.17 9.54 3.54 6.38 7.22 12.67 11.02 18.86 3.8 6.19 7.73 12.28 11.79 18.26 4.06 5.98 8.26 11.86 12.58 17.62 4.32 5.77 8.77 11.42 13.33 16.96 2.32 2.82 4.68 5.61 7.07 8.35 2.4 2.74 4.83 5.45 7.29 8.11 5.03 5.44 10.21 10.75 15.53 15.9 2.71 2.62 5.48 5.18 8.29 7.68 8.04 7.14 16.36 13.86 24.96 20.14 8.6 6.28 17.48 12.11 26.61 17.51 9.13 5.4 18.49 10.35 28.12 14.86 9.62 4.51 19.46 8.57 29.49 12.17 10.03 3.61 20.24 6.75 30.58 9.45 10.34 2.7 20.83 4.95 31.43 6.77 10.6 1.82 21.3 3.21 32.07 4.19 10.77 0.98 21.59 1.54 32.42 1.68 16.55 0.21 33.15-0.1 49.65-0.91 16.54-0.81 32.99-3.05 49.34-6.68 16.34-3.63 32.51-8.56 48.42-14.73 15.91-6.17 31.51-13.52 46.73-21.99 7.48-4.17 14.85-8.58 22.1-13.23z"></path></svg>
    ),
    Netflix: (
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="34" viewBox="0 0 24 24"><path fill="#e50914" d="M12.007 2.012c-5.522 0-9.995 4.478-9.995 10.005s4.473 10.005 9.995 10.005c5.522 0 9.995-4.478 9.995-10.005S17.529 2.012 12.007 2.012zm-3.002 16.49v-12.99l6.582 12.99h-1.637l-1.62-3.24h-1.688v3.24h-1.737zm4.332-1.725l-2.61-5.222 2.61-6.04h1.697v11.262h-1.697z"/></svg>
    ),
    Facebook: (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="110" height="34" viewBox="0 0 48 48"><linearGradient id="Ld6sqrtcxMyckEl6oeadsa_uLSVCDQ_1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2aa4f4"></stop><stop offset="1" stopColor="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6oeadsa_uLSVCDQ_1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.559h-5.989v-3.662c0-1.719,0.984-3.223,3.223-3.223h3.194V12.46c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.919h-4.187v5.559h4.187v12.16h5.484V29.301z"></path></svg>
    ),
};

export default function Home() {

  const features = [
    {
      icon: <DraftingCompass className="h-10 w-10 text-accent" />,
      title: "Stunning Templates",
      description: "Choose from a variety of professionally designed templates that are proven to get noticed."
    },
    {
      icon: <Briefcase className="h-10 w-10 text-accent" />,
      title: "AI-Powered Assistant",
      description: "Our AI helps you write compelling summary and experience sections, tailored to your industry."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-accent" />,
      title: "Easy PDF Download",
      description: "Download a pixel-perfect PDF of your resume in a single click, ready to be sent out."
    }
  ];

  const testimonials = [
    {
      name: "Sarah L.",
      role: "Product Manager",
      quote: "JobeResumer made it incredibly easy to create a professional resume that truly stands out. I landed my dream job in weeks!",
      stars: 5
    },
    {
      name: "Michael B.",
      role: "Software Engineer",
      quote: "The templates are modern and ATS-friendly. I got more interviews with my new resume than ever before. Highly recommended!",
      stars: 5
    },
    {
      name: "Jessica P.",
      role: "UX Designer",
      quote: "As a designer, aesthetics matter to me. I was impressed by the beautiful templates and the intuitive editor. A fantastic tool!",
      stars: 5
    },
     {
      name: "David C.",
      role: "Marketing Director",
      quote: "I hadn't updated my resume in years. JobeResumer guided me through the process and the result was polished and professional.",
      stars: 4
    }
  ];

  const companies = ["Google", "Microsoft", "Apple", "Amazon", "Netflix", "Facebook"];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="text-center animate-fadeIn py-16">
              <h1 className="text-5xl font-bold tracking-tight font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Build your professional resume
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                Create a stunning resume in minutes with our professionally designed templates.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <Link href="/templates">
                    Choose a Template
                  </Link>
                </Button>
              </div>
               <div className="mt-16">
                  <Image src="https://placehold.co/800x600.png" alt="Resume templates preview" width={800} height={600} className="rounded-lg shadow-2xl mx-auto" data-ai-hint="resume templates" />
              </div>
            </div>
        </div>
        
        {/* About Section */}
        <section id="about" className="bg-muted/40 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                At JobeResumer, our mission is to empower job seekers by providing them with the tools and resources needed to create professional, modern resumes that open doors to new opportunities. We believe that a great resume is a key step towards a successful career, and we're dedicated to making that step as simple and effective as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Features/Benefits Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Why Choose Us?</h2>
                <p className="mt-4 text-lg text-muted-foreground">Everything you need to craft the perfect resume.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section id="trusted-by" className="py-16 bg-muted/40">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-2xl font-semibold text-muted-foreground mb-8">
                    Trusted by professionals who landed jobs at
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-4 text-gray-500 hover:text-gray-700 transition-colors duration-300">
                    {companies.map((company) => (
                       <div key={company} title={company} className="h-10 flex items-center">
                           {companyLogos[company]}
                       </div>
                    ))}
                </div>
            </div>
        </section>


        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">What Our Users Say</h2>
                <p className="mt-4 text-lg text-muted-foreground">Real stories from job seekers we've helped.</p>
            </div>
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="flex flex-col justify-between h-full p-6 shadow-md">
                        <div>
                          <div className="flex items-center mb-2">
                            {Array(testimonial.stars).fill(0).map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                          </div>
                          <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                        </div>
                        <div className="mt-4 text-right">
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

    