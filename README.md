# Campus Skill Exchange

Campus Skill Exchange is a responsive browser-based platform that helps students discover practical skills, share what they know, and connect with peers for learning exchanges. The project uses beginner-friendly HTML, CSS, and JavaScript with browser `localStorage` for its demo data layer.

## Live Demo

Visit the deployed project on [GitHub Pages](https://ankitgupta2006.github.io/campus-skill-exchange/).

## Current Pages

The project includes nine complete page experiences:

| Page | Purpose |
| --- | --- |
| Home | Campus hero banner, hero search, platform benefits, learning process, and calls to action |
| About | Platform purpose, student benefits, and four-step explanation |
| Skills | Searchable and filterable skill cards for technology, academic, creative, and communication skills |
| Profiles | Searchable student profile cards with exchange-request actions |
| Register | Student account and skill registration form |
| Login | Student authentication form |
| Dashboard | Student profile summary, skill list, notifications, requests, editing, and logout |
| Admin Login | Protected administrator login with temporary demo credentials |
| Admin Dashboard | Student directory, profile removal, reports, settings, statistics, and logout |

## Features

### Student Features

- Responsive teal-and-white interface for desktop, tablet, and mobile devices.
- Functional hero search that sends a query to the Profiles page.
- Student registration with name, email, college, course, skills, and password.
- Student login and protected dashboard access.
- Editable student profile information.
- Searchable profiles by name, skill, course, or college.
- Skill search and category filtering.
- Exchange requests with custom messages.
- Accept and decline actions for incoming requests.
- Session logout and browser-based persistence.
- Sample profiles for demonstrating the platform before registration.

### Admin Features

- Separate Admin Login page.
- Protected Admin Dashboard route.
- Dashboard statistics for students, skills, and reported profiles.
- Student directory with remove-profile actions.
- Reported Profiles section.
- Settings section placeholder for future platform configuration.
- Admin logout.

### Temporary Admin Access

The current demo uses the following temporary credentials:

```text
Email: admin@campus.local
Password: admin123
```

These credentials are intended only for local demonstration. They are not suitable for production authentication.

## Design System

The interface uses a consistent visual language across all nine pages:

- **Primary color:** teal and deep teal
- **Surface colors:** white, aqua, light blue, soft cream, and lavender
- **Typography:** Nunito with accessible sizing for navigation and forms
- **Components:** rounded cards, soft borders, readable buttons, responsive layouts, and illustrated banners
- **Responsive behavior:** navigation, cards, forms, tables, banners, and dashboard panels adapt across desktop, tablet, and mobile widths

The illustrations are stored as reusable PNG assets under `assets/illustrations/`. The project no longer depends on screenshot crops or PDF fragments for page artwork.

## Project Structure

```text
Campus-Skill-Exchange/
├── index.html
├── README.md
├── .gitignore
├── assets/
│   ├── logo.svg
│   ├── icons/
│   │   ├── academic.svg
│   │   ├── coding.svg
│   │   ├── communication.svg
│   │   ├── design.svg
│   │   ├── languages.svg
│   │   └── photography.svg
│   └── illustrations/
│       ├── about-banner-art.png
│       ├── admin-dashboard-banner.png
│       ├── admin-login-campus.png
│       ├── home-campus.png
│       ├── login-campus.png
│       ├── profiles-students.png
│       ├── register-campus.png
│       ├── skills-banner-art.png
│       └── student-dashboard-banner.png
├── css/
│   ├── style.css
│   ├── authentication.css
│   ├── dashboard.css
│   ├── profiles.css
│   ├── skills.css
│   └── admin.css
├── JS/
│   ├── navigation.js
│   ├── home.js
│   ├── skills.js
│   ├── profiles.js
│   ├── auth.js
│   ├── dashboard.js
│   └── admin.js
└── pages/
    ├── about.html
    ├── skills.html
    ├── profiles.html
    ├── register.html
    ├── login.html
    ├── dashboard.html
    ├── admin-login.html
    └── admin-dashboard.html
```

## User Flow

1. Open the home page and search for a skill, student, or course, or choose **Register**.
2. Create a student profile with basic information and skills.
3. Sign in using the registered email and password.
4. Review the personal dashboard and edit profile details when needed.
5. Search Skills or Profiles to find a learning partner.
6. Send an exchange request with a message.
7. Accept or decline incoming requests from the dashboard.
8. Log out from the student dashboard when finished.

## Admin Flow

1. Open the Admin Login page from the public navigation or `/pages/admin-login.html`.
2. Use the temporary demo credentials shown above.
3. Manage the sample student directory from the Admin Dashboard.
4. Review the reports and settings sections.
5. Use **Logout** to end the administrator session.

## Getting Started

No build tools or server-side dependencies are required.

### Option 1: Open directly

Open `index.html` in a modern browser. Most demo features work directly from the local file system, although browser storage behavior may vary by browser security settings.

### Option 2: Run a local server

From the project root, run:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

## Data and Privacy

This is a front-end learning and prototyping project. Registered profiles, login sessions, administrator sessions, and exchange requests are stored in the browser's `localStorage`. Data is not synchronized between devices or users.

Do not use real passwords, private student information, or production credentials with this demo. A production release should replace the browser-only storage with a secure backend, hashed passwords, server-side authorization, validation, and protected API routes.

## License

No license has been specified for this project yet.

## Author

Created as a campus-focused skill-sharing project by [Ankit Gupta](https://github.com/ankitgupta2006).
