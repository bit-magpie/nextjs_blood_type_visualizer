# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Next.js 15 TypeScript project for a blood type donors and receivers web application with animations. The project includes:

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Purpose**: Blood type compatibility visualization with donors and receivers
- **Deployment**: Vercel platform
- **Features**: Interactive animations showing blood type compatibility

## Key Requirements:
- Use modern React patterns with hooks
- Implement smooth animations for blood type interactions
- Create an intuitive UI for understanding blood donation compatibility
- Follow accessibility best practices
- Optimize for Vercel deployment
- Use TypeScript for type safety
- Implement responsive design with Tailwind CSS

## Blood Type Compatibility Rules to implement:
- O- is universal donor (can donate to all)
- AB+ is universal receiver (can receive from all)
- A can donate to A and AB
- B can donate to B and AB
- AB can donate to AB only
- O can donate to all
- Rh+ can receive from Rh+ and Rh-
- Rh- can only receive from Rh-
