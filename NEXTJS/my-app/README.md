# Blogger

> **Where ideas find their voice**

A modern, full-stack blogging platform that empowers users to create, share, and discover compelling stories. Built with cutting-edge web technologies for a seamless, real-time writing and reading experience.

---

## ✨ Features

- **Effortless Creation**: A distraction-free writing environment optimized for creativity
- **Global Sharing**: Publish your blogs and share your ideas with readers worldwide
- **Real-Time Experience**: Lightning-fast performance powered by modern cloud infrastructure
- **User Authentication**: Secure login and signup with session management
- **Responsive Design**: Beautiful, accessible interface that works on all devices
- **Dark Mode Support**: Toggle between light and dark themes for comfortable reading
- **Form Validation**: Robust validation for seamless user experience

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16.1.6](https://nextjs.org)** - React framework for production
- **[React 19.2.3](https://react.dev)** - Modern React with latest features
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful, accessible component library
- **[Lucide React](https://lucide.dev)** - Crisp, consistent icon set

### State & Forms
- **[React Hook Form](https://react-hook-form.com)** - Performant form management
- **[Zod](https://zod.dev)** - TypeScript-first schema validation
- **[Hook Form Resolvers](https://github.com/react-hook-form/resolvers)** - Schema validation resolver

### Backend & Auth
- **[Convex](https://www.convex.dev)** - Realtime backend platform
- **[Better Auth](https://www.better-auth.com)** - Modern authentication library
- **[Convex Better Auth](https://github.com/ConvexCollective/better-auth)** - Convex integration for auth

### UI & UX
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[Sonner](https://sonner.emilkowal.ski)** - Beautiful toast notifications
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Smart Tailwind class merging
- **[Class Variance Authority](https://cva.style)** - Type-safe CSS variant management
- **[clsx](https://github.com/lukeed/clsx)** - Utility for conditional classNames

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and **pnpm** (or npm/yarn)
- A **Convex** account (free tier available)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Add your Convex and authentication configuration to `.env.local`

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
my-app/
├── app/                      # Next.js app directory
│   ├── (shared-layout)/      # Layout wrapper for authenticated routes
│   │   ├── blog/             # Blog listing and detail pages
│   │   ├── create/           # Blog creation page
│   │   ├── layout.tsx        # Shared layout
│   │   └── page.tsx          # Home page
│   ├── auth/                 # Authentication pages
│   ├── api/                  # API routes
│   ├── actions.ts            # Server actions
│   ├── schemas/              # Zod validation schemas
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # shadcn/ui components
│   └── web/                  # Custom web components
├── lib/                      # Utility functions
├── convex/                   # Convex backend definitions
├── public/                   # Static assets
└── sampleData.jsonl          # Sample blog data

```

---

## 🔐 Authentication

This project uses **Better Auth** with **Convex** for secure, modern authentication:

- Login and Signup pages at `/auth/login` and `/auth/signup`
- Session-based authentication
- Protected routes using middleware
- Secure password handling

---

## 💾 Database

[Convex](https://www.convex.dev) handles all backend operations:

- Real-time database updates
- Instant API generation
- File uploads
- Scheduled functions
- Authentication integration

---

## 🎨 Styling

- **Tailwind CSS 4** for utility-first styling
- **shadcn/ui** components for consistent design
- **Dark mode** support via `next-themes`
- Fully responsive design

---

## 📦 Scripts

```bash
# Development
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

---

## 🔄 Form Handling & Validation

- **React Hook Form** for performance
- **Zod** schemas for type-safe validation
- Server-side validation with actions
- Real-time error feedback

---

## 🎯 Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Home/Landing page |
| `/blog` | Browse all blogs |
| `/blog/[blogId]` | View individual blog |
| `/create` | Create new blog (authenticated) |
| `/auth/login` | User login |
| `/auth/signup` | User registration |

---

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Environment variables are automatically configured
4. Deploy with one click

[Vercel Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)

### Deploy Backend (Convex)

1. Sign up at [Convex](https://www.convex.dev)
2. Deploy your Convex project via CLI
3. Update environment variables

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open-source and available under the MIT License.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the excellent framework
- [Convex](https://www.convex.dev) for the real-time backend
- [shadcn](https://twitter.com/shadcn) for beautiful UI components
- All open-source maintainers and contributors

---

## 📞 Support

For questions, issues, or suggestions:
- Open an [GitHub Issue](https://github.com/yourusername/blogger)
- Check existing documentation
- Join our community

**Happy blogging! 📝✨**
