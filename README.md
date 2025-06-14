# Blood Type Compatibility Visualizer

An interactive web application that helps users understand blood type compatibility between donors and receivers with beautiful animations. Built with Next.js 15, TypeScript, and Framer Motion.

## Features

- **Interactive Blood Type Grid**: Click on any blood type to see compatibility
- **Dual Modes**: Switch between Donor and Recipient modes
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Educational Content**: Learn about universal donors and recipients
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Vercel Ready**: Optimized for deployment on Vercel platform

## Blood Type Compatibility Rules

- **O-** is the universal donor (can donate to all blood types)
- **AB+** is the universal recipient (can receive from all blood types)
- **A** can donate to A and AB blood types
- **B** can donate to B and AB blood types
- **AB** can donate to AB only
- **O** can donate to all blood types
- **Rh+** can receive from both Rh+ and Rh-
- **Rh-** can only receive from Rh-

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The main application is in `src/app/page.tsx` and the blood type visualizer component is in `src/components/BloodTypeVisualizer.tsx`.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lucide React** - Beautiful icons

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

This application is already configured for Vercel deployment with a `vercel.json` file. Simply:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Deploy with one click!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
