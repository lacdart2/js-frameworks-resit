# OldROM — Retro Game Discovery Platform

A responsive game discovery app built with React and TypeScript for the Noroff JavaScript Frameworks Resit 1 assignment. Browse, search, sort, and favourite classic retro games using the Noroff Old Games API.

## Features

- Browse all games in a responsive grid layout
- View detailed information for each game (description, release year, genres)
- Explore games by genre on a dedicated genres page
- Search games by name (synced to the URL via `?q=` query param)
- Sort games by name or release year
- Mark games as favourites, persisted in `localStorage` via a custom `useFavourites` hook
- Toast notifications when adding or removing favourites, with undo support
- Fully responsive: full sidebar on desktop, icon-only sidebar on tablet, bottom navigation on mobile

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)
- [Lucide React](https://lucide.dev/) for icons

## API

This project uses the [Noroff Old Games API](https://docs.noroff.dev/docs/v2/basic/old-games) (no authentication required):

- `GET /old-games` — fetch all games
- `GET /old-games/:id` — fetch a single game by id

Base URL: `https://v2.api.noroff.dev`

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/lacdart2/js-frameworks-resit.git
cd js-frameworks-resit
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

<pre>
```
src/
├── api/           — API call functions (getAllGames, getGameById)
├── components/
│   ├── layout/    — Sidebar, BottomNav, main Layout wrapper
│   └── ui/        — reusable UI components (GameCard, GameGrid, SortSelect, GenreTag, etc.)
├── context/       — ToastContext for toast notifications
├── hooks/         — useFavourites custom hook (localStorage persistence)
├── pages/         — route-level pages (Home, GameDetail, Genres, Favourites, NotFound)
└── types/         — shared TypeScript interfaces
```
</pre>

## Author

**Lakhdar Hafsi**
GitHub: [@lacdart2](https://github.com/lacdart2)
Noroff Frontend Development — JavaScript Frameworks, Resit 1
