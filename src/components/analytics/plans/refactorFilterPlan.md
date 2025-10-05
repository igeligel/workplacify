This is a document describing how to do a refactoring task.

In `src/components/analytics/BaseAnalytics.tsx` we have many filters:

- officeValue
- dateRangeValue
- includeWeekends

I want to have these filters as an own component and put the state into a shared state with zustand.

This is all so I can reuse the filter in `src/components/analytics/PeopleAnalytics.tsx`. Use the same component like `<WorkplacifyFilters>` and then use the store attached in the same directory under `src/components/analytics`. So when I use the components on different pages the state is shared.

Refactor the code.

Only use this directory. And use zustand for state management. We work in TypeScript and Chakra UI v3. You can find an example of a zustand store in `src/stores/officeFloorDeskFormStore.ts`.
