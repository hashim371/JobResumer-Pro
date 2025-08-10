
"use client"
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getTemplates, deleteTemplate, invalidateTemplateCache } from '@/lib/template-store';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Loader2, PlusCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { ResumePreview } from '@/components/ResumePreview';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Template, TemplateStyle } from '@/lib/templates';
import { db } from '@/lib/firebase';
import { ref, set } from 'firebase/database';


const templateSchema = z.object({
  name: z.string().min(1, 'Template name is required.'),
  category: z.string().min(1, 'Category is required.'),
});

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      invalidateTemplateCache(); // Ensure we get fresh data
      const allTemplates = await getTemplates();
      setTemplates(allTemplates);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch templates.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);
  
  const allCategories = Array.from(new Set(templates.map(t => t.category)));
  const addTemplateCategories = Array.from(new Set([...allCategories, "Unique", "Elegant", "Bold", "Professional", "Artistic", "Minimalist"]));

  const addForm = useForm<z.infer<typeof templateSchema>>({
    resolver: zodResolver(templateSchema),
    defaultValues: { name: '', category: '' },
  });

  const handleDelete = async (templateId: string) => {
    try {
      await deleteTemplate(templateId);
      toast({ title: 'Template Deleted', description: 'The template has been permanently deleted.' });
      fetchTemplates(); // Re-fetch templates to update the UI
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete template.' });
    }
  };
  
  const handleAddSubmit = async (values: z.infer<typeof templateSchema>) => {
      try {
        const response = await fetch('/api/generate-template', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'The AI failed to generate a new template style.');
        }

        const style: TemplateStyle = await response.json();

        const templateId = values.name.toLowerCase().replace(/\s+/g, '-');
        const newTemplate: Template = {
            id: templateId,
            name: values.name,
            category: values.category,
            style: style,
        };

        const newTemplateRef = ref(db, `templates/${templateId}`);
        await set(newTemplateRef, newTemplate);

        toast({
            title: 'Template Generated!',
            description: `The "${values.name}" template has been successfully created.`,
        });
        fetchTemplates(); // Re-fetch to show the new template

      } catch (e: any) {
         toast({
            variant: 'destructive',
            title: 'Generation Failed',
            description: e.message || 'An unexpected error occurred.',
        });
      } finally {
        addForm.reset();
        setIsAddModalOpen(false);
      }
  };
  
  if (loading) {
    return <div className="flex h-full w-full items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Template Management</h1>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4"/>Add New Template</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New Template</DialogTitle>
              <DialogDescription>
                Use AI to generate a unique, new resume template. Provide a name and a category.
              </DialogDescription>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(handleAddSubmit)} className="space-y-4 py-4">
                <FormField
                  control={addForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                       <Label htmlFor="add-name">Template Name</Label>
                      <FormControl>
                        <Input id="add-name" {...field} placeholder="e.g., 'Vienna', 'Kyoto'" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={addForm.control}
                  name="category"
                  render={({ field }) => (
                     <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {addTemplateCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <DialogFooter>
                   <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={addForm.formState.isSubmitting}>
                    {addForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Generate Template
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {templates.map(template => (
          <Card key={template.id} className="group flex flex-col overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
             <CardContent className="p-0 relative aspect-[8.5/11] w-full bg-background overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="transform scale-[0.28] origin-center">
                  <ResumePreview templateId={template.id} templates={templates} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-card flex flex-col items-start">
                <div className="w-full flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-lg text-card-foreground font-headline">{template.name}</h3>
                        <Badge variant="secondary" className="mt-2">{template.category}</Badge>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => alert("Editing is disabled for this version.")}>
                            <Edit className="h-4 w-4"/>
                            <span className="sr-only">Edit</span>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4"/>
                                 <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                             <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                   This action will permanently delete the "{template.name}" template. This cannot be undone.
                                </AlertDialogDescription>
                             </AlertDialogHeader>
                             <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(template.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                             </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

