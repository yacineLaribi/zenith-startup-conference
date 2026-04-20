# Zenith Startup Conference

A modern, responsive website for the Zenith Startup Conference built with Next.js, React, and Tailwind CSS.

## 🚀 Features

- **Modern UI Components**: Comprehensive set of pre-built UI components using Radix UI primitives
- **Dark Mode Support**: Built-in theme switching with next-themes
- **Responsive Design**: Mobile-first responsive layout
- **Interactive Elements**: Custom cursor, magnetic buttons, and smooth animations
- **Contact Form**: Easy-to-use contact form with validation
- **Grain Overlay**: Aesthetic grain effect overlay for visual polish
- **Analytics**: Integrated Vercel Analytics for tracking

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)

## 🛠 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zenith-startup-conf
```

2. Install dependencies:
```bash
pnpm install
```

## 🚦 Getting Started

### Development Server

Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

### Production Build

Build for production:
```bash
pnpm build
```

Start the production server:
```bash
pnpm start
```

### Linting

Run ESLint:
```bash
pnpm lint
```

## 📁 Project Structure

```
.
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── custom-cursor.tsx    # Custom cursor component
│   ├── grain-overlay.tsx    # Grain effect overlay
│   ├── magnetic-button.tsx  # Interactive magnetic button
│   ├── theme-provider.tsx   # Theme provider wrapper
│   ├── sections/            # Page sections
│   │   ├── about-section.tsx
│   │   ├── contact-section.tsx
│   │   ├── services-section.tsx
│   │   └── work-section.tsx
│   └── ui/                  # Reusable UI components
│       └── [various components]
├── hooks/                   # Custom React hooks
│   ├── use-mobile.ts        # Mobile detection hook
│   ├── use-reveal.ts        # Reveal animation hook
│   └── use-toast.ts         # Toast notification hook
├── lib/                     # Utility functions
│   └── utils.ts
├── public/                  # Static assets
│   └── logo.png            # Zenith logo
├── package.json            # Project dependencies
├── next.config.mjs         # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

## 🎨 UI Components

The project includes a comprehensive library of accessible UI components built with Radix UI:

- Accordion, Alert Dialog, Avatar, Badge
- Buttons, Cards, Carousel, Checkbox
- Dialog, Drawer, Dropdown Menu, Form
- Input, Label, Navigation Menu, Popover
- Select, Sidebar, Slider, Tabs, Toast
- And many more...

## 🎯 Key Components

- **Custom Cursor**: Animated custom cursor for enhanced UX
- **Magnetic Button**: Interactive button with magnetic effect
- **Grain Overlay**: Visual grain effect for aesthetic enhancement
- **Theme Provider**: Seamless dark/light mode switching
- **Reveal Animation**: Scroll-triggered reveal animations

## 📦 Dependencies

Key dependencies include:

- **Next.js**: React framework for production
- **React**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible component library
- **next-themes**: Theme management
- **Lucide React**: Icon library
- **Vercel Analytics**: Analytics integration
- **Sonner**: Toast notification system

## 🔧 Configuration

### Tailwind CSS
Configured via `tailwind.config.ts` with custom theme colors and utilities.

### Next.js
- ESLint errors ignored during build (configured in `next.config.mjs`)
- TypeScript errors ignored during build
- Unoptimized images enabled

## 📱 Responsive Design

The site is fully responsive with:
- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Touch-friendly interactions
- Adaptive layouts

## 🌐 Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📝 License

This project was created by Yacine Laribi.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
