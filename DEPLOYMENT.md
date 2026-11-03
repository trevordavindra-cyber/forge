# Deployment

## Static deployment

Run `npm run build` and deploy `dist/` to any HTTPS static host. `vite-plugin-singlefile` emits the application into `dist/index.html`; `sw.js` and `manifest.webmanifest` are copied from `public/`.

Recommended production headers:

```text
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; img-src 'self' data: blob:; worker-src 'self';
Referrer-Policy: no-referrer
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

The inline single-file output requires an inline-script CSP allowance unless a host-specific nonce/hash pipeline is added. A strict nonce-based build is a remaining security task.

## Update and rollback

- Keep the previous immutable `dist/` artifact.
- Deploy a new content-addressed release.
- Verify the page, WebGL viewport, project import/export, and service-worker update.
- Roll the origin back to the prior artifact when the smoke check fails.

No cloud API, multiplayer service, authentication provider, or publishing endpoint is configured in this checkpoint. Do not expose invented endpoints.
