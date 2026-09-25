# ✈️ Traveloop

A travel-planning web app built in a hackathon sprint — plan trips, build day-by-day itineraries, explore cities and activities, and keep a travel journal, all in one place.

## Features

- **Dashboard** — trip stats, upcoming plans, quick actions
- **Trip planner & itinerary builder** — add stops, browse activities by category, auto-generated day-by-day timeline and budget breakdown
- **My Itineraries** — manage saved trips
- **Explore** — browse and view public shared itineraries
- **Cities & Activities** — destination and activity discovery
- **Travel Journal / Profile** — log entries and manage your profile
- **Guest mode** — jump straight in without an account, or enter a name to personalize the experience (stored locally in your browser — no server, no accounts)

## Tech

Plain HTML, CSS and JavaScript — no build tools, no frameworks, no dependencies. Every page shares:

- `css/traveloop.css` — global nav, guest-name modal, shared motion & utility styles
- `js/traveloop.js` — nav injection, guest/name handling, small shared helpers

Each page also has its own scoped `<style>`/`<script>` for page-specific UI, layered on top of the shared design system (dark navy background, gold / teal / coral accents).

## Running locally

No build step needed. Just serve the folder statically, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open `http://localhost:8000/start.html`.

## Project structure

```
traveloop/
├── start.html        # Sign in / register (entry point)
├── reg.html          # Standalone registration page
├── main2.html        # Dashboard
├── main3.html        # Plan a trip
├── itnbuilder.html   # Itinerary builder
├── itnview.html       # My itineraries
├── cityview.html      # Cities
├── activity.html      # Activities
├── explorepub.html    # Explore public itineraries
├── prf-jour.html      # Profile & journal
├── css/traveloop.css  # Shared design system
└── js/traveloop.js    # Shared nav + guest/name logic
```

## Notes

- All data (trips, activities, budgets) is sample/demo content baked into each page — there's no backend or database.
- Your display name is stored only in your browser's `localStorage`; choosing "Guest" skips this entirely.

---

Open the index.html file to see the whole website. 
