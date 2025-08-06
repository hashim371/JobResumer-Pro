
"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CheckCircle, DraftingCompass, Star } from "lucide-react";
import { getTemplates } from "@/lib/template-store";
import { MicrosoftLogo, GoogleLogo, FacebookLogo } from "@/components/CompanyLogos";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

const ResumePreview = dynamic(() => import('@/components/ResumePreview').then(mod => mod.ResumePreview), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
});

export default function Home() {
  const features = [
    {
      icon: <DraftingCompass className="h-10 w-10 text-accent" />,
      title: "Stunning Templates",
      description: "Choose from a variety of professionally designed templates that are proven to get noticed."
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
      quote: "JobResumer made it incredibly easy to create a professional resume that truly stands out. I landed my dream job in weeks!",
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
      quote: "I hadn't updated my resume in years. JobResumer guided me through the process and the result was polished and professional.",
      stars: 4
    }
  ];

  const companies = [
    { name: "Google", component: <GoogleLogo /> },
    { name: "Microsoft", component: <MicrosoftLogo /> },
    { name: "Facebook", component: <FacebookLogo /> },
  ];
  const allTemplates = getTemplates();
  const featuredTemplateIds = ["dublin", "new-york", "sydney", "paris", "london", "geneva"];
  const featuredTemplates = allTemplates.filter(t => featuredTemplateIds.includes(t.id));

  return (
    <>
      <Header />
      <main className="flex-1 animate-fadeIn">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8 md:py-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-900/[0.04] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)] dark:bg-grid-slate-400/[0.05]"></div>
            <div className="text-center py-16 relative z-10">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary via-accent to-primary">
                Craft Your Future, One Resume at a Time
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                Create a stunning, professional resume in minutes. Our templates are designed to impress and help you land your dream job.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-105">
                  <Link href="/templates">
                    Choose a Template
                  </Link>
                </Button>
              </div>
               <div className="mt-20">
                  <Carousel
                    opts={{ align: "start", loop: true, }}
                    className="w-full max-w-5xl mx-auto"
                  >
                    <CarouselContent className="-ml-2">
                      {featuredTemplates.map((template) => (
                        <CarouselItem key={template.id} className="pl-2 md:basis-1/2 lg:basis-1/3">
                          <div className="p-1">
                            <Link href={`/resume/create?template=${template.id}`} className="block group">
                              <Card className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border-transparent hover:border-primary">
                                <CardContent className="p-0 relative aspect-[8.5/11] w-full bg-background overflow-hidden">
                                  <div className="transform scale-[0.28] origin-top-left">
                                      <ResumePreview templateId={template.id} isClickable={false} />
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden lg:flex" />
                    <CarouselNext className="hidden lg:flex" />
                  </Carousel>
              </div>
            </div>
        </div>
        
        {/* About Section */}
        <section id="about" className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                At JobResumer, our mission is to empower job seekers by providing them with the tools and resources needed to create professional, modern resumes that open doors to new opportunities. We believe that a great resume is a key step towards a successful career, and we're dedicated to making that step as simple and effective as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Features/Benefits Section */}
        <section id="features" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Why Choose Us?</h2>
                <p className="mt-4 text-lg text-muted-foreground">Everything you need to craft the perfect resume.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm transform hover:-translate-y-2">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section id="trusted-by" className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-2xl font-semibold text-muted-foreground mb-8">
                    Trusted by professionals who landed jobs at
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-4 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    {companies.map((company) => (
                       <div key={company.name} title={company.name} className="h-10 flex items-center">
                           {company.component}
                       </div>
                    ))}
                </div>
            </div>
        </section>


        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
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
                      <Card className="flex flex-col justify-between h-full p-6 shadow-md bg-card/80 backdrop-blur-sm transform hover:-translate-y-2 transition-transform duration-300">
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
