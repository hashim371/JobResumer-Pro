
import { getTemplatesFlow } from "@/ai/flows/generate-template";
import { Template, initialTemplates } from "@/lib/templates";

// This store is now a client-side cache.
let liveTemplates: Template[] | null = null;

// Asynchronously fetches templates and caches them.
export const getTemplates = async (): Promise<Template[]> => {
  if (liveTemplates) {
    return liveTemplates;
  }
  
  try {
    // For now, we revert to using initial templates to prevent crashes.
    // The flow can be re-integrated once the rendering issues are resolved.
    // const templates = await getTemplatesFlow({});
    const templates = initialTemplates;
    liveTemplates = templates;
    return templates;
  } catch (error) {
    console.error("Failed to fetch templates, returning initial set:", error);
    // Fallback to initial templates if DB fetch fails
    return initialTemplates;
  }
};

// This function is for client-side additions
export const addTemplate = (template: Template): void => {
    if (!liveTemplates) {
        liveTemplates = [...initialTemplates];
    }
    liveTemplates.unshift(template);
};

// Invalidate the cache. The next call to getTemplates will re-fetch.
export const invalidateTemplateCache = () => {
  liveTemplates = null;
};

    
