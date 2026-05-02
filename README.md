# TitleRoe Portfolio

Standalone static portfolio extracted from `onroespace`.

This project intentionally excludes admin login, delete, and edit APIs. Update
`data/classification_manifest.json` and `public/images/titleroe-portfolio/`
locally, then build and deploy the static output.

## Commands

```bash
npm install
npm run dev
npm run build
```

The portfolio renders at `/` and also at `/titleroe/portfolio` for compatibility
while migrating links.
