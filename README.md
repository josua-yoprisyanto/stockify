# Project Setup

## Specifications

- Node version: v20.12.0
- Npm version: 10.5.0
- Yarn version: 1.22.22

## How to Run

- install dependencies

```console
yarn / npm install
```

- run json server in new terminal

```console
npx json-server db.json --port 8000
```

- add .env
- add NEXT_PUBLIC_API_URL=http://localhost:8000 into .env
- run project

```console
yarn dev
```

## Note

- if there’s the problem, try to restart the json server or restart the next.js
- make sure the auth on db.json contain email, password and token
- since JSONPlaceholder doesn’t have a foreign key, so there might be some actions that don’t impact to other related features (ex: delete supplier doesn’t impact products)
- Redux was not used due to the small scale of the project
