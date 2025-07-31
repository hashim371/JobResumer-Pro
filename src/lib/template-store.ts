import { initialTemplates } from "@/lib/templates";

export interface Template {
  id: string;
  name: string;
  category: string;
}

let liveTemplates: Template[] = [...initialTemplates];

export const getTemplates = (): Template[] => {
  return liveTemplates;
};

export const deleteTemplate = (templateId: string): void => {
  liveTemplates = liveTemplates.filter(t => t.id !== templateId);
};

export const updateTemplate = (templateId: string, updatedData: Partial<Omit<Template, 'id'>>): void => {
  liveTemplates = liveTemplates.map(t =>
    t.id === templateId ? { ...t, ...updatedData } : t
  );
};
