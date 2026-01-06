# UpSkill - Online Learning Platform

A modern, feature-rich online learning platform built with React 19, TypeScript, and Three.js for immersive 3D experiences.

## Features

- Modern UI with dark theme and gradient accents
- Interactive 3D elements powered by Three.js
- Responsive design for all devices
- Course catalog with filtering and search
- User authentication (Sign In / Sign Up)
- Newsletter subscription
- Contact form with FAQ section
- Resources library with external learning links
- Video tutorials integration

## Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js with @react-three/fiber and @react-three/drei
- **Routing:** React Router DOM 7
- **Icons:** Lucide React

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download Git](https://git-scm.com/)

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/upskill-frontend.git
cd upskill-frontend
```

Or if you have the project folder:

```bash
cd front-end-upskill
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### Step 3: Run the Development Server

```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application will start and be available at `http://localhost:5173`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
front-end-upskill/
├── components/          # Reusable UI components
│   ├── Navbar.tsx       # Navigation bar
│   ├── Footer.tsx       # Footer component
│   ├── AuthModal.tsx    # Authentication modal
│   ├── Logo.tsx         # Logo variants
│   ├── VideoPlayer.tsx  # Video player component
│   └── *3DScene.tsx     # 3D scene components
├── pages/               # Page components
│   ├── Home.tsx         # Home page
│   ├── About.tsx        # About page
│   ├── Services.tsx     # Services page
│   ├── Skills.tsx       # Courses catalog
│   ├── Resources.tsx    # Learning resources
│   └── Contact.tsx      # Contact page
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── services/            # API services
├── utils/               # Utility functions
├── types.ts             # TypeScript type definitions
├── constants.ts         # App constants and data
├── App.tsx              # Main app component
├── index.tsx            # Entry point
└── index.html           # HTML template
```

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` folder. You can deploy this to any static hosting service.

To preview the production build locally:

```bash
npm run preview
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect the Vite configuration
5. Click Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click Deploy

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. Run:
   ```bash
   npm run deploy
   ```

## Configuration

### Vite Configuration

The project uses Vite as the build tool. Configuration can be found in `vite.config.ts`.

### TypeScript Configuration

TypeScript settings are in `tsconfig.json`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill the process using port 5173
npx kill-port 5173
# Then run again
npm run dev
```

**Node modules issues:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

**TypeScript errors:**
```bash
# Check for type errors
npx tsc --noEmit
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

**Vikas Singh**

## License

This project is licensed under the MIT License.

---

Made with love by Vikas Singh
