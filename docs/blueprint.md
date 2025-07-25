# **App Name**: Realtime Relay

## Core Features:

- Firebase Integration: Establish a Firebase Realtime Database connection using the provided SDK configuration.
- Realtime Dashboard: Implement a dashboard that automatically updates with realtime data using Firebase Realtime Database listeners.
- User Authentication: Implement authentication logic for user sign-in and sign-out, connected to Firebase Auth.
- Toast Notifications: Display success, warning, and error messages using toast notifications for user feedback.
- Contact Form: Store contact form messages in the Firebase Realtime Database under `contacts/{message_id}`.
- Dark/Light Mode Toggle: Allow users to toggle between dark and light modes, persisting the theme.

## Style Guidelines:

- Primary color: Desaturated lavender (#DDD9F9), hinting at purple without being overwhelming; appropriate for a light scheme
- Background color: White (#FFFFFF)
- Accent color: Soft lavender (#B185DB) that provides contrast with the other colors, and relates to Purple 600.
- Font: 'Inter' (sans-serif) for a modern, machined look; suits headlines and body text
- Implement a responsive grid layout, using `grid-cols-1` on mobile and scaling up to `grid-cols-2` or `grid-cols-3` on larger screens.
- Use `transition-all` and `duration-300` Tailwind classes for smooth animations, including hover effects on buttons. Implement fade-in effects for sections.
- Source icons from a public domain source like Google Material icons, and choose icons that are simple and geometric to match the 'Inter' font.