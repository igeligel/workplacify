---
name: workplacify-free-tools
description: Provides context on Workplacify's free tools — the Hybrid Workplace Policy Generator, Desk Scheduling Efficiency Calculator, Visitor Badge Generator, and Office Rightsizing Calculator. Use when the user asks about these tools, wants to modify them, or needs help understanding how they work.
---

# Free Tools

Workplacify's free tools live under `src/pages/free-tools/`. They are Pages Router pages, publicly accessible (no login required), and share common UI components from `src/components/FreeToolHero`, `src/components/FreeToolHeroHeading`, `src/components/FreeToolHeroText`, `src/components/CtaActionContainer`, and `src/components/Faq`.

All free-tool pages use `getServerSideProps` to load i18n messages via `getMessages(context)`.

Common patterns:
- **Reactive calculation** (no submit button): use derived state from `useState` inputs, results update live
- **2-column grid layout** for form fields: `<Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>`
- **City selector** with rent data: use `Select.Root` + `createListCollection`, cities loaded from CSV in `getServerSideProps`
- **Charts**: use `recharts` (`BarChart`, `CartesianGrid`, etc.) — already a dependency
- **Interactive demo widgets**: placed in `src/components/BlogInteractiveElements/`, follow same pattern as `RoiCalculator` and `BenefitsBreakdown`
- **Shared calculator utils** in `src/utils/calculator.ts`: `formatCurrency`, `handleNumericInput`, `computeRightsizing`
- **Blog article section** below FAQ: use `BlogArticlesMainSection`, `BlogArticlesList`, `BlogArticlesListItem` from `src/chakra-starter/marketing-ui/BlogArticles/`

## Office Rightsizing Calculator

**Route:** `/free-tools/rightsizing-office-calculator`
**File:** `src/pages/free-tools/rightsizing-office-calculator.tsx`
**i18n key prefix:** `OfficeRightsizingCalculator`
**Interactive demo:** `src/components/BlogInteractiveElements/DeskBookingPreview.tsx`

Calculates how much office space and cost a company can save by rightsizing for hybrid work. Uses real city rent data from `src/assets/office-utilization-in-city.csv`.

**Key implementation details:**
- Reactive calculation (no button): results update as user types
- Inputs: employees (default 200), current desks (default 200), city dropdown (default New York, alphabetically sorted), peak utilization (default 75%)
- Formula: `recommendedDesks = ceil(employees * utilization)`, `desksSaved = max(0, currentDesks - recommendedDesks)`, `annualSavings = desksSaved * cityRent * 75`
- City rent data loaded server-side via `getOfficeUtilizationData()` from CSV, passed as prop
- Cities sorted alphabetically in `getServerSideProps`
- Results include metric cards, annual savings, calculation breakdown, and a bar chart (recharts)
- Below results: feature section with `DeskBookingPreview` interactive widget (3×3 desk grid, click to book)
- Below FAQ: latest 3 blog articles via `BlogArticlesMainSection`
- All messages translated in `en.json`, `de.json`, `it.json`

**Shared utilities used:**
- `computeRightsizing` from `src/utils/calculator.ts`
- `formatCurrency` from `src/utils/calculator.ts`

**City data source:** `src/server/csv/getOfficeUtilizationData.ts` reads `src/assets/office-utilization-in-city.csv`

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

Creates professional visitor badges with QR codes, photos, and custom details. Generates PDF/PNG downloads.

- `VisitorBadgeForm` component renders alongside the live badge preview
- Accepts visitor name, company, photo upload; generates a QR code encoded with visitor details
- Badge preview updates in real-time as the user fills out the form
- Uses `api/badge/generate-pdf` for PDF generation (see `src/pages/api/badge/generate-pdf.ts`)
- Uses Chakra UI (Box, Button, Container, Heading, Stack, Text, VStack)

## Common Components

| Component | Path | Purpose |
|-----------|------|---------|
| `FreeToolHero` | `src/components/FreeToolHero.tsx` | Hero section wrapper with centered content |
| `FreeToolHeroHeading` | `src/components/FreeToolHeroHeading.tsx` | Styled h1 heading |
| `FreeToolHeroText` | `src/components/FreeToolHeroText.tsx` | Styled hero description text |
| `CtaActionContainer` | `src/components/CtaActionContainer.tsx` | Call-to-action box with background pattern |
| `Faq` | `src/components/Faq.tsx` | Accordion FAQ section |
| `FeatureSplitted` | `src/components/FeatureSplitted.tsx` | Image + text feature section (avoid — use inline interactive components instead) |
| `DeskBookingPreview` | `src/components/BlogInteractiveElements/DeskBookingPreview.tsx` | Interactive desk booking demo widget |
| `RoiCalculator` | `src/components/BlogInteractiveElements/RoiCalculator.tsx` | ROI calculator (Workplacify pricing vs custom) |
| `BenefitsBreakdown` | `src/components/BlogInteractiveElements/BenefitsBreakdown.tsx` | Expandable benefits explainer |

## Shared Utilities (`src/utils/calculator.ts`)

- `formatCurrency(value: number)` — formats as USD with no decimals, e.g. `$360,000`
- `handleNumericInput(value: string, setter: (v: string) => void)` — safe numeric input handler (only digits, no negative)
- `computeRightsizing(employees, currentDesks, peakUtilization, rentPerSqft, sqftPerDesk)` — returns `{ recommendedDesks, desksSaved, annualSavings }`

## Navbar Registration

Free tools appear in the "Free Tools" dropdown in `src/chakra-starter/marketing-ui/navbar-with-drawer/index.tsx`. Each tool needs:
1. A `label` and `subLabel` translation in the `Menu` key
2. A `href` pointing to the tool route
3. An entry in the `NAV_ITEMS` array under the `freeTools` children
