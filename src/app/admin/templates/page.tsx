
"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getTemplates, deleteTemplate, updateTemplate, Template } from '@/lib/template-store';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Loader2 } from 'lucide-react';
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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ResumePreview } from '@/components/ResumePreview';

const templateSchema = z.object({
  name: z.string().min(1, 'Template name is required.'),
  category: z.string().min(1, 'Category is required.'),
});

export default function AdminTemplatesPage() {
  // We need a way to force a re-render when the store changes.
  const [_, setForceRender] = useState(0); 
  const templates = getTemplates();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  
  const { toast } = useToast();

  const form = useForm<z.infer<typeof templateSchema>>({
    resolver: zodResolver(templateSchema),
    defaultValues: { name: '', category: '' },
  });

  const handleDelete = (templateId: string) => {
    deleteTemplate(templateId);
    toast({
        title: 'Template Deleted',
        description: 'The template has been removed.',
    });
    setForceRender(c => c + 1); // Force re-render
  };

  const handleEditClick = (template: Template) => {
    setSelectedTemplate(template);
    form.reset({ name: template.name, category: template.category });
    setIsEditModalOpen(true);
  };
  
  const handleEditSubmit = (values: z.infer<typeof templateSchema>) => {
    if (selectedTemplate) {
      updateTemplate(selectedTemplate.id, { ...selectedTemplate, ...values });
      toast({
        title: 'Template Updated',
        description: 'The template details have been saved.',
      });
      setIsEditModalOpen(false);
      setSelectedTemplate(null);
      setForceRender(c => c + 1); // Force re-render
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Template Management</h1>
        <Button>Add New Template</Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {templates.map(template => (
          <Card key={template.id} className="group flex flex-col overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-0 relative aspect-[8.5/11] w-full bg-background overflow-hidden">
                <ResumePreview templateId={template.id} />
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
                                   This action will remove the template from view for all users for this session. This cannot be undone.
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
              Change the details for the &quot;{selectedTemplate?.name}&quot; template.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                     <Label htmlFor="name">Template Name</Label>
                    <FormControl>
                      <Input id="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                     <Label htmlFor="category">Category</Label>
                    <FormControl>
                      <Input id="category" {...field} />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
               <DialogFooter>
                 <Button type="button" variant="ghost" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

    
