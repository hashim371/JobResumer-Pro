import { ContactForm } from "./ContactForm";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4 py-16">
        <div>
          <h3 className="text-2xl font-bold font-headline text-primary">Get in Touch</h3>
          <p className="mt-2 text-muted-foreground">Have a question or feedback? Drop us a line!</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
        <div className="flex flex-col items-start pt-4 md:items-end md:pt-0">
          <h4 className="font-semibold text-lg font-headline">JobResumer</h4>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
