
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
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M12.01,20.29c-1.12,0-2.18-.34-3.15-.97a5.53,5.53,0,0,1-1.87-2.23c-.76-1.29-1.33-3.36-1.33-5.43,0-2.3.62-4.32,1.81-5.69s2.89-2.08,4.59-2.08c1.08,0,2.12.33,3.09.96a5.27,5.27,0,0,1,1.89,2.37c-.05,0-.1,0-.16,0a5.21,5.21,0,0,0-1.22-.19c-1.42,0-2.61.47-3.56,1.43s-1.44,2.23-1.44,3.8,4.71,2.78,4.71,2.78a5.5,5.5,0,0,1-2.48,1.83C13.06,20.23,12.55,20.29,12.01,20.29ZM13,3.52a4.66,4.66,0,0,0-2.23.63,4.3,4.3,0,0,0-1.72,1.8C8.5,7,8.81,8,9.5,8.44a3.86,3.86,0,0,1,2.25.19,4.28,4.28,0,0,0,2.16-1.81A5.39,5.39,0,0,0,13,3.52Z"/></svg>
    ),
    Amazon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="34" viewBox="0 0 1024 1024" fill="currentColor"><path d="M166.4 691.2c-27.435 0-53.645-8.533-76.8-25.6-23.147-17.067-40.96-41.387-51.2-71.253-10.24-29.867-15.36-64-15.36-102.4s5.12-72.533 15.36-102.4c10.24-29.867 28.053-54.187 51.2-71.253s49.365-25.6 76.8-25.6c35.627 0 69.12 12.373 98.987 37.12 29.867 24.747 51.2 59.733 63.147 103.253l17.067-11.093c-14.507-44.373-39.253-81.067-72.533-106.667-33.28-25.6-73.813-38.4-120.107-38.4-38.827 0-75.093 11.093-106.667 33.28-31.573 22.187-56.32 51.2-72.533 85.333-16.213 34.133-24.32 72.533-24.32 115.2s8.107 80.853 24.32 115.2c16.213 34.133 40.96 63.147 72.533 85.333s67.84 33.28 106.667 33.28c46.293 0 86.613-12.8 120.107-38.4 33.28-25.6 58.027-62.293 72.533-106.667l-17.067-11.093c-11.947 43.52-33.28 78.507-63.147 103.253-29.867 24.747-63.36 37.12-98.987 37.12z M353.707 720.64h23.147L542.293 300.8h-23.147z M563.2 300.8l170.667 419.84h23.147l170.667-419.84h-23.147l-159.147 388.267-159.147-388.267h-23.147zM955.307 275.2c-1.707-8.533-5.12-16.213-10.24-22.187s-11.947-10.24-20.48-12.8-18.347-3.413-29.867-2.56-22.613 2.987-33.28 6.827c-10.667 3.84-20.48 9.387-29.867 16.213s-17.493 15.36-24.32 25.6c-6.827 10.24-11.947 21.76-15.36 34.133-3.413 12.373-5.12 25.6-5.12 39.253v248.64h23.147V566.4c0-34.133 8.533-64.427 25.6-90.987s40.96-40.107 71.253-40.107c11.947 0 22.187 2.133 30.72 6.4s15.36 10.24 19.627 17.92c4.267 7.68 6.4 16.64 6.4 27.307v131.093h23.147V403.2c0-23.979-5.12-45.653-15.36-64.853-10.24-19.2-24.32-34.987-42.667-47.573s-39.68-18.773-63.147-18.773c-36.437 0-66.987 11.947-91.819 35.84-24.832 23.893-37.248 56.747-37.248 98.987v156.16h23.147V563.2c0-26.453 6.827-49.067 20.48-67.84s32.768-28.16 56.747-28.16c21.333 0 38.4 6.827 51.2 20.48s19.2 32.341 19.2 56.32v159.147h23.147V403.2c0-14.507-2.56-27.733-7.68-39.68-5.12-11.947-12.8-22.187-22.187-30.72s-21.333-14.933-35.84-19.2c-14.507-4.267-30.72-6.4-48.64-6.4-42.667 0-77.653 14.507-104.96 43.52-27.307 29.013-40.96 68.267-40.96 116.693v150.187h23.147V566.4c0-37.653 11.093-69.12 33.28-94.208s51.2-37.653 85.333-37.653c37.653 0 68.693 13.227 92.587 39.68s35.84 59.733 35.84 100.267v147.2h23.147z"/></svg>
    ),
    Netflix: (
       <svg xmlns="http://www.w3.org/2000/svg" width="80" height="34" viewBox="0 0 168 30" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12.721 29.032H25.044V0H12.721V29.032ZM36.175 0V22.2L53.722 0H36.175ZM65.816 29.032H78.14V0H65.816V29.032ZM92.176 14.285L80.463 0H98.335L104.14 8.572L110.177 0H127.813L115.868 14.285L128 29.032H110.364L104.14 19.52L97.915 29.032H80.225L92.176 14.285ZM155.021 0L137.474 29.032H155.253L168 0H155.021Z" fill="#E50914"/></svg>
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
    
    

    