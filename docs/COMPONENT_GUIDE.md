# Moatix Check — Frontend Component Guide (Member 1 Handover)

This guide documents the design system, layout shell, and reusable UI components established by **Member 1 (Website Foundation, Layout & Design System)**. Members 2 and 3 should use these components to build their detection input forms and result displays.

---

## 1. Brand Tokens & Design System

The palette and typography tokens are defined in `frontend/src/app/globals.css` and mapped to Tailwind CSS theme tokens:

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Deep Navy** | `#0B1730` | Dominant brand background, hero dark blocks, footer |
| **Dark Blue** | `#142B4D` | Secondary containers, borders on dark sections |
| **Professional Blue** | `#2563EB` | Primary interactive buttons, links, active rings |
| **Teal** | `#0D9488` | Trust badges, verification indicators, highlights |
| **Light Background** | `#F5F8FC` | Body background, clean contrast for content cards |
| **Neutral Grey** | `#64748B` | Secondary text, subtle borders |
| **White** | `#FFFFFF` | Cards, input fields, header background |

### Semantic Status Tokens
> **Crucial Rule:** Status is **NEVER** conveyed by color alone. Every status element must include an explicit text label, an accompanying icon, and an explanatory sentence.

- **Info**: Blue tint (`#EFF6FF` bg, `#1E40AF` text, `#BFDBFE` border)
- **Caution**: Amber tint (`#FFFBEB` bg, `#B45309` text, `#FDE68A` border)
- **Error / Notice**: Rose tint (`#FEF2F2` bg, `#B91C1C` text, `#FECACA` border)
- **Neutral**: Slate tint (`#F8FAFC` bg, `#334155` text, `#E2E8F0` border)
- **Verified Note**: Teal tint (`#F0FDFA` bg, `#0F766E` text, `#99F6E4` border)

---

## 2. Reusable UI Components (`src/components/ui/`)

### 2.1 `Button`
Standardized button supporting primary, secondary, outline, ghost, and teal variants. Includes accessible touch targets (≥ 44px on `md` and `lg`) and visible focus outlines.

```tsx
import { Button } from "@/components/ui/Button";

// Primary action
<Button variant="primary" size="md">
  Submit Check
</Button>

// Outline / Secondary
<Button variant="outline" size="md">
  Cancel / Reset
</Button>

// Loading State
<Button variant="primary" size="md" isLoading={true}>
  Checking...
</Button>
```

**Props:**
- `variant`: `"primary" | "secondary" | "outline" | "ghost" | "teal"` (default: `"primary"`)
- `size`: `"sm" | "md" | "lg"` (default: `"md"`)
- `isLoading`: `boolean` (displays accessible spinner, disables button)
- All standard `HTMLButtonElement` attributes (`disabled`, `onClick`, `type`, etc.)

---

### 2.2 `Card`
Consistent container card with subtle borders and shadows. Replaces arbitrary `div` styling.

```tsx
import { Card } from "@/components/ui/Card";

<Card variant="default">
  <h3 className="font-bold text-lg">Card Title</h3>
  <p className="text-slate-600">Card content description...</p>
</Card>
```

**Props:**
- `variant`: `"default" | "elevated" | "bordered" | "interactive"` (default: `"default"`)

---

### 2.3 `Badge`
Accessible pill tags for categories, statuses, and tags.

```tsx
import { Badge } from "@/components/ui/Badge";

<Badge variant="info">SMS Analysis</Badge>
<Badge variant="caution">Unverified Sender</Badge>
<Badge variant="teal">Educational Assessment</Badge>
```

**Props:**
- `variant`: `"default" | "info" | "caution" | "error" | "neutral" | "teal"`

---

### 2.4 `Alert`
Accessible status and notification container adhering to WAI-ARIA (`role="alert"` for errors/cautions, `role="status"` for info/notes). Automatically renders appropriate icons and semantic labels.

```tsx
import { Alert } from "@/components/ui/Alert";

<Alert variant="caution" title="Never Upload Sensitive Information">
  Do not submit one-time passwords (OTPs), bank credentials, or private PINs.
</Alert>
```

**Props:**
- `variant`: `"info" | "caution" | "error" | "neutral" | "success"`
- `title`: Optional headline string
- `children`: Alert message content

---

### 2.5 `Accordion`
WAI-ARIA accessible collapsible component for FAQs, evidence details, or multi-step advice. Includes full keyboard support and `aria-expanded` state tracking.

```tsx
import { Accordion } from "@/components/ui/Accordion";

const items = [
  {
    id: "step-1",
    question: "What is an inconclusive result?",
    answer: "An inconclusive result indicates that insufficient public intelligence exists...",
  },
];

<Accordion items={items} defaultOpenId="step-1" />
```

---

### 2.6 `Icons` (`src/components/ui/Icons.tsx`)
Zero-dependency, clean Lucide-compatible SVG icons styled with standard 24x24 viewBoxes.
Includes: `ShieldCheck`, `ShieldAlert`, `AlertTriangle`, `AlertCircle`, `Info`, `CheckCircle2`, `LinkIcon`, `MessageSquare`, `Phone`, `ImageIcon`, `FileText`, `FileCheck`, `Search`, `ArrowRight`, `ChevronDown`, `Lock`, `Menu`, `X`, `HelpCircle`.

```tsx
import { ShieldCheck, ArrowRight } from "@/components/ui/Icons";

<ShieldCheck size={20} className="text-teal-600" />
```

---

## 3. Layout Shell Components (`src/components/layout/`)

### 3.1 `DemoBanner`
Mandatory site-wide announcement required by the Moatix Check policy:
> *"Demo mode: the system is not currently assessing the safety of the submitted item."*

Appears persistently directly above the navigation bar.

### 3.2 `Navbar`
Sticky header featuring:
- Official brand mark: `MoatixCheck by ZegBit`
- Responsive navigation links with skip-to-content accessibility
- Mobile drawer menu with `Escape` key dismissal and touch-friendly navigation
- Call-to-action button leading to verification

### 3.3 `Footer`
Authoritative footer containing:
- ZegBit copyright and educational statement
- Verification method quick links
- Official Sri Lanka Emergency Contacts (Sri Lanka CERT: 101, Police Cyber Crime CID)
- Safety limitations and zero-secrets notice

---

## 4. Integration Guidelines for Members 2 and 3

- **Member 2 (Detection Inputs):** Place form containers inside `<Card>` or within the checker tabs. Use `<Button>` for form submissions and `<Alert variant="caution">` for sensitive data warnings.
- **Member 3 (Results & Feedback):** Render evidence signals using `<Badge>` and `<Alert>`. For uncertainty banners, use the neutral or caution tokens. Never display an unverified result as safe.
