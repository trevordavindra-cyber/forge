# Performance envelope

## Browser checkpoint targets

- Viewport pixel ratio is capped at 2 to bound mobile GPU fill cost.
- Three.js resources are disposed when nodes are removed and when the viewport unmounts.
- The physics preview clamps frame delta to 50 ms to prevent runaway integration after a background-tab pause.
- Undo history is capped at 80 snapshots and audit history at 200 records.
- AI plans are capped at 64 tool calls.
- Project imports are capped at 10,000 nodes and 10 MB.
- Requirement lists render at most 400 global matches. The 20,000-record dataset is generated only for global search and explicit export.
- Autosave uses a 700 ms quiet window.
- Mobile generation enforces quality-specific node budgets (900 low, 2,000 medium, 3,500 high) and a 1,400-node region ceiling.
- Terrain mesh sampling adapts to low, medium, and high quality.
- Repeated generated vegetation is submitted in instanced batches instead of one draw call per node.
- glTF imports are capped at 25 MB, 256 meshes, and 250,000 vertices.

## Measured evidence

At checkpoint verification, the production build completed successfully. No browser frame-time, memory, battery, thermal, or physical-device benchmark has been run in this environment, so no FPS or mobile power claim is made.

## Next measurement work

- Add automated browser traces for 1,000 and 10,000-node scenes.
- Measure iPhone Safari and Android Chrome touch latency, GPU frame time, memory, battery, and thermal throttling.
- Virtualize Explorer and move scene reconciliation to indexed dirty sets.
- Split Three.js and specification content into lazy chunks if single-file deployment is no longer required.
