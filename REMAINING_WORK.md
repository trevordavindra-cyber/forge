# Persistent implementation queue

This queue supplements the persistent 20,000-requirement registry in the application. It is ordered by dependency and does not mark architecture prose or visual mockups as complete.

## Phase 1 — Core architecture and execution

- Create the native C++20 workspace, build graph, platform abstraction, allocator zones, job system, diagnostics, and crash containment.
- Port immutable browser scene commands into the native DataModel command layer.

## Phase 2 — DataModel and Luau

- Implement reflection, pointer-safe hierarchy, epoch reclamation, snapshots, deep serialization, native Luau, sandbox budgets, bindings, and debugger protocol.

## Phase 3 — Scene editor

- Add multi-selection, marquee, reparenting, snapping, local/world transforms, prefab authoring, and virtualized hierarchy. The searchable command palette is now implemented in the web workspace; the remaining editor interactions are still open.
- Run physical iOS and Android interaction verification.

## Phase 4 — Rendering, physics, and assets

- Implement Vulkan framegraph, GPU culling, material pipeline, Jolt integration, constraints, terrain, asset database, importers, and streaming.

## Phase 5 — Content tools

- Finish animation, rigging, IK, live UI runtime, audio, particles, direct viewport terrain painting, navigation mesh execution, NPC runtime, and gameplay ability execution. Quest, inventory, NPC, UI, and save project definitions now exist but do not run in a native game server.

## Phase 6 — AI

- Add an authenticated model gateway, project embeddings, multi-file semantic planning, native test execution, server-anchored audit, cost controls, worker-isolated generation, and richer repair policies. Deterministic world/game planning, persistent tasks, checkpoints, cancellation, resume, validation, and safe autofix are implemented.

## Phase 7 — Networking

- Implement authoritative transport, replication, interest management, lag compensation, sessions, server runtime, matchmaking, social systems, and network simulation.

## Phase 8 — Storage and collaboration

- Add authenticated cloud storage, version control, CRDT/OT collaboration, backup, merge, migrations, build workers, and artifact cache.

## Phase 9 — Security, testing, and performance

- Add fuzzing, browser E2E/device tests, sanitizer builds, vulnerability scanning, threat review, CSP nonce builds, mobile profiling, and recovery drills.

## Phase 10 — Publishing

- Add signed artifacts, environments, deployment rollback, monitoring, compatibility certification, Roblox import/export validation, and documented publishing integrations.

Use the in-app registry to move individual requirements into `in-progress`, `blocked`, or `failed`. `complete` and `verified` are intentionally evidence-gated in source.
