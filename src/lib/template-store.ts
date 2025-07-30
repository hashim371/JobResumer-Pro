
import { templates as initialTemplates, Template } from "@/app/templates/page";

let liveTemplates: Template[] = [...initialTemplates];

export const getTemplates = (): Template[] => {
  return liveTemplates;
};

export const deleteTemplate = (templateId: string): void => {
  liveTemplates = liveTemplates.filter(t => t.id !== templateId);
};

export const updateTemplate = (templateId: string, updatedData: Partial<Template>): void => {
  liveTemplates = liveTemplates.map(t => 
    t.id === templateId ? { ...t, ...updatedData } : t
  );
};
