
# JobResumer - AI-Powered Resume Builder

<div align="center">
  <img src="https://placehold.co/800x200.png" alt="JobResumer Banner" data-ai-hint="abstract lines">
</div>

<p align="center">
  <strong>The ultimate solution for crafting stunning, professional resumes in minutes.</strong>
  <br />
  <br />
  <a href="#live-demo">View Demo</a>
  ·
  <a href="#key-features">Features</a>
  ·
  <a href="#tech-stack">Tech Stack</a>
  ·
  <a href="#getting-started">Getting Started</a>
</p>

---

## Overview

JobResumer is a modern, full-stack web application designed to help job seekers create, manage, and export professional resumes with ease. It features a sleek, user-friendly interface, a powerful admin dashboard, and leverages Generative AI to create unique resume templates on the fly. This project is built with a production-ready, scalable tech stack, making it a perfect turnkey solution for a business.

## Live Demo

**(Link to your deployed Vercel application will go here)**

---

## Key Features

JobResumer is packed with features for both end-users and administrators, providing a complete business-in-a-box solution.

### User-Facing Features

*   **Effortless Resume Editing**: A clean, intuitive editor allows users to input their personal information, summary, work experience, education, and skills.
*   **Diverse Template Gallery**: Users can choose from a wide variety of professionally designed resume templates, filterable by category.
*   **Real-time Preview**: As users edit their information, a live preview of the resume updates instantly, showing exactly how the final document will look.
*   **Secure Authentication**: Standard email/password authentication system to manage user accounts and protect their data.
*   **Resume Management**: Users have a personal dashboard (`/my-resumes`) to view, edit, and delete all their created resumes.
*   **High-Quality Export**: Download resumes as pixel-perfect PDF or PNG files, ready for job applications.

### AI-Powered Functionality

*   **Generative Template Creation**: The admin panel includes an AI-powered feature to generate brand-new, unique resume templates. Admins simply provide a name and category, and Google's Gemini model generates a complete style guide (layout, font, and color scheme).

### Admin-Only Features

*   **Comprehensive Admin Dashboard**: A secure, role-based admin area provides complete control over the application.
*   **User Management**: Admins can view a list of all registered users, search by name or email, and delete user accounts.
*   **Template Management**: Admins have full CRUD (Create, Read, Update, Delete) capabilities over resume templates. This includes using the AI generator to add new ones.
*   **Resume & Activity Logs**: A centralized view of all resumes created across the platform.
*   **Analytics Dashboard**: Visual charts and stats provide insights into user sign-ups and template popularity over time.

---

## Tech Stack

This project is built using a modern, robust, and scalable technology stack, favored by top development teams.

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/) - Beautiful, accessible components.
*   **Generative AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
*   **Database**: [Firebase Realtime Database](https://firebase.google.com/docs/database) - For user data and resume content.
*   **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
*   **Deployment**: [Vercel](https://vercel.com/)

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn

### Installation

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
    *   Enable **Authentication** (with Email/Password provider).
    *   Enable the **Realtime Database**.
    *   Go to Project Settings > General, and find your web app's Firebase configuration object.
    *   Copy this configuration object into `src/lib/firebase.ts`.

4.  **Set up Google AI (for AI features):**
    *   Go to [Google AI Studio](https://aistudio.google.com/) and create an API key.
    *   Create a `.env` file in the root of your project.
    *   Add your API key to the `.env` file:
        ```
        GEMINI_API_KEY=your_google_ai_api_key_here
        ```

### Running the Application

1.  **Run the development server:**
    ```bash
    npm run dev
    ```

2.  Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

3.  To use AI features locally, you may also need to run the Genkit developer UI in a separate terminal:
    ```bash
    npm run genkit:dev
    ```

---

## Admin Access

To access the admin dashboard, a specific email is hardcoded for security.

*   **Admin Email**: `res97ad7777mn@gmail.com`
*   You can change this value in `src/app/admin/layout.tsx`.
*   Sign up with this email address, and you will be automatically redirected to the `/admin/dashboard` upon login.

