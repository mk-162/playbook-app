# 162 Playbook Dashboard

A dark-themed Next.js dashboard for managing AI-powered business operations. Built for consultants and agencies who run on playbooks.

## Features

- **Issue Tracking** — View and manage GitHub issues from your playbook repo
- **Chat Panel** — Collapsible right sidebar with G-Bot assistant (connects to Clawdbot gateway)
- **Playbook Browser** — Browse and view playbook files
- **Task Timeline** — Visual timeline of tasks and progress
- **Dark Theme** — Premium dark design with orange accents

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your GitHub credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```bash
# GitHub OAuth (for authentication)
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here

# Clawdbot Gateway (for chat)
NEXT_PUBLIC_GATEWAY_URL=ws://localhost:19000
```

## Chat Integration

The chat panel connects to a Clawdbot gateway via WebSocket. Make sure the gateway is running:

```bash
clawdbot gateway
```

Then click the chat icon in the header to open the panel.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- NextAuth.js (GitHub OAuth)
- GSAP (animations)
- Lenis (smooth scroll)

## Project Structure

```
src/
├── app/                 # Next.js pages
├── components/
│   ├── chat/           # Chat panel components
│   ├── features/       # Feature components
│   ├── layout/         # Layout components
│   └── providers/      # Context providers
├── hooks/              # Custom React hooks
└── lib/                # Utilities
```

## License

MIT

---

Built by [162](https://162.com) — AI-Powered Business Operations
