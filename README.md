# TODO List

This is a simple todo list app built with:

- Vue 3
- TypeScript
- Vite
- Vue router
- Pinia
- Eslint
- Vitest

## Development (node >=v14)
**`FIRST OF ALL: On root, copy db.base.json and rename db.json`**

1. Install dependencies
```bash
npm install
```
2. Start Fake REST API
```bash
npx json-server --watch db.json --port 3100 --delay 200
```
3. Run vite
```bash
npm run dev
```