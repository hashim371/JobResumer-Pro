
import { Template, initialTemplates } from "@/lib/templates";
import { db } from "@/lib/firebase";
import { ref, get, set, remove } from "firebase/database";

const seedDatabaseWithInitialTemplates = async () => {
    const templatesRef = ref(db, 'templates');
    const snapshot = await get(templatesRef);
    
    const data = snapshot.val();
    const isDataInvalid = !snapshot.exists() || typeof data !== 'object' || Object.keys(data).length < initialTemplates.length;

    if (isDataInvalid) {
        console.log("Templates data is invalid or missing, re-seeding with initial data...");
        const updates: { [key: string]: Template } = {};
        initialTemplates.forEach(template => {
            updates[template.id] = template;
        });
        await set(templatesRef, updates);
    }
};

export const getTemplates = async (): Promise<Template[]> => {
    await seedDatabaseWithInitialTemplates();

    const templatesRef = ref(db, 'templates');
    const snapshot = await get(templatesRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.values(data) as Template[];
    }
    
    return initialTemplates;
};

export const addTemplate = (template: Template): void => {
    // This is a client-side only operation and will not persist.
    // The main getTemplates function should be the source of truth.
};

export const deleteTemplate = async (templateId: string): Promise<void> => {
    const templateRef = ref(db, `templates/${templateId}`);
    await remove(templateRef);
};

export const invalidateTemplateCache = () => {
  // Cache is no longer managed in this file, so this function does nothing.
  // It's kept for compatibility in case it's called elsewhere.
};
