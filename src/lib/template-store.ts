import { getTemplatesFlow } from "@/ai/flows/generate-template";
import type { Template } from "@/lib/templates";

// This store is now a client-side cache.
// The single source of truth is the database, fetched via getTemplatesFlow.
let liveTemplates: Template[] | null = null;

// Asynchronously fetches templates and caches them.
export const getTemplates = async (): Promise<Template[]> => {
  if (liveTemplates) {
    return liveTemplates;
  }
  
  try {
    const templates = await getTemplatesFlow({});
    liveTemplates = templates;
    return templates;
  } catch (error) {
    console.error("Failed to fetch templates from the source:", error);
    // Fallback or re-throw as per application needs
    return [];
  }
};

// This function is for client-side additions if needed, but the main flow
// should be to re-fetch from the source to get AI-generated templates.
export const addTemplate = (template: Template): void => {
    if (liveTemplates) {
        liveTemplates.unshift(template);
    }
};

// Invalidate the cache. The next call to getTemplates will re-fetch.
export const invalidateTemplateCache = () => {
  liveTemplates = null;
};
