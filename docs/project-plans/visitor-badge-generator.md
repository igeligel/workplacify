# Project Plan: Visitor Badge PDF Generator

You can use `/src/pages/free-tools/hybrid-workplace-policy-generator.tsx` as a template for this project to refer to a similar free tool.

Do not change any components under the `src/components` folder. You can add new components though if needed.

---

## Background

This tool will be built using Next.js (React) and Chakra UI v3 for styling and components. It will be deployed on render.com. The goal is to provide organizations with a simple way to generate professional visitor badges (PDF + PNG) directly from the browser.

It will also serve as a lead-generation tool, showcasing Workplacify’s capabilities and linking to signup for more advanced features (bulk generation, customizable templates, integrations).

---

## Objectives

- Allow users to generate a **single visitor badge** instantly as PDF or PNG.
- Support **required fields**: Visitor Name, Company, Date.
- Support **optional fields**: Host Employee, QR Code, Photo Upload (fallback to `boring-avatars`).
- Provide a **clean, professional design** with one static template.
- Add CTAs to encourage users to sign up for advanced customization (color themes, multiple templates, bulk generation).
- Optimize the tool for SEO to rank for keywords like _“free visitor badge generator”_ and _“PDF visitor badge template”_.

---

## Features

1. **Input Form**

   - Name (required)
   - Company (required)
   - Date (required, default = today’s date)
   - Host Employee (optional)
   - Photo Upload (optional, fallback: `boring-avatars`)
   - QR Code checkbox (optional; generates QR with visitor details or a placeholder link).

2. **Badge Preview**

   - Live preview of the badge as the user fills the form.
   - Use a single static template (logo, layout, and colors fixed).

3. **Export Options**

   - Download as **PDF** (using `@react-pdf/renderer`, similar to `PolicyPreview.tsx`).
   - Download as **PNG** (optional, using `html2canvas` for rendering canvas snapshot).

4. **Call-to-Action (CTA)**
   - Below the download options, encourage users to sign up with text like:
     _“Want customizable templates and bulk badge generation? Manage all your visitors with Workplacify.”_
   - CTA button links to `/signup`.

---

## User Flow

1. User lands on the badge generator landing page.
2. User fills in visitor details.
3. Live preview updates in real-time.
4. User clicks _“Generate Badge”_.
5. Badge can be downloaded as **PDF** (and optionally as PNG).
6. Below the download options, a **CTA section** promotes Workplacify sign-up.

---

## Badge Layout (Static Template)

- **Top**: Workplacify logo (or “Visitor Badge” text).
- **Center**: Visitor name (large, bold), company, host employee (if provided).
- **Bottom left**: Date.
- **Bottom right**: QR code (if enabled).
- **Photo/avatar**: On the left side, circular format.

---

## Design and UI

- Use Chakra UI for form fields, preview card, and buttons.
- Badge preview displayed as a card with fixed dimensions (e.g., A6 size).
- Professional look: clean white background, dark text, minimal borders.
- Avatar/photo circular with placeholder (`boring-avatars`) when missing.
- Responsive design so users can generate badges from desktop or mobile.

---

## Development Steps

1. **Form Components**

   - Create input fields (name, company, date, host, photo upload, QR checkbox).
   - Use React state to store form inputs.

2. **Badge Preview Component**

   - Build a static template layout.
   - Render avatar/photo, text fields, date, and QR code dynamically.

3. **PDF Generation**

   - Use `@react-pdf/renderer` (reference `src/components/PolicyGenerator/PolicyPreview.tsx`).
   - Provide button to _Download PDF_.

4. **PNG Generation (optional)**

   - Use `html2canvas` to capture the preview and allow _Download PNG_.

5. **CTA Section**

   - Add sign-up promotion below the results.

6. **SEO Optimization**
   - Meta tags: Title, description with keywords _visitor badge generator_, _PDF visitor badge_.
   - Structured data: FAQ schema about visitor badges.
   - Alt text for preview images.

---

## Optional Future Features

- Bulk upload (CSV import → generate multiple badges).
- Multiple templates with color themes.
- Advanced integrations (Slack check-ins, calendar sync).
- Self-hosting features for enterprises.

---

## Suggested File Path

- /src/pages/free-tools/visitor-badge-generator.tsx

## Dependencies

- `@react-pdf/renderer` → PDF generation
- `boring-avatars` → fallback avatar generation
- `react-qr-code` → QR code generation
- `html-to-image` (optional) → PNG export

---

## Menu

Include the new page under `src/chakra-starter/marketing-ui/navbar-with-drawer/index.tsx`.

## Translations

Make sure the pages are translated.

- src/messages/en.json
- src/messages/de.json

Translations can be used via a hook `const t = useTranslations("AppMenu");`.

## Linting and fixing errors

Make sure to use Chakra V3. The component API might be a bit different. You can check in the code base for errors.

You can run the following commands to check for errors:

```sh
npm run lint
```

```sh
npm run tsc
```
