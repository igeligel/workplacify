# Project Plan: Desk Scheduling Efficiency Calculator

You can use `/Users/kevinpeters/repositories/workplacify/src/pages/free-tools/hybrid-workplace-policy-generator.tsx` as a template for this project to refer to a similar free tool.

Do not change any components under the `src/components` folder. You can add new components though if needed.

## Background

This tool will be built using Next.js (React) and Chakra UI for styling and components. It will be deployed on render.com. The goal is to create a simple, interactive calculator that demonstrates the value of Workplacify by estimating time and cost savings from optimizing desk usage.

## Objectives

Build a calculator that estimates time and cost savings from optimizing desk usage with Workplacify.

Allow users to input data about their office setup (e.g., number of employees, desks, and current desk utilization).

Provide clear, actionable results that encourage users to try Workplacify.

Optimize the tool for SEO to rank for keywords like "desk scheduling efficiency calculator" and "office space cost savings tool."

## Features

Input Form: A simple form to collect user inputs (e.g., number of employees, desks, and current desk utilization).

Calculation Logic: A backend or client-side algorithm to estimate time and cost savings.

Results Display: Show the calculated savings in a clear, visually appealing format.

Call-to-Action (CTA): Encourage users to try Workplacify or learn more.

Responsive Design: Ensure the tool works seamlessly on desktop and mobile.

## User Flow

User lands on the calculator’s landing page.

User fills out the form with details about their office setup.

User clicks "Calculate Savings."

The tool displays the estimated time and cost savings.

User is prompted to try Workplacify or share the results.

## Form Fields

The form will include the following fields:

Number of Employees (Number Input)

Number of Desks (Number Input)

Current Desk Utilization (Percentage Input, e.g., "60%")

Average Employee Salary (Number Input, e.g., "$50,000")

Office Space Cost (Number Input, e.g., "$10,000 per month")

## Calculation Logic

The calculator will estimate savings based on the following assumptions:

Time Savings: Optimizing desk usage can reduce the time employees spend searching for desks by X%.

Cost Savings: Reducing unused desks can lower office space costs by Y%.

## Example Formula

Time Savings:
Time Saved = (Number of Employees _ Hours Spent Searching per Week _ 52) \* (1 - Current Utilization)

Cost Savings:
Cost Saved = (Office Space Cost \* (1 - Current Utilization))

## Results Display

The results will include:

Time Saved: Displayed in hours per year (e.g., "You could save 500 hours per year!").

Cost Saved: Displayed in dollars per year (e.g., "You could save $50,000 per year!").

CTA: A button to "Try Workplacify for Free" or "Learn More."

## Design and UI

Use Chakra UI v2 for a clean, modern design.

Form Layout: Use a single-column layout with clear labels and input fields.

Results Section: Display the results in a visually appealing format (e.g., cards or charts).

Branding: Include Workplacify’s logo and colors for brand consistency.

## Development Steps

Create Form Components

Build the input form to collect user data.

Create a results display component to show the calculated savings.

Implement Calculation Logic

Use React state to handle form inputs and perform calculations.

Display the results dynamically based on user inputs.

Style with Chakra UI

Use Chakra’s components for layout and styling.

Add animations or transitions for a polished user experience.

Optional Features

Social Sharing: Add buttons to share results on LinkedIn, Twitter, or Facebook.

Advanced Calculations: Allow users to input additional data (e.g., meeting room usage, remote work percentages) for more accurate estimates. But only after signing up. Sign up is via /signup.

SEO Optimization
Meta Tags: Include relevant meta tags (e.g., title, description) targeting keywords like "desk scheduling efficiency calculator."

Structured Data: Add structured data (e.g., FAQ schema) to improve search engine visibility.

Alt Text: Use descriptive alt text for images and icons.
