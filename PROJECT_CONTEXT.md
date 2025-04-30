# Project Context: Photographer Portfolio Website

This document provides a technical overview and context for the photographer portfolio website project.

## 1. Core Goal & Requirements

*   **Goal:** Build a modern, performant, dark-mode portfolio site for a photographer, hosted on GitHub Pages.
*   **Key Features:** Dynamic grid homepage, individual photo story pages, smooth scrolling, custom cursor, JSON-based content management.
*   **Target User:** Photographer with limited coding knowledge (emphasizes ease of content updates).
*   **Hosting:** GitHub Pages via GitHub Actions CI/CD.

## 2. Technology Stack

*   **Framework:** Astro (Chosen for performance, component architecture, image optimization, Markdown/MDX support, and easy JSON data fetching).
*   **Layout:** Primarily CSS Grid, potentially Flexbox for simpler elements.
*   **Styling:** CSS / SCSS (scoped within Astro components + global styles).
*   **Interactivity:** Vanilla JavaScript (for custom cursor, potentially other effects). Astro Islands architecture will be leveraged for JS components.
*   **Data Management:** JSON file (`src/data/photoStories.json`) for photo story content.
*   **Deployment:** GitHub Actions workflow to build and deploy the Astro site to the `gh-pages` branch.
*   **Package Manager:** npm (installed via Homebrew/Node.js).

## 3. Architecture & Key Decisions

*   **Component-Based:** Utilizing Astro components (`.astro`) for UI elements (Header, Footer, Grid Items, etc.).
*   **Layouts:** Using Astro layouts (`src/layouts/BaseLayout.astro`) for consistent page structure.
*   **Dynamic Routing:** Astro's file-based dynamic routing for photo story pages (`src/pages/stories/[slug].astro`).
*   **Data Fetching:** Astro's `Astro.glob()` or standard `fetch/fs` methods to read data from `photoStories.json` at build time.
*   **Image Handling:** Leveraging Astro's built-in `<Image>` component for optimization and lazy loading.
*   **Custom Cursor:** Implemented likely via a client-side JavaScript module/component, potentially using an Astro framework island (e.g., Preact/React if needed, but starting with Vanilla JS).

## 4. Potential Challenges & Notes

*   **CSS Grid Complexity:** Achieving the "purposefully arranged" overlapping grid layout on the homepage might require careful CSS Grid implementation and potentially absolute positioning. Responsiveness needs attention.
*   **Custom Cursor Performance:** Ensure the JavaScript for the custom cursor is performant and doesn't negatively impact scrolling or interaction.
*   **Image Optimization:** Fine-tuning Astro's image component settings for optimal balance between quality and file size.
*   **GitHub Actions Workflow:** Setting up the deployment workflow correctly for Astro builds targeting GitHub Pages (base path configuration might be needed).
*   **Ease of Update:** Ensuring the JSON structure and the process for adding new stories are straightforward for the end-user.

## 5. Current Status

*   Project initialized with Astro.
*   Basic file structure created.
*   Git repository initialized.
*   Node.js/npm installed via Homebrew.

*(This file should be updated as major technical decisions are made or issues are encountered.)* 