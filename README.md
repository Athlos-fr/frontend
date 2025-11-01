# Frontend - MERN Stack Application

This is the frontend repository for a MERN (MongoDB, Express, React, Node.js) stack application built with React and Vite.

## Features

- ⚡️ [Vite](https://vitejs.dev/) - Lightning fast build tool
- ⚛️ [React 19](https://react.dev/) - Modern React with latest features
- 🎨 CSS with Hot Module Replacement (HMR)
- 📦 ESLint configured for code quality
- 🏗️ Production-ready build setup

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Athlos-fr/frontend.git
cd frontend
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

Create a production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
frontend/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images, fonts, etc.
│   ├── App.jsx      # Main application component
│   ├── App.css      # Application styles
│   ├── main.jsx     # Application entry point
│   └── index.css    # Global styles
├── index.html       # HTML template
├── vite.config.js   # Vite configuration
├── eslint.config.js # ESLint configuration
└── package.json     # Project dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React**: UI library for building user interfaces
- **Vite**: Next-generation frontend build tool
- **ESLint**: Code quality and style checker

## License

This project is part of the Athlos MERN stack application.
