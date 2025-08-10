# JobResumer - AI-Powered Resume Builder & Full-Stack SaaS Platform

<div align="center">
  <img src="https://placehold.co/800x200.png" alt="JobResumer Banner" data-ai-hint="abstract lines">
</div>

<p align="center">
  <strong>A complete, production-ready SaaS application for creating professional resumes, featuring a powerful admin dashboard and unique AI-driven template generation. This is a turnkey solution ready for monetization.</strong>
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"></a>
  <a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
    <a href="https://firebase.google.com/docs/genkit"><img src="https://img.shields.io/badge/Google_AI_&_Genkit-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google AI"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
</p>

---

## Overview

JobResumer is a modern, full-stack web application designed to help job seekers create, manage, and export professional resumes with ease. More than just a tool for users, it's a complete **business-in-a-box**, featuring a sleek, user-friendly interface, a powerful admin dashboard for platform management, and cutting-edge Generative AI to create unique resume templates on the fly.

This project is built with a production-ready, scalable tech stack, making it a perfect turnkey solution for an entrepreneur looking to launch a SaaS business in the career services niche.

---

## Key Features

JobResumer is packed with features for both end-users and administrators, providing a complete and marketable product.

### User-Facing Features

*   **Effortless Resume Editing**: A clean, intuitive editor allows users to input their personal information, professional summary, work experience, education, and skills. The interface is designed for speed and ease of use.
*   **Diverse Template Gallery**: Users can choose from a wide variety of professionally designed templates, filterable by category (e.g., Modern, Creative, ATS-Friendly), ensuring there's a style for every industry.
*   **Real-time Preview**: As users edit their information, a live preview of the resume updates instantly, showing exactly how the final document will look in their chosen template.
*   **Secure Authentication**: A standard and secure email/password authentication system to manage user accounts and protect their data.
*   **Personal Resume Dashboard**: Registered users get a personal dashboard (`/my-resumes`) to view, edit, preview, and delete all their created resumes in one place.
*   **High-Quality Export**: Users can download their finished resumes as pixel-perfect PDF or PNG files, ready for digital and print job applications.

### AI-Powered Functionality

*   **Generative Template Creation**: The admin panel includes a unique AI-powered feature to generate brand-new, unique resume templates from scratch. Admins simply provide a template name and category, and Google's Gemini model generates a complete style guide (layout, font, and color scheme). This allows the platform's template library to grow infinitely, offering endless value to users.

### Admin-Only Features

*   **Comprehensive Admin Dashboard**: A secure, role-based admin area (`/admin`) provides complete control over the application. Access is restricted to a designated admin email address.
*   **User Management**: Admins can view a list of all registered users, search by name or email, and delete user accounts and their associated data.
*   **Template Management**: Admins have full CRUD (Create, Read, Update, Delete) capabilities over all resume templates on the platform. This includes using the powerful AI generator to add new ones.
*   **Resume & Activity Logs**: A centralized view of all resumes created across the platform, showing which user created what and when.
*   **Analytics Dashboard**: Visual charts and statistics provide key business insights, including total user sign-ups, total resumes created, template popularity, and user growth over time.

---

## Tech Stack

This project is built using a modern, robust, and scalable technology stack, chosen for performance and developer experience.

*   **Framework**: [Next.js](https://nextjs.org/) (App Router) - For fast, SEO-friendly, and robust web applications.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) - For type safety and improved code quality.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/) - Beautiful, accessible, and composable components.
*   **Generative AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit) - Powers the unique AI template generation feature.
*   **Database**: [Firebase Realtime Database](https://firebase.google.com/docs/database) - For storing user data, resume content, and templates.
*   **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth) - For secure and easy user management.
*   **Deployment**: [Vercel](https://vercel.com/) - Optimized for Next.js, providing seamless and scalable hosting.

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later recommended)
*   An NPM package manager (npm, yarn, or pnpm)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    *   Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    *   In the Firebase console, go to the **Authentication** section and enable the **Email/Password** sign-in provider.
    *   Go to the **Realtime Database** section and create a new database. Start in **test mode** for easy setup (you can change security rules later).
    *   Navigate to your Project Settings (click the gear icon) > General tab.
    *   Under "Your apps", create a new Web App.
    *   Firebase will provide a configuration object. Copy this entire object.
    *   Paste the configuration object into the `src/lib/firebase.ts` file, replacing the existing placeholder.

4.  **Set up Google AI (for local development):**
    *   Go to [Google AI Studio](https://aistudio.google.com/) and create an API key.
    *   Create a file named `.env` in the root of your project.
    *   Add your API key to the `.env` file like this:
        ```
        GEMINI_API_KEY=your_google_ai_api_key_here
        ```

### Running the Application

1.  **Run the development server:**
    ```bash
    npm run dev
    ```

2.  Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

---

## Deployment

This application is optimized for deployment on [Vercel](https://vercel.com/).

### Environment Variables

**This is a critical step for the live application.** The AI features will not work without it.

1.  After deploying your project to Vercel, navigate to your project's dashboard.
2.  Go to the **Settings** tab.
3.  Click on **Environment Variables** in the left sidebar.
4.  Create a new variable:
    *   **Name:** `GEMINI_API_KEY`
    *   **Value:** Paste the Google AI API key you generated earlier.
5.  Ensure the variable is available for all environments (Production, Preview, and Development).
6.  Save the variable. Vercel will automatically redeploy your application with the new environment variable.

---

## Admin Access

To access the admin dashboard, a specific email is hardcoded for simplicity and security.

*   **Admin Email**: `res97ad7777mn@gmail.com`
*   You can change this hardcoded value in the file: `src/app/admin/layout.tsx`.
*   To gain access, simply sign up for a new account using this exact email address. Upon login, you will be automatically redirected to the admin dashboard at `/admin/dashboard`.
```