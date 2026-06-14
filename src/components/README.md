# Component Structure

This project follows Atomic Design naming for new work:

- `atoms`: smallest reusable UI primitives.
- `molecules`: small composed UI units.
- `organisms`: full sections and feature blocks.
- `templates`: page-level React templates rendered by Astro.

`templates/AppShowcaseTemplate.tsx` is currently kept close to the Figma Make export to preserve pixel/UI parity while porting from Vite React to Astro + React. Extract it into atoms, molecules, and organisms only with visual regression checks against the original app.
