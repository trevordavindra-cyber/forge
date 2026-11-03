# Security model

## Implemented controls

- The browser script preview does not use `eval`, `Function`, dynamic import, filesystem access, or network access. It accepts only `print()`, `workspace.Gravity`, and `workspace.Background` statements.
- AI generation uses a deterministic allowlisted tool union. Tool arguments are range-checked, plans are capped at 64 calls, destructive operations are marked high risk, and no plan applies before explicit user acceptance.
- AI changes are committed as one undoable project transaction and recorded in the project audit history.
- Project imports are schema-checked, duplicate IDs are rejected, node count is capped at 10,000, and imported JSON is capped at 10 MB.
- Requirement state imports cannot assert `complete` or `verified`; those states are evidence-gated in source.
- The service worker caches same-origin GET requests only.
- glTF import is capped at 25 MB, 256 meshes, and 250,000 vertices; project import is capped at 10 MB and 10,000 nodes.
- Generation is capped by device quality policy and a region ceiling, persists its payload, yields before commit, and can be paused or cancelled.
- Roblox export never invents uploaded asset identifiers or publishing credentials.

## Trust boundaries

- Project JSON is untrusted input.
- Script text is untrusted input and remains data in the browser preview.
- Requirement-state JSON is untrusted input and receives schema/ID/status checks.
- WebGL drivers and browser storage are platform dependencies outside this application boundary.

## Not yet implemented

- Native Luau VM isolation and OS-level plugin sandboxing.
- Authenticated cloud tenancy, authorization, server audit anchoring, secrets, and rate limiting.
- Signed plugin/dependency verification.
- CSP nonce generation for the single-file bundle.
- Fuzzing and external penetration testing.
- Browser isolation workers for glTF parsing and procedural generation.

These controls remain incomplete in the requirement registry and are not claimed by the application.
