# AXIOM/CORE installation

## Prerequisites

- Node.js 20 or newer.
- npm 10 or newer.
- A WebGL2-capable browser. Current Chrome, Edge, Firefox, and Safari are the browser targets for the checkpoint editor.

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite. The editor persists the `local-main` project in IndexedDB and falls back to localStorage when IndexedDB cannot be opened.

## Verification

```bash
npm test
npm run build
npm run preview
```

`npm test` exercises registry invariants, immutable scene commands, AI tool validation, audit behavior, and the bounded script preview. `npm run build` performs the TypeScript/Vite production build.

## Native engine boundary

The C++20/Vulkan/Jolt/Luau material in the architecture specification is boilerplate and target architecture. This repository checkpoint contains a functional browser editor implemented with React and Three.js. It does not yet build the native engine.
