---
name: workplacify-free-tools
description: Provides context on Workplacify's free tools — the Hybrid Workplace Policy Generator, Desk Scheduling Efficiency Calculator, and Visitor Badge Generator. Use when the user asks about these tools, wants to modify them, or needs help understanding how they work.
---

# Free Tools

Workplacify has three free tools under `src/pages/free-tools/`. They are Pages Router pages, publicly accessible (no login required), and share common UI components from `src/components/FreeToolHero`, `src/components/FreeToolHeroHeading`, `src/components/FreeToolHeroText`, `src/components/FeatureSplitted`, and `src/components/Faq`.

## Hybrid Workplace Policy Generator

**Route:** `/free-tools/hybrid-workplace-policy-generator`
**File:** `src/pages/free-tools/hybrid-workplace-policy-generator.tsx`
**i18n key prefix:** `HybridWorkplacePolicyGenerator`

Collects company details (company name, work hours, remote/office days, communication tools, performance expectations, contact info) via a form and generates a downloadable/printable hybrid work policy document.

- Uses `PolicyPreview` (lazy-loaded, SSR disabled) for the policy document preview
- Form state includes `companyName`, `workHours`, `remoteWorkDays`, `officeWorkDays`, `communicationTools`, `performanceExpectations`, `contactInformation`
- Generates a formatted policy document text

## Desk Scheduling Efficiency Calculator

**Route:** `/free-tools/desk-scheduling-efficiency-calculator`
**File:** `src/pages/free-tools/desk-scheduling-efficiency-calculator.tsx`
**i18n key prefix:** `DeskSchedulingEfficiencyCalculator`

Calculates potential time and cost savings from optimizing desk usage. Collects number of employees, number of desks, desk utilization percentage, average salary, and office space cost.

- Uses `html-to-image` for result screenshot capture
- Form state: `numEmployees`, `numDesks`, `deskUtilization`, `avgSalary`, `officeSpaceCost`
- Outputs `timeSaved` and `costSaved` values
- Requires login (checks `useSession`)

## Visitor Badge Generator

**Route:** `/free-tools/visitor-badge-generator`
**File:** `src/pages/free-tools/visitor-badge-generator.tsx`

Creates professional visitor badges with QR codes, photos, and custom details. Generates PDF/PNG downloads. This is the most mature and polished free tool.

- `VisitorBadgeForm` component renders alongside the live badge preview
- Accepts visitor name, company, photo upload; generates a QR code encoded with visitor details
- Badge preview updates in real-time as the user fills out the form
- Uses `api/badge/generate-pdf` for PDF generation (see `src/pages/api/badge/generate-pdf.ts`)
- Uses Chakra UI (Box, Button, Container, Heading, Stack, Text, VStack)
