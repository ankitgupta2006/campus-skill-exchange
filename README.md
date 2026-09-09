# Campus Skill Exchange

Campus Skill Exchange is a lightweight, browser-based platform for students to share practical skills, discover learning partners, and connect with peers on campus.

## Live Demo

Visit the deployed project on [GitHub Pages](https://ankitgupta2006.github.io/campus-skill-exchange/).

## Features

- Landing page explaining how the skill exchange works
- Student registration and login forms
- Dedicated student dashboard after login
- Profile summary with editable student information
- Exchange-request notifications on the dashboard
- Accept and decline actions for incoming exchange requests
- Send exchange requests directly from student profiles
- Searchable student profiles by name, skill, course, or college
- Sample profiles for demonstrating the experience
- Responsive pages styled with custom CSS

## Project Structure

```text
Campus-Skill-Exchange/
├── index.html
├── JS/
│   ├── auth.js
│   ├── dashboard.js
│   └── profiles.js
├── css/
│   ├── authentication.css
│   ├── dashboard.css
│   ├── profiles.css
│   └── style.css
└── pages/
    ├── about.html
    ├── dashboard.html
    ├── login.html
    ├── profiles.html
    ├── register.html
    └── skills.html
```

## User Flow

1. Register a student profile with a name, email, college, course, skills, and password.
2. Log in using the registered email and password.
3. Use the student dashboard to review profile information and incoming exchange requests.
4. Visit the profiles section to search for students and send an exchange request.
5. Accept or decline incoming requests from the dashboard notifications section.
6. Edit profile details or log out from the dashboard.

## Getting Started

No build tools or server-side dependencies are required. Clone or download the repository and open `index.html` in a modern web browser.

The project is also available through the [GitHub Pages live demo](https://ankitgupta2006.github.io/campus-skill-exchange/).

## Data and Privacy Note

This demo stores registered profiles, login sessions, and exchange requests in the browser's `localStorage`. The data is local to the browser and is not synchronized between devices. The project is intended for learning and prototyping only and should not be used with real passwords or sensitive personal information without a secure backend, encrypted password handling, and proper authentication.

## License

No license has been specified for this project yet.

## Author

Created as a campus-focused skill-sharing project by [Ankit Gupta](https://github.com/ankitgupta2006).
