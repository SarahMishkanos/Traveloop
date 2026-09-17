# Traveloop

**Traveloop** is a travel-planning web app ,plan trips, build day-by-day itineraries, browse cities and activities, and keep a travel journal, all in one place.

Originally built during a hackathon, this repo is the cleaned-up, unified version: one consistent design system across every page, a working guest/name flow, and no personal data left over from the original build.

> **Current status:** front-end only. All trip/activity/journal data lives in the browser (hardcoded JS objects + `localStorage`)  there is no server or database yet. A real backend (Node/Express + PostgreSQL) is planned; see [Roadmap](#roadmap).

##  What's inside

| Page | File | What it does |
|---|---|---|
| Sign in / Register | `start.html` | Flip-card login & signup UI, or **Continue as Guest** |
| Standalone Register | `reg.html` | A second, simpler registration entry point |
| Dashboard | `main2.html` | Trip stats, greeting, quick actions, upcoming trips |
| Plan a Trip | `main3.html` | Start planning a new trip |
| Itinerary Builder | `itnbuilder.html` | Pick a trip, add stops, browse & add activities, see the auto-built day-by-day timeline and budget breakdown — **editable** |
| My Itineraries | `itnview.html` | Browse your saved trips, filter by status (Upcoming/Planning/Past), duplicate or share a trip — **read-only / management view** |
| Cities | `cityview.html` | Destination discovery |
| Activities | `activity.html` | Activity discovery, budget & packing helpers |
| Explore | `explorepub.html` | Browse public itineraries shared by other (demo) users |
| Profile & Journal | `prf-jour.html` | Two tabs in one page — edit your profile, or write trip journal entries. Deep-linkable via `prf-jour.html#profile` / `prf-jour.html#journal` |

**Itinerary Builder vs. My Itineraries** — these look similar but are intentionally different: the **Builder** is where you *edit* a trip (add stops, toggle activities in/out, save changes). **My Itineraries** is where you *browse and manage* your saved trips (search, filter by status, duplicate, share, delete) without any editing controls.

---

##  Features

- **Guest-friendly auth** — enter a name to personalize the app, or skip straight in as a guest. Your name is stored only in your browser (`localStorage`) — nothing is sent anywhere.
- **One consistent design system** — every page shares the same dark navy / gold / teal theme, the same sticky top navigation, and the same entrance animations, via `css/traveloop.css` + `js/traveloop.js`.
- **Fully responsive** — every page has its own breakpoints down to mobile, and the shared nav collapses into a hamburger menu on small screens.
- **Itinerary builder** — add stops to a trip, filter activities by category (food/culture/adventure/nature/nightlife/shopping/sightseeing), see a generated timeline and a live budget breakdown.
- **Trip management** — status-filterable trip list, duplicate/share actions, delete with confirmation animation.
- **Travel journal** — write and manage journal entries, tabbed alongside your profile settings.
- **No build step** — plain HTML/CSS/JS. Clone it and open a file, no `npm install` required.

---

##  Tech stack

- **HTML / CSS / vanilla JavaScript** — no frameworks, no bundler
- **Shared assets:**
  - `css/traveloop.css` — global nav bar styling, the guest-name modal, shared motion/utility classes, dark theme tokens (`--tl-bg`, `--tl-gold`, `--tl-teal`, etc.)
  - `js/traveloop.js` — injects the top nav on every logged-in page, resolves/persists the guest or entered name, exposes small shared helpers (`traveloopLogout()`, `traveloopSetName()`)
- Each page also has its **own scoped `<style>` / `<script>`** for page-specific UI and logic, layered on top of the shared system above.

##  Project structure

traveloop/
├── index.html          # redirects to start.html
├── start.html           # sign in / register (entry point)
├── reg.html             # standalone registration page
├── main2.html            # dashboard
├── main3.html            # plan a trip
├── itnbuilder.html       # itinerary builder (editable)
├── itnview.html          # my itineraries (read-only management)
├── cityview.html         # cities
├── activity.html         # activities
├── explorepub.html       # explore public itineraries
├── prf-jour.html         # profile & journal (tabbed)
├── css/
│   └── traveloop.css     # shared design system
├── js/
│   └── traveloop.js      # shared nav + guest/name logic
└── README.md
```


##  Running it locally

No build tools needed — just serve the folder statically (opening `start.html` directly as a `file://` URL also works, but a local server avoids some browser quirks):

```bash
# with Node
npx serve .

# or with Python
python3 -m http.server 8000
```

Then open `http://localhost:8000/start.html` and either:
- enter a name and click **Continue**, or
- click **Continue as Guest**



##  How the shared nav & guest system work

- On first visit to any page other than `start.html`/`reg.html`/`index.html`, `js/traveloop.js` shows a small modal asking for a name, with a **Continue as Guest** option.
- The chosen name (or "Guest") is saved to `localStorage` under `traveloop_name`, plus a `traveloop_guest` flag.
- Every page then injects the same top navigation bar, with the current page highlighted, and shows the stored name (with a "Guest" tag if applicable).
- `prf-jour.html` supports linking directly to a tab via `#profile` or `#journal` — the nav's "Profile" and "Journal" links use this, and a `hashchange` listener keeps the visible tab in sync even when you're already on that page.
- **Logout** (`traveloopLogout()`) clears both `localStorage` keys and returns to `start.html`.

---

## Known limitations (by design, for now)

- **No backend** — all trips, activities, and journal entries are hardcoded JavaScript data or browser-local state. Refreshing loses journal entries; nothing is shared between devices or browsers.
- **No real authentication** — "login" just infers a display name and stores it locally; there's no password checking against a server.
- **Demo data only** — trips like "Japan Cultural Tour" or "Bali Retreat" are sample content, not user-generated.

These are intentional trade-offs for a front-end-first hackathon build, not oversights,so see the roadmap below for what's planned to address them.

---

## Roadmap

A real backend is planned to replace the current localStorage/hardcoded-data approach:

- **Stack:** Node.js + Express API, PostgreSQL database
- **Planned data model:** `users`, `trips`, `stops`, `activities_catalog`, `itinerary_activities`, `timeline_items`, `journal_entries`
- **Auth:** real signup/login with bcrypt-hashed passwords and JWT sessions, with guest accounts as real (but flagged) user rows so nothing about the current guest flow breaks
- **Frontend changes:** replace `localStorage`/hardcoded `TOURS` object calls in each page's script with `fetch()` calls to the new API — the UI itself won't need a redesign

Not yet planned/out of scope: real-time multi-user editing, image uploads, payments/booking.

---

## Contributing

This started as a hackathon project and is now a personal portfolio piece. Issues and suggestions are welcome — feel free to open an issue or fork it.

## License

No license file yet — treat as all-rights-reserved unless a `LICENSE` file is added.

