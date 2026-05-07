# AGENTS.md

This file guides Codex when working with code in this repository.

# Spatial Curiosity - Engineering Guide

Spatial Curiosity is a bilingual portfolio site with an admin dashboard for managing profile, experience, education, skills, and projects. Public content is rendered from MongoDB data, while the admin area provides authenticated CRUD workflows and project image uploads.

## Technical Stack

- **App Framework**: Next.js 16 with App Router.
- **Language**: TypeScript 5.x.
- **Styling**: Tailwind CSS 4 plus global styles in `src/app/globals.css`.
- **Animation**: Framer Motion.
- **Database**: MongoDB via Mongoose.
- **Authentication**: Cookie-based admin session using `jose`.
- **Images**: `next/image` for public UI and `sharp` for project image compression on upload.
- **Icons**: `react-icons`.
- **Linting**: ESLint via `npm run lint`.

## Project File Structure

Use this as the quick map for where to place UI, API, models, admin helpers, and upload logic.

```txt
spatial-curiosity/
|-- src/
|   |-- app/
|   |   |-- admin/                     # Admin routes for content management
|   |   |-- api/
|   |   |   |-- auth/                  # Admin login/session endpoints
|   |   |   |-- cv/[type]/             # CRUD endpoints for profile/experience/education/skill/project
|   |   |   `-- upload/                # File upload endpoints
|   |   |-- loading.tsx                # Public route loading UI
|   |   `-- page.tsx                   # Landing page
|   |-- components/
|   |   |-- admin/                     # Shared admin UI building blocks
|   |   `-- *.tsx                      # Public landing page sections
|   |-- lib/
|   |   |-- admin/                     # Admin API helpers, factories, and types
|   |   |-- upload/                    # Project image upload/compression helpers
|   |   |-- auth.ts                    # Session helpers
|   |   `-- mongoose.ts                # MongoDB connection
|   |-- models/
|   |   `-- CVData.ts                  # Mongoose schemas and resolved frontend types
|   `-- middleware.ts                  # Route and API protection
|-- public/
|   |-- img/                           # Static public images
|   `-- uploads/projects/              # Uploaded project images in local/dev
|-- AGENTS.md
|-- package.json
`-- README.md
```

## Product Rules

- Public content is bilingual and supports `en` and `th`.
- The public landing page must keep working when some sections have empty or partial data.
- The admin dashboard is route-based, not tab-based.
- `profile` is a singleton document; other sections are list-based collections.
- Project images are optional, but if present they should render cleanly on the landing page.
- Thai copy should avoid exaggerated tracking and forced uppercase styling.

## App Routes

- `/`: public landing page with sections for hero, experience, education, skills, and projects.
- `/admin/login`: public login page for the admin area.
- `/admin`: redirects to the primary admin section.
- `/admin/profile`: edit the single profile document.
- `/admin/experience`: manage experience entries.
- `/admin/education`: manage education entries.
- `/admin/skill`: manage skill groups.
- `/admin/project`: manage projects, tech stack tags, and project images.

## Auth Rules

- All `/admin/*` routes except `/admin/login` must require a valid session cookie.
- All mutation requests to `/api/cv/*` and `/api/upload/*` must verify the session in middleware.
- Unauthorized admin page access should redirect to `/admin/login`.
- Unauthorized API mutations should return `401`.

## Data Model Direction

Core content models live in `src/models/CVData.ts`:

- `Profile`: singleton profile data for hero/contact details.
- `Experience`: bilingual role, company, period, and bullet-style descriptions.
- `Education`: bilingual education history.
- `Skill`: bilingual categories with localized items.
- `Project`: bilingual project content plus `techStack`, links, and `imageUrl`.

Resolved frontend types are also defined in `src/models/CVData.ts` and are used by public page sections after language resolution.

## Data And API Rules

- Keep MongoDB access inside route handlers, model files, and database helpers.
- Use `/api/cv/[type]` as the shared CRUD boundary for admin content updates.
- `profile` uses singleton update behavior; collection sections use POST/PUT/DELETE semantics.
- Project image uploads go through `/api/upload/project-image`.
- Uploaded project images are compressed with `sharp` and stored under `public/uploads/projects` in local/dev.
- Only delete previous uploaded images when the path belongs to the local project upload directory.
- Do not move binary file handling into client components.

## UI Rules

- Preserve the current minimal editorial direction of the landing page.
- Keep public sections light, clean, and spacious rather than decorative or heavy.
- Reuse shared admin components from `src/components/admin/*` before adding one-off admin UI.
- New user-facing copy should support both Thai and English where appropriate.
- For language-aware typography, avoid applying English-style wide tracking to Thai labels and headings.
- Prefer consistent card shells, spacing, and button styles across admin pages.

## Image Rules

- Public project cards use a `594:241` image ratio.
- Uploaded images should be optimized for clarity first, then size reduction.
- Runtime uploads in `/uploads/...` may need direct serving behavior; be careful when changing `next/image` settings.
- If the user later wants production-grade persistent uploads on Vercel, move storage away from the local filesystem to a hosted provider such as S3 or Cloudinary.

## Testing Rules

- Run `npm run lint` after meaningful code changes.
- When changing admin CRUD flows, verify both edit state behavior and saved MongoDB output.
- When changing public data rendering, verify both `lang=en` and `lang=th`.
- When changing image upload behavior, verify upload, replace, preview, persisted `imageUrl`, and public rendering.
