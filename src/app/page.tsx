
"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CheckCircle, Briefcase, DraftingCompass, Star, Building } from "lucide-react";

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
                <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-4">
                    {companies.map((company, index) => (
                       <div key={index} className="flex items-center gap-2 text-xl font-semibold text-gray-400">
                           <Building className="h-6 w-6"/>
                           <span>{company}</span>
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
