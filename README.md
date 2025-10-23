# Legacy Bridge Project

## Overview
Parses legacy `.dat` fixed-width files → outputs JSON → serves REST API.

## Setup
```bash
npm start        # run API server
npx jest         # run tests
```

## API Endpoints
- GET /health → `{ status: "ok" }`
- GET /records?page=1&limit=50
- GET /records/:isbn


## Data
- `data → place `.dat` files here

