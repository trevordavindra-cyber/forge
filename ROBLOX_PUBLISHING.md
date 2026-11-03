# Secure Roblox publishing

AXIOM includes an opt-in publishing button backed by Roblox Open Cloud's Place Publishing API. It updates one **existing** place; it does not create a new experience or change its public-access settings.

## Required Roblox setup

1. In Roblox Creator Dashboard, create an Open Cloud API key.
2. Grant the `universe-places` API system the **Write** operation, restricted to the intended experience.
3. Copy the experience's Universe ID and the target Place ID.
4. Configure the following environment variables on the trusted server running AXIOM's publishing API:
   - `ROBLOX_API_KEY`
   - `ROBLOX_UNIVERSE_ID`
   - `ROBLOX_PLACE_ID`
   - `AXIOM_PUBLISH_TOKEN` (a separate long random secret required to authorize publish clicks)
   - Optional: `PUBLISH_API_PORT` (defaults to `4179`)
5. Start the publishing API with `npm run publish-api`.
6. Start the Vite development website in a second terminal with `npm run dev`.
7. Open AXIOM Studio, choose **Publish to Roblox**, review compatibility, then explicitly confirm the publish.

Copy `.env.example` to a private environment configuration only if your hosting provider supports server-side secrets. Do not commit real credentials. Do not put the API key in browser code, local storage, a `VITE_` variable, screenshots, or a public repository. The browser only sends the generated XML and the separately configured AXIOM publish token to the same-origin `/api/roblox/publish` endpoint; the server adds the Roblox API key. The publish token is entered for the current session and is not persisted.

## Deployment

The website and `/api/roblox/*` endpoints must be served under the same origin, with the web host reverse-proxying `/api/roblox/*` to this Node service. A static-only host cannot publish by itself. Configure the three required environment variables as private server secrets. Do not expose port 4179 publicly; the API binds to loopback by default.

## Important export limitations

- The API updates an existing place and requires both a valid Universe ID and a Place ID belonging to that universe.
- Roblox's current documented Place Publishing endpoint accepts `.rbxl` or `.rbxlx` and has a 10 MiB request limit.
- AXIOM currently serializes a supported subset of its scene model into Roblox XML. Passing AXIOM's compatibility check does not certify the file against every Roblox engine feature. Validate the result in Roblox Studio and keep a backup before publishing important experiences.
- Terrain, custom meshes, advanced surface assets, and other conversion-required features must be converted or exported through an appropriate native workflow first.
- Generated Luau scripts are not compiled by AXIOM. Test them in Roblox Studio before publishing.
- Publishing makes a new published version of the configured place. This is a consequential action, so the UI requires a separate confirmation click.

Official references:
- https://create.roblox.com/docs/cloud/guides/usage-place-publishing
- https://create.roblox.com/docs/cloud/auth/api-keys
