
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
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.18,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.18,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.18,22C17.6,22 21.54,18.5 21.54,12.81C21.54,11.76 21.35,11.1 21.35,11.1V11.1Z" /></svg>
  ),
  Microsoft: (
    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M2,3H11V12H2V3M13,3H22V12H13V3M2,13H11V22H2V13M13,13H22V22H13V13" /></svg>
  ),
  Apple: (
     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M19.1,10.2c-0.3-2.2-2.2-3.8-4.4-3.8c-1.4,0-2.7,0.8-3.5,2c-0.8-1.2-2.1-2-3.5-2c-2.2,0-4.1,1.6-4.4,3.8 c-2.3,0.2-4,2.2-4,4.6c0,2.6,2.1,4.7,4.7,4.7h13.1c2.6,0,4.7-2.1,4.7-4.7C23.1,12.4,21.4,10.4,19.1,10.2z M14.6,7.1 c1.5,0,2.8,1.1,3,2.6H14V7.2C14.3,7.1,14.4,7.1,14.6,7.1z M6,9.6c0.2-1.5,1.5-2.6,3-2.6c0.1,0,0.2,0,0.3,0V9.6H6z M17.8,18.4H4.7c-1.9,0-3.5-1.6-3.5-3.5s1.6-3.5,3.5-3.5h0.3v-0.5c0-2.6,2.1-4.7,4.7-4.7c1.5,0,2.9,0.7,3.8,1.9 c0.9-1.2,2.3-1.9,3.8-1.9c2.6,0,4.7,2.1,4.7,4.7v0.5h0.3c1.9,0,3.5,1.6,3.5,3.5S19.7,18.4,17.8,18.4z" /></svg>
  ),
  Amazon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M15.3,16.4c-0.8-0.3-1.7-0.4-2.6-0.4c-1.9,0-3.7,0.6-5.2,1.7l-1.6-1.1c1.8-1.4,4-2.2,6.5-2.2c1.1,0,2.1,0.2,3,0.5 C15.4,14.9,15.3,16.4,15.3,16.4z M21.4,16.4c-0.3-2-2-3.4-3.9-3.4c-1.9,0-3.5,1.3-3.9,3.1l-0.1,0.2c-0.1,0.5,0.2,1,0.7,1.1 c0.5,0.1,1-0.2,1.1-0.7l0.1-0.2c0.2-1,1.1-1.8,2.1-1.8s1.9,0.7,2.1,1.8l0.1,0.2c0.1,0.5,0.6,0.8,1.1,0.7C21.2,17.4,21.5,16.9,21.4,16.4 z M7,13c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S8.7,13,7,13z M7,18c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S8.1,18,7,18z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S16.4,20,12,20z" /></svg>
  ),
  Netflix: (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M8,3l-2,18h2.5l2-8.3l2.2,8.3H15l-2.1-18H8z M16,3v18h2.5V3H16z"/></svg>
  ),
  Facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="110" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M22,12c0-5.5-4.5-10-10-10S2,6.5,2,12c0,5,3.7,9.1,8.4,9.9v-7H8.2v-2.9h2.2V9.4c0-2.2,1.3-3.4,3.3-3.4 c0.9,0,1.9,0.2,1.9,0.2v2.5h-1.3c-1.1,0-1.4,0.6-1.4,1.4v1.6h2.8l-0.5,2.9h-2.3v7C18.3,21.1,22,17,22,12z" /></svg>
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
                <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-4 text-gray-400">
                    {companies.map((company) => (
                       <div key={company} title={company}>
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
