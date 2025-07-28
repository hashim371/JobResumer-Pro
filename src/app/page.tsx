
"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CheckCircle, DraftingCompass, Star, FileText } from "lucide-react";

const companyLogos: { [key: string]: React.ReactNode } = {
    Google: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100px" height="34px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.021,35.591,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
    ),
    Microsoft: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" width="90px" height="34px"><path fill="#f25022" d="M1 1h9v9H1z"/><path fill="#00a4ef" d="M1 11h9v9H1z"/><path fill="#7fba00" d="M11 1h9v9h-9z"/><path fill="#ffb900" d="M11 11h9v9h-9z"/></svg>
    ),
    Facebook: (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="110" height="34" viewBox="0 0 48 48"><linearGradient id="Ld6sqrtcxMyckEl6oeadsa_uLSVCDQ_1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2aa4f4"></stop><stop offset="1" stopColor="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6oeadsa_uLSVCDQ_1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.559h-5.989v-3.662c0-1.719,0.984-3.223,3.223-3.223h3.194V12.46c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.919h-4.187v5.559h4.187v12.16h5.484V29.301z"></path></svg>
    ),
    Apple: (
      <svg xmlns="http://www.w3.org/2000/svg" width="90px" height="34px" viewBox="0 0 24 24" fill="none"><path d="M17.3195 13.4943C17.423 11.8593 18.7297 10.383 18.8953 10.339C18.8927 10.3355 20.3523 9.60593 20.3523 7.63353C20.3523 5.56546 19.0305 4.34113 17.8188 4.34113C16.0352 4.32626 14.8027 5.37893 14.1562 5.37893C13.5097 5.37893 12.4765 4.34113 11.0117 4.36893C9.28477 4.38283 7.82227 5.59743 7.82227 7.78523C7.82227 10.2248 9.53906 11.2335 10.3477 11.2335C11.1562 11.2335 12.0117 10.5188 12.9531 10.5188C13.8945 10.5188 14.8828 11.2688 15.6562 11.2688C16.4322 11.2688 17.1539 10.2548 17.1859 10.2188C17.1859 10.2188 16.3383 9.77883 16.3383 8.79173C16.3383 7.85906 17.0723 7.22826 17.2523 7.11176C17.2559 7.11326 16.1484 6.45866 16.1484 7.91546C16.1484 8.82566 16.682 9.25646 16.7324 9.29426C16.7324 9.29426 15.7523 10.0163 15.7523 11.3963C15.7523 12.6374 16.5414 13.208 16.5813 13.2359C16.5813 13.2359 15.6664 13.8042 15.6664 15.0132C15.6664 16.1873 16.3918 16.8113 16.4816 16.8812C16.4816 16.8812 15.8238 17.5799 15.8238 18.5282C15.8238 19.5896 16.7465 20.0002 16.8793 20.0002C17.0121 20.0002 18.1066 19.5296 18.1066 18.2576C18.1066 16.9856 17.3195 16.5332 17.3195 16.5332C17.3195 16.5332 18.1395 16.1114 18.1395 14.9312C18.1395 13.8053 17.3195 13.4943 17.3195 13.4943ZM13.3766 3.4947C13.8074 2.6501 13.5684 1.5056 12.825 0.9635C12.2859 0.5759 11.4559 0.5402 10.8258 0.9995C10.2012 1.4588 9.99258 2.5025 10.7441 3.1256C11.2332 3.5564 12.9461 3.9107 13.3766 3.4947Z" fill="#757575"></path></svg>
    ),
    Amazon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="90px" height="34px" viewBox="0 0 100 30"><path d="M25.82 21.34h-4.24l-6.2-9.3v9.3H11.3V8.82h4.16l6.17 9.24V8.82h4.1v12.52zm16.5-1.92c-3.64 0-5.8-2.3-5.8-5.32 0-3.04 2.16-5.33 5.8-5.33 2.05 0 3.86.73 5.03 2.13l-2.88 2.2c-.6-.72-1.32-1.1-2.2-1.1-.9 0-1.6.4-1.6 1.22 0 .66.45 1.05 1.83 1.05h1.23v3.4c0 1.3-.7 1.76-2.02 1.76-.94 0-1.7-.4-2.28-1.2l-3.23 2.1c1.3 2 3.4 3.1 6.1 3.1 3.92 0 6.27-2.14 6.27-5.42v-5.6h-4.04v.74c-1.2-1.4-2.8-2.23-4.9-2.23zm15.17-10.6h4.16v11.83l6.5-11.83h4.6L66.7 19.4v.08l6.33 8.36h-4.6l-4.2-6.1-2.17 2.04v4.06h-4.16V8.82zm23.95 1.33c-2.3 0-3.9 1.55-3.9 3.64v7.55h-4.16V8.82h4.16v1.1c.92-1.7 2.6-1.9 3.8-1.1l-1.35 3.9c-.3-.2-.5-.3-.8-.3-.6 0-1.2.4-1.2 1.3v5.6h4.3v-7.3c0-2.5-1.5-3.74-3.84-3.74zM95.3 4.2c2,0 3.1 1.1 3.1 2.6s-1.1 2.6-3.1 2.6-3.1-1.1-3.1-2.6 1.1-2.6 3.1-2.6zM99.5 21.34h-4.16V8.82h4.16v12.52z" fill="#000"></path><path d="M50.13 22.8c-2.8 0-5.07-1.1-6.8-3.2-.8-.9-1.3-2-1.5-3.2-.3-1.4-.2-2.8.2-4.2.7-2.4 2.3-4.4 4.7-5.6 2.5-1.2 5.3-1.4 8-.8 2.9.7 5.3 2.5 6.8 5 .8 1.4 1.3 2.9 1.4 4.5.2 1.6-.1 3.3-.8 4.8-1.2 2.4-3.2 4.2-5.7 5.1-1.2.5-2.5.7-3.8.7-1.2 0-2.3-.2-3.4-.6zM50.23 21c3.2 0 5.7-2.5 5.7-5.7s-2.5-5.7-5.7-5.7-5.7 2.5-5.7 5.7c.1 3.1 2.6 5.7 5.7 5.7z" fill="#FF9900"></path></svg>
    ),
    Netflix: (
        <svg xmlns="http://www.w3.org/2000/svg" width="90px" height="34px" viewBox="0 0 24 24"><path d="M13.436 2.842h-3.03v12.35l-4.632-9.61H2.128L8.14 16.29V22.5h3.112V16.2L17.512 2.84H13.435z" fill="#e50914"></path></svg>
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

  const companies = ["Google", "Microsoft", "Apple", "Amazon", "Netflix", "Facebook"];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8 md:py-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-900/[0.04] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)] dark:bg-grid-slate-400/[0.05]"></div>
            <div className="text-center animate-fadeIn py-16 relative z-10">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary via-accent to-primary">
                Craft Your Future, One Resume at a Time
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                Create a stunning, professional resume in minutes. Our templates are designed to impress and help you land your dream job.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out">
                  <Link href="/templates">
                    Choose a Template
                  </Link>
                </Button>
              </div>
               <div className="mt-20 px-8">
                  <Image src="https://placehold.co/1200x600.png" data-ai-hint="resume app screenshot" alt="Person reviewing a resume document at a desk" width={1200} height={600} className="rounded-xl shadow-2xl mx-auto ring-1 ring-black/10" />
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
                <Card key={index} className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
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
                      <Card className="flex flex-col justify-between h-full p-6 shadow-md bg-card/80 backdrop-blur-sm">
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
