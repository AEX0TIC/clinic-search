# Clinic Search

A modern doctor search application built with Vite, React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Vite** - Fast build tool and development server
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Radix UI** - Accessible UI components

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features

- 🔐 **User Authentication** - Secure login system with protected routes
- 👨‍⚕️ **Doctor Search** - Search for doctors by name
- 🔍 **Advanced Filtering** - Filter by consultation type (Video/In-clinic)
- 🏥 **Specialty Filtering** - Filter by medical specialties
- 📊 **Sorting Options** - Sort by fees or experience
- 📱 **Mobile-Responsive** - Optimized for all device sizes
- ⚡ **Real-time Search** - Instant search suggestions
- 🎨 **Modern UI** - Clean, accessible design with Tailwind CSS

## Authentication

The application includes a complete authentication system:

- **Login Page** - Secure login with email and password
- **Protected Routes** - Automatic redirection to login for unauthenticated users
- **Session Management** - Persistent login state using localStorage
- **Logout Functionality** - Secure logout with session cleanup
- **Demo Login** - Quick access for testing purposes

### Demo Login
For testing purposes, you can use:
- **Email:** demo@example.com
- **Password:** demo123

Or click the "Try Demo Login" button on the login page.

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── LoginPage.tsx   # Login page component
│   ├── Header.tsx      # Navigation header with logout
│   ├── ProtectedRoute.tsx # Authentication wrapper
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── services/           # API services
├── utils/              # Utility functions
├── App.tsx             # Main App component with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Learn More

To learn more about the technologies used:

- [Vite Documentation](https://vitejs.dev/) - learn about Vite features
- [React Documentation](https://react.dev/) - learn about React
- [TypeScript Documentation](https://www.typescriptlang.org/) - learn about TypeScript
- [Tailwind CSS Documentation](https://tailwindcss.com/) - learn about Tailwind CSS
