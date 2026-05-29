# Job Board Platform - WeTheMakers LLC Assignment

## Project Overview

This is a simplified **Job Board Platform**. The platform allows two types of users:

- **Admin**: Can manage job postings and review all applications.
- **Job Seeker**: Can register, log in, view jobs, and apply.

For security and realism, user registration is restricted to **job seekers only**. The admin account is pre-created:



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

