# Working Document: Photographer Portfolio Website

**1. Project Goal:**
To create a modern, performant, dark-mode portfolio website for a photographer, hosted on GitHub Pages. The site will feature a dynamic grid homepage linking to individual photo story pages, incorporating smooth scrolling, custom cursor effects, and easy content management via JSON files.

**2. Confirmed Requirements:**
*   **Hosting:** GitHub Pages.
*   **Version Control:** GitHub.
*   **Homepage:**
    *   Header: Logo and Type Mark (files provided), Menu (link to Contact page), Instagram icon link (`@thomassdalby`).
    *   Layout: Grid of images (2-3 wide), "purposefully arranged" with potential overlaps (inspired by `ulrichzinell.com`, `markomestrovic.com`).
    *   Image Interaction: On hover, display story title with a fade-in text overlay (ensuring contrast). Custom yellow dot cursor on hover.
    *   Navigation: Clicking an image navigates to its dedicated photo story page.
*   **Photo Story Page:**
    *   Content: Placeholder text for story title and paragraph description initially.
    *   Layout: Main image prominently displayed at the top, followed by a "collaged layout" of remaining story images below.
*   **Contact Page:** Basic page structure (details TBD, use placeholder).
*   **Data:** ~20 photo stories, 5-15 images per story. Content managed via JSON.
*   **Aesthetics:** Dark mode, smooth scrolling.
*   **Technical:** User has limited coding knowledge; ease of updating content is important.

**3. Proposed Technology Stack:**
*   **Static Site Generator:** Astro (for performance, component architecture, image optimization, JSON data handling).
*   **Layout:** CSS Grid (primary tool), potentially Flexbox for simpler elements.
*   **Styling:** CSS / SCSS (within Astro components).
*   **Interactivity:** Vanilla JavaScript (for custom cursor, potentially advanced scroll/hover effects if needed).
*   **Data:** JSON files.
*   **Deployment:** GitHub Actions to build and deploy the Astro site to GitHub Pages.

**4. Proposed File Structure Outline (Simplified):**
```
/
├── public/
│   ├── logo/
│   │   └── [logo files]
│   ├── images/
│   │   └── [placeholder or initial story images]
│   └── [favicon, etc.]
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── HomeGridItem.astro  # Component for each image on the home grid
│   │   ├── StoryImageCollage.astro # Component for the story page image layout
│   │   └── Cursor.jsx          # React/Preact/Solid component for custom cursor JS (Astro allows this) or plain JS module
│   ├── layouts/
│   │   └── BaseLayout.astro    # Base HTML structure (head, body, header, footer)
│   ├── pages/
│   │   ├── index.astro         # Home page
│   │   ├── contact.astro       # Contact page
│   │   └── stories/
│   │       └── [slug].astro    # Dynamic route template for photo story pages
│   ├── data/
│   │   └── photoStories.json   # JSON file containing data for all stories
│   └── styles/
│       └── global.css          # Global styles (dark mode, fonts, etc.)
├── astro.config.mjs            # Astro configuration
├── package.json                # Project dependencies
└── README.md                   # Project setup and instructions
```

**5. Key Features & Task List:**

*   **Setup & Foundation:**
    *   [x] Initialize GitHub repository.
    *   [x] Set up Astro project (`npm create astro@latest`).
    *   [x] Configure `astro.config.mjs` (e.g., site metadata).
    *   [x] Set up basic file structure.
    *   [x] Define global styles (`global.css`): dark mode, typography, basic resets.
    *   [x] Create `BaseLayout.astro`.
*   **Data Structure:**
    *   [x] Define structure for `photoStories.json`.
    *   [x] Populate `photoStories.json` with placeholder data for 2-3 stories.
*   **Header & Footer:**
    *   [ ] Create `Header.astro` component (Logo, Name, Menu, Instagram link).
    *   [ ] Style Header.
    *   [ ] Create basic `Footer.astro` (optional, e.g., copyright).
    *   [ ] Integrate Header/Footer into `BaseLayout.astro`.
*   **Homepage (`index.astro`):**
    *   [ ] Fetch data from `photoStories.json`.
    *   [ ] Implement homepage CSS Grid layout.
    *   [ ] Create `HomeGridItem.astro` component for displaying each story preview image.
    *   [ ] Style `HomeGridItem.astro`.
    *   [ ] Implement hover effect (text overlay fade-in) within `HomeGridItem.astro` using CSS. Ensure text contrast (e.g., using a semi-transparent overlay).
    *   [ ] Link each `HomeGridItem.astro` to its corresponding dynamic story page route.
*   **Photo Story Page (`stories/[slug].astro`):**
    *   [ ] Set up dynamic routing based on story slugs from JSON.
    *   [ ] Fetch data for the specific story based on the slug.
    *   [ ] Display main image.
    *   [ ] Display story title and description (placeholder text).
    *   [ ] Implement "collaged layout" for remaining images (using CSS Grid/`StoryImageCollage.astro`).
    *   [ ] Style the story page layout.
*   **Contact Page (`contact.astro`):**
    *   [ ] Create basic content structure (placeholder).
    *   [ ] Style the contact page.
    *   [ ] Have a small section of text naming past brands I have worked with.
    *   [ ] Leave a space for a picture of myself.
*   **Interactivity & Polish:**
    *   [ ] Implement smooth scrolling (CSS `scroll-behavior` initially).
    *   [ ] Implement custom yellow dot cursor on image hover (CSS + JS `Cursor` component/module).
    *   [ ] Implement image lazy loading (Astro's `<Image>` component helps here).
    *   [ ] Optimize images (using Astro's built-in tools).
*   **Deployment:**
    *   [ ] Configure GitHub Actions workflow for building Astro and deploying to `gh-pages` branch.
    *   [ ] Test deployment.
*   **Content Population:**
    *   [ ] Replace placeholder text/images with final content.
    *   [ ] Populate `photoStories.json` with all 20 stories.

**6. Progress Tracker:**
(Use the checklist above in section 5)

**7. Next Steps:**
1.  Confirm if this working document and the proposed technology stack (especially Astro and the layout approach) align with your expectations.
2.  If approved, the first step would be to initialize the GitHub repository and set up the basic Astro project structure. 