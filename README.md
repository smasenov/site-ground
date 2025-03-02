# Product Management App

A React application for managing products with features like creating, reading, updating, and deleting products.

## Features

- 🔒 Permission-based access control
- ✨ Create new products
- 📝 Update existing products
- 🗑️ Delete products with confirmation
- 🎨 Responsive design with SCSS modules
- ✅ Form validation
- 🧪 Comprehensive test coverage

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1. Clone the repository
```bash
git clone <github.com/smasenov/site-ground>
```

2. Install dependencies
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

### Testing

Run tests:
```bash
npm test                 # Run tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

### Building

Build for production:
```bash
npm run build
```

## Tech Stack

- React 18
- TypeScript
- SCSS Modules
- Jest & Testing Library
- Vite

## Project Structure

```
src/
├── components/         # React components
│   ├── common/        # Reusable components
│   ├── Modals/        # Modal components
│   └── ProductTable/  # Product table components
├── services/          # API services
├── styles/           # Global styles
├── types/            # TypeScript types
└── App.tsx          # Root component
```
