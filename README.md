# Wishlist App

A modern web application for creating, sharing, and granting wishes. Users can create wishlists, browse others' wishes, and connect with potential grantors through real-time chat.

## Features

- **Wish Management** - Create, edit, and delete wishes with images and categories
- **Wish Discovery** - Browse wishes from other users with search and category filtering
- **Wish Reservation** - Reserve wishes you want to grant for others
- **Real-time Chat** - Communicate with wish owners/grantors through built-in messaging
- **Delivery Tracking** - Track wish status from pending → delivering → completed
- **Notifications** - Get notified when someone reserves your wish or sends a message
- **User Profiles** - Manage your profile and view your wish history

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router & Turbopack
- **Backend**: [Convex](https://convex.dev/) - Real-time backend with database
- **Authentication**: [Convex Auth](https://docs.convex.dev/auth) with GitHub OAuth
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://radix-ui.com/) primitives
- **Forms**: [TanStack Form](https://tanstack.com/form)
- **Validation**: [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting/Formatting**: [Biome](https://biomejs.dev/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Convex account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/wends05/wishlist-app.git
   cd wishlist-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Convex:
   ```bash
   npx convex dev
   ```

4. Configure environment variables:
   Create a `.env.local` file with your Convex deployment URL and auth credentials.

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run Biome linter |
| `npm run format` | Format code with Biome |

## Project Structure

```
├── convex/           # Convex backend (schema, queries, mutations)
├── public/           # Static assets
├── src/
│   ├── app/          # Next.js App Router pages
│   │   ├── (protected)/  # Authenticated routes
│   │   ├── (root)/       # Public routes
│   │   └── auth/         # Authentication pages
│   ├── components/   # Reusable UI components
│   ├── forms/        # Form components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   ├── providers/    # React context providers
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Helper utilities
```

## License

This project is private and not licensed for public use.
