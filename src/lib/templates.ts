

export interface Template {
  id: string;
  name: string;
  category: string;
  style?: TemplateStyle; // Style is now an object
}

export interface TemplateStyle {
  layout: 'single-column' | 'two-column-left' | 'two-column-right';
  fontFamily: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    textOnPrimary: string;
  };
}


export const initialTemplates: Template[] = [
  { id: 'dublin', name: 'Dublin', category: 'Simple' },
  { id: 'new-york', name: 'New York', category: 'Simple' },
  { id: 'geneva', name: 'Geneva', category: 'Creative' },
  { id: 'sydney', name: 'Sydney', category: 'ATS' },
  { id: 'paris', name: 'Paris', category: 'Classic' },
  { id: 'london', name: 'London', category: 'Modern' },
  { id: 'madrid', name: 'Madrid', category: 'Creative' },
  { id: 'berlin', name: 'Berlin', category: 'Two-column' },
  { id: 'moscow', name: 'Moscow', category: 'Simple' },
  { id: 'cairo', name: 'Cairo', category: 'ATS' },
  { id: 'seoul', name: 'Seoul', category: 'Creative' },
  { id: 'tokyo', name: 'Tokyo', category: 'Modern' },
  { id: 'rome', name: 'Rome', category: 'Classic' },
  { id: 'vienna', name: 'Vienna', category: 'Classic' },
  { id: 'amsterdam', name: 'Amsterdam', category: 'Two-column' },
  { id: 'stockholm', name: 'Stockholm', category: 'Modern' },
  { id: 'athens', name: 'Athens', category: 'Classic' },
  { id: 'helsinki', name: 'Helsinki', category: 'Modern' },
  { id: 'oslo', name: 'Oslo', category: 'Two-column' },
  { id: 'lisbon', name: 'Lisbon', category: 'Simple' },
  { id: 'copenhagen', name: 'Copenhagen', category: 'Simple' },
  { id: 'prague', name: 'Prague', category: 'Simple' },
  { id: 'warsaw', name: 'Warsaw', category: 'Simple' },
  { id: 'singapore', name: 'Singapore', category: 'Modern' },
  { id: 'kyoto', name: 'Kyoto', category: 'Elegant' },
  { id: 'dubai', name: 'Dubai', category: 'Bold' },
  { id: 'toronto', name: 'Toronto', category: 'Professional' },
  { id: 'mumbai', name: 'Mumbai', category: 'Creative' },
  { id: 'rio', name: 'Rio', category: 'Dynamic' },
  { id: 'zurich', name: 'Zurich', category: 'Minimalist' },
  { id: 'istanbul', name: 'Istanbul', category: 'Classic' },
  { id: 'shanghai', name: 'Shanghai', category: 'Modern' },
  { id: 'mexico-city', name: 'Mexico City', category: 'Artistic' },
  { id: 'lahore', name: 'Lahore', category: 'Professional' },
];

    
