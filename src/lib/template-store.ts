
import { Template, initialTemplates } from "@/lib/templates";
import { db } from "@/lib/firebase";
import { ref, get, set, remove } from "firebase/database";

let liveTemplates: Template[] | null = null;
let hasSeeded = false;

// Seed the database with initial templates if it's empty or invalid
const seedDatabaseWithInitialTemplates = async () => {
    if (hasSeeded) return;
    const templatesRef = ref(db, 'templates');
    const snapshot = await get(templatesRef);
    
    // Check if the data exists and is a valid, non-empty object
    const data = snapshot.val();
    const isDataInvalid = !snapshot.exists() || typeof data !== 'object' || Object.keys(data).length === 0;

    if (isDataInvalid) {
        console.log("Templates data is invalid or empty, re-seeding with initial data...");
        const updates: { [key: string]: Template } = {};
        initialTemplates.forEach(template => {
            updates[template.id] = template;
        });
        await set(templatesRef, updates);
    }
    hasSeeded = true;
};

// Asynchronously fetches templates and caches them.
export const getTemplates = async (): Promise<Template[]> => {
    // For admin pages, we always want the freshest data.
    // In a real-world high-traffic app, you might use a more sophisticated caching strategy.
    await seedDatabaseWithInitialTemplates();

    const templatesRef = ref(db, 'templates');
    const snapshot = await get(templatesRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        const templates = Object.values(data) as Template[];
        liveTemplates = templates; // Update cache
        return templates;
    }
    
    // Fallback if DB is empty and seeding fails
    return initialTemplates;
};

// This function is for client-side additions for the current session
export const addTemplate = (template: Template): void => {
    if (!liveTemplates) {
        liveTemplates = [...initialTemplates];
    }
    liveTemplates.unshift(template);
};

// Permanently delete a template from the database
export const deleteTemplate = async (templateId: string): Promise<void> => {
    const templateRef = ref(db, `templates/${templateId}`);
    await remove(templateRef);
    // Invalidate cache after deletion
    invalidateTemplateCache();
};

// Invalidate the cache. The next call to getTemplates will re-fetch.
export const invalidateTemplateCache = () => {
  liveTemplates = null;
  hasSeeded = false; // Allow re-checking on next load
};
