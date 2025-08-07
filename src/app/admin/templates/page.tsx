
"use client"
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getTemplates, addTemplate, deleteTemplate, invalidateTemplateCache } from '@/lib/template-store';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Loader2, PlusCircle, Copy } from 'lucide-react';
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
import { generateTemplate } from '@/ai/flows/generate-template';
import type { GenerateTemplateOutput } from '@/ai/flows/generate-template';
import type { Template } from '@/lib/templates';
import { Textarea } from '@/components/ui/textarea';

const templateSchema = z.object({
  name: z.string().min(1, 'Template name is required.'),
  category: z.string().min(1, 'Category is required.'),
});

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isGeneratedModalOpen, setIsGeneratedModalOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<GenerateTemplateOutput | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
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

  const editForm = useForm<z.infer<typeof templateSchema>>({
    resolver: zodResolver(templateSchema),
    defaultValues: { name: '', category: '' },
  });

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

  const handleEditClick = (template: Template) => {
    setSelectedTemplate(template);
    editForm.reset({ name: template.name, category: template.category });
    setIsEditModalOpen(true);
  };
  
  const handleEditSubmit = (values: z.infer<typeof templateSchema>) => {
    if (selectedTemplate) {
       // Note: This only updates the view for the current session.
       // A proper implementation would update the template in the database.
       setTemplates(prev => prev.map(t => t.id === selectedTemplate.id ? { ...t, ...values } : t));
      toast({ title: 'Template Updated', description: 'The template details have been updated for this session.' });
      setIsEditModalOpen(false);
      setSelectedTemplate(null);
    }
  };

  const handleAddSubmit = async (values: z.infer<typeof templateSchema>) => {
      try {
        const result = await generateTemplate(values);
        setGeneratedCode(result);
        setIsGeneratedModalOpen(true);
        addForm.reset();
        setIsAddModalOpen(false);
      } catch (e: any) {
         toast({
            variant: 'destructive',
            title: 'Generation Failed',
            description: e.message || 'The AI failed to generate a new template. Please try again.',
        });
      }
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: `${fieldName} code has been copied to your clipboard.` });
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
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(template)}>
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
                                   This action will permanently delete this template. This cannot be undone.
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

       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>
              Change the details for the &quot;{selectedTemplate?.name}&quot; template. Note: this is a temporary edit.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditSubmit)} className="space-y-4 py-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                     <Label htmlFor="edit-name">Template Name</Label>
                    <FormControl>
                      <Input id="edit-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={editForm.control}
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
                          {allCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                     <FormMessage />
                  </FormItem>
                )}
              />
               <DialogFooter>
                 <Button type="button" variant="ghost" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={editForm.formState.isSubmitting}>
                  {editForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isGeneratedModalOpen} onOpenChange={setIsGeneratedModalOpen}>
        <DialogContent className="max-w-4xl">
           <DialogHeader>
              <DialogTitle>Template Code Generated!</DialogTitle>
              <DialogDescription>
                  The AI has generated the code for your new template. To add it to the app, please copy and paste the following code snippets into their respective files.
              </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-h-[60vh] overflow-y-auto p-1">
              <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="font-semibold">1. Add to `src/lib/templates.ts`</Label>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(generatedCode?.templateListEntry || '', 'Template list entry')}>
                        <Copy className="mr-2 h-3 w-3" /> Copy
                    </Button>
                  </div>
                  <Textarea readOnly value={generatedCode?.templateListEntry || ''} rows={5} className="bg-muted/50 font-mono text-xs"/>
              </div>
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <Label className="font-semibold">2. Add to `src/components/ResumePreview.tsx`</Label>
                     <Button variant="ghost" size="sm" onClick={() => copyToClipboard(generatedCode?.caseStatement || '', 'ResumePreview case')}>
                        <Copy className="mr-2 h-3 w-3" /> Copy
                    </Button>
                  </div>
                   <Textarea readOnly value={generatedCode?.caseStatement || ''} rows={15} className="bg-muted/50 font-mono text-xs"/>
              </div>
          </div>
          <DialogFooter>
              <Button onClick={() => setIsGeneratedModalOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
