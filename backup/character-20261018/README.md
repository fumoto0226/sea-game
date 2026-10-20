# Embedded yuren character

Copied from `/Users/cenglujin/Documents/website/yuren/` on 2026-10-18 with user authorization.

The original SVG deformation, hit-testing, limb coupling, pointer capture, spring and motion implementation is retained in script.js. Integration changes are limited to default `suit: 'milk-frog'` / `helmet: null`, plus native drag/context-menu/selection suppression. All clothing selections are null. The source project names the requested milk skin 奶蛙 / milk-frog.

embed.css hides editor controls and makes the view transparent. The controls remain in the document because the original renderer reads their default configuration. index.html loads embed.css after the original stylesheet. The parent embeds this document in an isolated iframe to avoid collisions with game globals/styles. The source project is not modified.

MOTION_RULES.md and CLOTHING_RULES.md are preserved for future maintenance. Custom pointer-driven physics is intentionally enabled; native browser image dragging is disabled.

Golden-frenzy integration adds a separate host-controlled phase player using the unchanged `squat-circle` track and spline. It starts at0s, loops .88–1.52s, then finishes at2.80–3.78s after the current cycle when disabled. Parent messages are accepted only from the same-origin parent with type `apple-works:golden-dance`. Dragging temporarily owns the pose/spring; after settling the dance resumes if still requested. `getGoldenDanceState()` exposes phase state for verification. The original yuren folder is not edited.

The parent now calls `advanceGoldenDance(dt, active)` on each game tick so pose animation remains visible when the embedded frame's own requestAnimationFrame is throttled. The child keeps standalone rAF playback as a fallback until host driving starts. Both use the same phase mapping, easing and geometry; main-game dt governs loop timing once embedded.

For double-click/file:// support, the main page loads generated `embed-bundle.js` which populates iframe.srcdoc with the character document and styles/script inline. This makes the child inherit the parent origin instead of treating another local file as an isolated origin. After changing character source files, run `python3 character/build-embed.py`. The standalone character/index.html remains available for development.
