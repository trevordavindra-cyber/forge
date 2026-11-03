# Compatibility

## Implemented checkpoint

- Browser runtime: modern evergreen browsers with WebGL2, IndexedDB, ResizeObserver, structuredClone, and ES2022 support.
- Input: mouse, wheel, touch orbit, two-finger dolly/pan, keyboard shortcuts, and numeric property editing.
- Project format: `axiom.project/2` JSON import/export with automatic checkpoint-01 migration.
- Geometry interchange: bounded glTF/GLB import and visible-project GLB export.
- Roblox interchange: version-4 XML hierarchy subset plus per-node conversion report.
- Requirement state: `axiom.requirements.state.v1` sparse JSON overrides.

## Architecture targets, not yet implemented

- Native Windows, Linux, and macOS C++20 editor.
- Vulkan 1.3 and Jolt Physics runtime.
- Full Luau language/runtime compatibility.
- Roblox `.rbxl` / `.rbxm` production round-trip and official publishing integration.
- iOS and Android packaged applications.

The specification includes designs and boilerplates for these targets; documentation does not count as implementation in the registry.
