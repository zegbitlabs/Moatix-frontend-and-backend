# Moatix Check — Public Scam Assessment Platform (ZegBit)

> **Member 1 Deliverable:** Website Shell, Layout, Design System & Home Page.  
> Built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

---

## 1. Project Overview

**Moatix Check** is a public-facing digital scam-assessment website designed to empower citizens in Sri Lanka to examine suspicious links, messages, phone numbers, payment slips, and documents before taking risky actions.

This deliverable fulfills the **Member 1 (Website Foundation, Layout & Design System)** work package defined in the *Moatix Comprehensive Frontend & Backend Development Handbook (V2.0)*.

### Key Highlights
- **Human-Designed Cybersecurity UI:** Crafted with crisp SVG schematics, clean typographic hierarchy, and zero stock or AI-generated graphics.
- **Mandatory Demo Mode Notice:** Displays the exact required banner:  
  *&ldquo;Demo mode: the system is not currently assessing the safety of the submitted item.&rdquo;*
- **Five Dedicated Verification Methods:** URL/link checking, SMS/WhatsApp messages, phone number evaluation (Sri Lanka +94 mobile 07X and landlines), screenshot/slip inspection, and untrusted document checks.
- **Sri Lanka Local Threat Context:** Focuses on real-world scams currently targeting Sri Lankan citizens (Sri Lanka Post parcel delivery phishing, bank OTP fraud, CEB electricity disconnection threats, WhatsApp task scams).
- **Accessibility & Mobile-First:** Responsive across all devices (375px to 1920px), keyboard navigable with visible focus states, WCAG 2.1 AA contrast compliance, and `prefers-reduced-motion` support.
- **Ready for Members 2 & 3 Integration:** Complete reusable component library (`Button`, `Card`, `Badge`, `Alert`, `Accordion`, `Icons`) documented in [`docs/COMPONENT_GUIDE.md`](./docs/COMPONENT_GUIDE.md).

---

## 2. Quick Start

### Prerequisites
- Node.js (v18 or higher recommended; v20/v26 tested)
- npm (v10 or higher)

### Installation
Dependencies are already installed. If needed:
```bash
npm install
# or inside the frontend directory:
npm --prefix frontend install
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
```

### Running Code Quality Checks
```bash
# TypeScript typechecking
npm run typecheck

# ESLint verification (0 errors, 0 warnings)
npm run lint
```

---

## 3. Directory Map

```text
zegbit-frontend/
├── docs/
│   ├── COMPONENT_GUIDE.md     # Full guide for Members 2 & 3
│   └── DECISIONS.md           # Architecture decisions & open questions
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css    # Palette tokens, typography, accessible rings
│   │   │   ├── layout.tsx     # Root layout with DemoBanner, Navbar, Footer
│   │   │   └── page.tsx       # Complete Home Page
│   │   └── components/
│   │       ├── home/          # Hero, CheckMethods, HowItWorks, ThreatAwareness, etc.
│   │       ├── layout/        # Navbar, Footer, DemoBanner
│   │       └── ui/            # Reusable Button, Card, Badge, Alert, Accordion, Icons
│   ├── package.json
│   └── tsconfig.json
├── package.json               # Root delegation scripts
└── README.md
```

---

## 4. Handover to Members 2 & 3

- **Member 2 (Detection Inputs):** Import `<Button>`, `<Card>`, `<Badge>`, `<Alert>` from `@/components/ui/` to build `UrlCheckForm`, `MessageCheckForm`, `PhoneCheckForm`, `ImageUploadForm`, and `FileUploadForm`.
- **Member 3 (Results & Feedback):** Embed result state cards into the shared layout using semantic status tokens (`info`, `caution`, `error`, `neutral`, `teal`).
- See [`docs/COMPONENT_GUIDE.md`](./docs/COMPONENT_GUIDE.md) for full prop tables and examples.
