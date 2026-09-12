# USMLE Step 1 Study Planner

A lightweight, shared study planner for two people preparing for USMLE Step 1. Track progress, sync across devices, and manage your study timeline with no login required.

## Features

- **Shared planning**: Create a private link to sync a study plan between two devices
- **Daily logging**: Track questions completed each day
- **Auto sync**: Changes sync across devices every 5 seconds
- **Mobile-first**: Optimized for phones (~390px) but works on desktop
- **No accounts**: Private token-based access, no login needed
- **Local fallback**: Works offline until you create a shared link

## Quick Start

### Development

```bash
npm install
npm run dev
```

This starts:
- Frontend dev server at `http://localhost:5173`
- Backend at `http://localhost:5000`

### Building for Production

```bash
npm run build
```

Outputs:
- Frontend: `frontend/dist/`
- Backend: ready to run with `npm start`

## Deployment

### Option 1: Vercel (Recommended)

1. Push this repo to GitHub
2. Connect to Vercel
3. Set root to project root
4. Deploy

Vercel will automatically:
- Build both frontend and backend
- Serve static files from `frontend/dist`
- Route `/api/*` to backend

### Option 2: Railway / Other PaaS

1. Push to GitHub
2. Create new project, select this repo
3. Deploy

The app runs on port 5000 (configurable via `PORT` env var).

### Option 3: Local/Self-Hosted

```bash
npm install
npm run build
npm start
```

Server listens on `http://localhost:5000`

## How It Works

### Sharing a Planner

1. Open the app
2. Tap **Save & Share**
3. A private token is generated and added to the URL
4. Share the URL with your study partner

Example: `https://example.com/?share=LONG_RANDOM_TOKEN`

### Syncing

- **Device A** makes a change → saved locally and uploaded
- **Device B** polls every 5 seconds → fetches new data
- Both devices show `Shared live`

### Data Storage

- **Before sharing**: localStorage only
- **After sharing**: serverside + localStorage
- **Conflict resolution**: Last successful save wins

## Project Structure

```
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── db.js
│   │   └── utils.js
│   └── package.json
├── package.json
├── vercel.json
└── README.md
```

## API

### POST /api/planners
Create a shared planner.

```json
{
  "data": {
    "plan": { "examDate": "...", "totalQuestions": 1500, ... },
    "history": { "2026-09-12": 80, ... }
  }
}
```

**Response:**
```json
{
  "token": "LONG_RANDOM_TOKEN",
  "data": { ... },
  "createdAt": "2026-09-12T10:30:00Z",
  "updatedAt": "2026-09-12T10:30:00Z"
}
```

### GET /api/planners/:token
Fetch a shared planner.

### PUT /api/planners/:token
Update a shared planner.

## Design Goals

- **Small and focused**: Study planning, not a full LMS
- **No friction**: No login, no email, no account verification
- **Private**: Token-based, not trackable
- **Supportive tone**: Warm, editorial design
- **Mobile first**: Works on any phone

## Privacy

The private token acts as the access key. Anyone with the link can view and edit. Keep the link private.

Query strings should be stripped from server logs if possible.

## Testing

### Two-Device Test

1. **Device A**: Open app, confirm defaults, tap **Save & Share**
2. Copy the shared URL
3. **Device B**: Open shared URL
4. **Device B**: Log 35 questions
5. Wait up to 8 seconds
6. **Device A**: Should see `35 done`, `1,465 left`
7. **Device A**: Change daily goal to 70
8. **Device B**: Reload and confirm the change

## License

MIT
