# Athlos Frontend

React + Vite application for the Athlos platform frontend interface.

## 📋 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Git Workflow](#git-workflow)
  - [Branch Strategy](#branch-strategy)
  - [Branch Naming Conventions](#branch-naming-conventions)
  - [Contributing Process](#contributing-process)
- [Environment Variables](#environment-variables)
- [Code Quality](#code-quality)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

## 🚀 About

This is the frontend application for Athlos, built with React and Vite. It provides a modern, fast, and responsive user interface for the Athlos platform.

## 🛠 Tech Stack

- **React** (v19.1.1) - UI library
- **Vite** (v7.1.7) - Build tool and development server
- **Tailwind CSS** (v4.1.16) - Utility-first CSS framework
- **PostCSS** - CSS processing
- **ESLint** - Code linting and quality

## 🏁 Getting Started

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**
- Basic knowledge of React and modern JavaScript

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

### Running the Development Server

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will start on **port 5173** by default. Access it at `http://localhost:5173`

The development server features:
- ⚡️ Lightning-fast Hot Module Replacement (HMR)
- 🔄 Automatic page reload on file changes
- 📦 Optimized dependency pre-bundling

### Building for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment.

#### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

This serves the production build at `http://localhost:4173`

## 📁 Project Structure

```
frontend/
├── public/                    # Static assets (served as-is)
├── src/
│   ├── assets/               # Images, fonts, and other assets
│   ├── App.jsx               # Main App component
│   ├── App.css               # App-specific styles
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles and Tailwind imports
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

### Key Files

- **`src/main.jsx`** - Entry point that renders the React app
- **`src/App.jsx`** - Root component of the application
- **`index.html`** - HTML template with root div
- **`vite.config.js`** - Vite build and dev server configuration
- **`tailwind.config.js`** - Tailwind CSS customization

### Recommended Folder Structure (as project grows)

```
src/
├── components/               # Reusable UI components
│   ├── common/              # Shared components (Button, Input, etc.)
│   └── layout/              # Layout components (Header, Footer, etc.)
├── pages/                   # Page components
├── hooks/                   # Custom React hooks
├── utils/                   # Utility functions
├── services/                # API calls and external services
├── context/                 # React Context providers
├── constants/               # Constants and configuration
└── styles/                  # Global styles and theme
```

## 🌿 Git Workflow

### Branch Strategy

We use a two-branch strategy:

- **`production`** - Stable, production-ready code
- **`development`** - Integration branch for features and fixes

### Branch Naming Conventions

When creating a new branch, always branch out from `development` and follow these naming conventions:

| Type | Prefix | Example |
|------|--------|---------|
| New feature | `feature/` | `feature/user-dashboard` |
| Bug fix | `fix/` | `fix/button-alignment` |
| Task/Chore | `task/` | `task/update-dependencies` |
| Hotfix | `hotfix/` | `hotfix/critical-ui-bug` |
| Refactor | `refactor/` | `refactor/component-structure` |
| Style | `style/` | `style/responsive-layout` |

### Contributing Process

**⚠️ IMPORTANT: All pull requests must be submitted for review before merging.**

1. **Create a new branch from `development`:**
   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit regularly:**
   ```bash
   git add .
   git commit -m "Add: descriptive commit message"
   ```

3. **Keep your branch updated with `development`:**
   ```bash
   git fetch origin
   git merge origin/development
   ```

4. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request:**
   - **Target branch:** `development`
   - Add a clear, detailed description of your changes
   - Include screenshots for UI changes
   - Reference any related issues
   - **Request review from the project maintainer**
   - ⚠️ **DO NOT merge your own PR** - wait for approval

6. **After approval and merge:**
   - Delete your feature branch (both locally and remotely)
   - Pull the latest `development` changes
   ```bash
   git checkout development
   git pull origin development
   git branch -d feature/your-feature-name
   ```

7. **Releases:**
   - Periodically, `development` is merged into `production` for releases
   - Only the maintainer handles production merges

## 🔐 Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```env
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000

# Feature Flags
VITE_ENABLE_ANALYTICS=false

# Other configurations
VITE_APP_NAME=Athlos
```

**Note:** Environment variables in Vite must be prefixed with `VITE_` to be exposed to the client-side code.

Access them in your code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🎨 Code Quality

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Code Style Guidelines

- Use functional components with hooks
- Follow React best practices and naming conventions
- Use Tailwind CSS utility classes for styling
- Keep components small and focused (Single Responsibility)
- Write descriptive variable and function names
- Add comments for complex logic
- Ensure responsive design for all screen sizes

### Component Best Practices

- **Props validation** - Consider using PropTypes or TypeScript
- **Naming** - PascalCase for components, camelCase for functions
- **File structure** - One component per file
- **Destructuring** - Destructure props for cleaner code
- **Conditional rendering** - Use ternary or && operators
- **Event handlers** - Prefix with `handle` (e.g., `handleClick`)

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🤝 Contributing

### Before You Start

1. Ensure you have the latest code from `development`
2. Create a new branch following naming conventions
3. Run `npm run lint` before committing
4. Test your changes thoroughly in the browser

### Pull Request Guidelines

- **Title:** Clear and descriptive (e.g., "Add user authentication flow")
- **Description:** 
  - What changes were made
  - Why these changes were necessary
  - Any breaking changes or migrations needed
  - Screenshots (for UI changes)
- **Review:** Wait for approval before merging
- **Testing:** Ensure the build works (`npm run build`)

### Commit Message Guidelines

Use clear, descriptive commit messages with prefixes:

- `Add: [description]` - New feature or component
- `Fix: [description]` - Bug fix
- `Update: [description]` - Update existing feature
- `Remove: [description]` - Remove code/files
- `Refactor: [description]` - Code refactoring
- `Style: [description]` - UI/styling changes
- `Docs: [description]` - Documentation updates

**Examples:**
```
Add: user profile component with avatar upload
Fix: button alignment on mobile devices
Update: API endpoint for user data
Style: improve responsive layout for dashboard
```

## 🔧 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill the process using port 5173
# Or Vite will automatically use the next available port
```

**Dependencies not installing:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Clean install
npm ci
npm run build
```

## 📝 Notes

- Always pull the latest changes from `development` before creating a new branch
- Keep your branches up to date to avoid merge conflicts
- Run linting before pushing to catch potential issues early
- Test responsiveness on multiple screen sizes
- **Never commit `node_modules/` or `.env` files**
- Delete branches after they're merged to keep the repository clean
- **All PRs require approval** - be patient and responsive to feedback

## 🚀 Deployment

*(Add deployment instructions here when ready)*

- Build the project: `npm run build`
- Deploy the `dist/` folder to your hosting service
- Ensure environment variables are set correctly in production

## 📧 Contact

For questions, issues, or PR reviews, contact the Athlos development team.

---

**Happy Coding! 🚀**