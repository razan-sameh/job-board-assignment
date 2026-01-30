# Job Board Platform - WeTheMakers LLC Assignment

## Project Overview

This is a simplified **Job Board Platform** built as part of a technical assignment for **WeTheMakers LLC**. The platform allows two types of users:

- **Admin**: Can manage job postings and review all applications.
- **Job Seeker**: Can register, log in, view jobs, and apply.

For security and realism, user registration is restricted to **job seekers only**. The admin account is pre-created:

Email: razan.dev24@gmail.com
Password: 12345678


---

## Tech Stack

- **Frontend (Web)**: Next.js, Tailwind CSS, React Query
- **Mobile App**: React Native (Expo)
- **Backend**: Supabase (Auth + Database + API)
- **State Management & API Handling**: React Query
- **Authentication**: Supabase Auth (JWT)
- **AI Tools Used**: ChatGPT, Claude (for development guidance)

---

## Features Implemented

### Job Seeker

- Register and log in securely
- Browse available job listings
- Filter and search jobs
- View job details
- Submit job applications (resume text and cover letter)
- Dark Mode toggle implemented for frontend

### Admin

- Log in securely
- View all job postings
- Create, update, and delete jobs
- View submitted applications (read-only, basic info)

> **Note:** For security reasons, new admin accounts cannot be created via signup.

---

## Mobile App (Expo / React Native)

- Covers **job seeker** functionalities
- Login, signup, jobs list, filtering, and search implemented
- Navigation structured using stack and tab navigation
- Basic responsive design for mobile
- Dark Mode toggle implemented for mobile

> **Note:** The mobile app is not fully completed; only the core job seeker functionalities are implemented so far.


---

## Setup Instructions

### Frontend (Next.js)

1. Clone the repository:  
   ```bash
   git clone <repo_url>
   cd job-board-assignment/frontend
2. Install dependencies: npm install
3. Create .env and add your Supabase credentials:
NEXT_PUBLIC_SUPABASE_KEY=sb_publishable_mdMFjfXu8QXyzVKZ4QXv2w_tnf_7mmn
NEXT_PUBLIC_SUPABASE_API=https://wxnradqtzkqzsxtuufbj.supabase.co
4. Run the development server:npm run dev

### Mobile App (Expo)
1. Navigate to the mobile folder: cd job-board-assignment/mobile
2. Install dependencies:npm install
3. Run the app with Expo:npx expo start -c
 **Note:** Make sure to configure Supabase keys in the mobile app .env file.
