# LinkMe

LinkMe is a personal portfolio and link-in-bio builder. Each user creates a profile page with their introduction, social accounts, custom links, work samples, interests, and milestones, then shares it with one URL.

The project has a React and Vite frontend and an Express API backed by MongoDB. Profile images are stored with Cloudinary.

## Features

### Public landing page

- A responsive introduction explains what LinkMe does and shows a sample personal page.
- Feature highlights introduce Profile, Links, and Showcase.
- The main call to action opens the builder. Visitors who are signed out are asked to sign in or create an account first.
- Landing page footer and navigation link back to the landing page.

### Accounts and access

- Create an account with a name, unique username, email, and password.
- Sign in and sign out.
- Authenticated users can edit their own profile and settings.
- Passwords are hashed by the API, and authenticated API requests use a JWT bearer token.
- Public portfolio pages can be viewed without signing in when the profile is public.

### Five-step portfolio builder

The builder at `/builder` guides users through five steps. The step navigation allows users to move between steps, and **Save & Next** saves profile changes to the account before advancing. Edits are also written to browser storage as they are made, so the preview stays up to date while editing.

1. **Profile**
   - Choose a public username and portfolio URL.
   - Add a display name, professional title or tagline, and bio (up to 250 characters in the editor).
   - Upload a profile image or paste an image URL; remove an existing image.
   - Use built-in bio examples for inspiration.

2. **Links**
   - Add social profiles for Instagram, LinkedIn, GitHub, X, email, YouTube, Spotify, and Facebook.
   - Filter the available social platforms by category.
   - Add, edit, highlight, or remove custom links for projects, shops, newsletters, bookings, and other destinations.
   - Set each custom link's title, URL, optional subtitle, and icon.

3. **Design**
   - Choose from eight visual themes: Clean Minimal, Midnight, Terracotta, Navy Executive, Emerald Cyber, Soft Indigo, Linen & Espresso, and Midnight Sapphire.
   - Choose an accent color from presets or enter a custom color.
   - Choose link button shape and typography style.
   - See design changes in the live preview.

4. **Photos & extras**
   - Add image cards for projects, designs, photography, or other work, with a title, optional caption, and optional click-through URL.
   - Add and remove interests or skills; quick-add suggestions are provided.
   - Add and remove achievements or milestones, with an optional year.

5. **Publish / Share**
   - Review the public or private status and a summary of the profile configuration.
   - Copy the shareable URL or open the live portfolio.
   - Generate and save a QR code for the portfolio.
   - Open sharing shortcuts for X, WhatsApp, LinkedIn, and Instagram.

### Preview and portfolio pages

- A mobile phone preview updates as profile content and design choices change.
- On small screens, switch between the editor and preview using the **Edit** and **Preview** tabs.
- The public portfolio page displays the profile, bio, social links, custom links, photos, interests, and achievements that the user has added.
- Public portfolio URLs use `/<username>`; `/p/<username>` is also routed to the portfolio page.
- Owners can open their editor from their portfolio page. Visitors can copy the link and view a QR code.

### Settings

- Update the portfolio username and account email.
- Choose whether the portfolio is public or private.
- Clear profile content while keeping the account identity fields described in the confirmation prompt.
- Sign out of the current device.

## Project structure

```text
Frontend/   React, Vite, Tailwind CSS application
Backend/    Express API, MongoDB models, authentication, and image upload
```

Useful frontend files:

- `Frontend/src/pages/Landing.jsx` — public introduction page.
- `Frontend/src/pages/Home.jsx` — five-step builder and live preview layout.
- `Frontend/src/pages/Portfolio.jsx` — public portfolio page.
- `Frontend/src/pages/Settings.jsx` — account and visibility settings.
- `Frontend/src/components/wizard/` — builder steps and step navigation.
- `Frontend/src/components/DevicePreview.jsx` — live mobile preview.
- `Frontend/src/context/ProfileContext.jsx` — profile state and persistence.

Useful backend files:

- `Backend/server.js` — Express server, CORS, health route, and API routes.
- `Backend/src/routes/` — authentication, profile, and upload routes.
- `Backend/src/schema/` — MongoDB user and profile schemas.
- `Backend/src/middleware/` — authentication and image upload middleware.

## Run locally

Use Node.js 22 or a compatible current Node.js release. Install dependencies in the frontend and backend:

```sh
npm --prefix Frontend ci
npm --prefix Backend ci
```

Create `Backend/.env` with the backend configuration below. Start the API and frontend in separate terminals from the project root:

```sh
npm run dev:backend
```

```sh
npm run dev
```

Vite runs the frontend and proxies API requests to `http://localhost:3000`. The API health check is available at `http://localhost:3000/health`.

### Environment variables

Backend (`Backend/.env`):

```dotenv
PORT=3000
MONGO_URL=mongodb+srv://<user>:<password>@<cluster>/<database>
MONGO_DB_NAME=linkme
JWT_SECRET=<long-random-secret>
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
```

`MONGO_URL` and `JWT_SECRET` are required for the API to start and authenticate users. Cloudinary credentials are needed for profile and showcase image uploads. `CLIENT_URL` can contain comma-separated frontend origins when deploying.

Frontend:

- For local development, Vite uses its proxy to reach the local API.
- Set `VITE_API_URL` to the backend origin when deploying the frontend, for example `https://api.example.com` (no `/api` suffix is used by the current API routes).
- The production default is configured in `Frontend/src/api/axios.js`; set `VITE_API_URL` when using a different API host.

## API routes

The backend exposes these routes:

| Method | Route | Purpose | Access |
| --- | --- | --- | --- |
| `GET` | `/health` | API health check | Public |
| `POST` | `/register` | Create an account and profile | Public |
| `POST` | `/login` | Sign in and receive an auth token | Public |
| `POST` | `/logout` | Sign out endpoint | Public route; client removes its token |
| `DELETE` | `/account` | Deactivate the authenticated account | Authenticated |
| `POST` | `/upload` | Upload an image to Cloudinary | Authenticated |
| `GET` | `/me` | Get the authenticated user's profile | Authenticated |
| `PATCH` | `/me` | Update the authenticated user's profile | Authenticated |
| `GET` | `/public/:username` | Fetch a public profile | Public |

Authenticated requests use `Authorization: Bearer <token>`.

## Build and deployment

Build the frontend from the project root:

```sh
npm run build
```

The generated static site is in `Frontend/dist`.

- **Frontend:** deploy `Frontend` as the base directory, run `npm ci` and `npm run build`, and publish `dist`. Set `VITE_API_URL` to the deployed backend origin.
- **Backend:** deploy `Backend` using `render.yaml` or another Node.js host. Configure `MONGO_URL`, `MONGO_DB_NAME`, `JWT_SECRET`, Cloudinary credentials, and `CLIENT_URL` in the host's environment settings.
- The frontend host must serve the React app for client-side routes, including `/builder` and `/<username>`.

## Main technologies

- React 19 and React Router
- Vite and Tailwind CSS 4
- Express 5
- MongoDB and Mongoose
- JWT and bcryptjs
- Cloudinary and Multer
- Lucide and React Icons
