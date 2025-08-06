import { initialTemplates } from "@/lib/templates";
import { v4 as uuidv4 } from 'uuid';

export interface Template {
  id: string;
  name: string;
  category: string;
}

let liveTemplates: Template[] = [...initialTemplates];

export const getTemplates = (): Template[] => {
  return liveTemplates;
};

export const addTemplate = (templateData: Omit<Template, 'id'>): Template => {
    const newId = templateData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newTemplate: Template = {
        id: `${newId}-${uuidv4().slice(0, 4)}`, // Ensure unique ID
        ...templateData,
    };
    liveTemplates.unshift(newTemplate);
    return newTemplate;
};

export const deleteTemplate = (templateId: string): void => {
  liveTemplates = liveTemplates.filter(t => t.id !== templateId);
};

export const updateTemplate = (templateId: string, updatedData: Partial<Omit<Template, 'id'>>): void => {
  liveTemplates = liveTemplates.map(t =>
    t.id === templateId ? { ...t, ...updatedData } : t
  );
