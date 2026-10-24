# Nocturne Atelier

A painting-led portfolio for creative website work and software projects. The opening artwork responds to pointer movement with subtle water-like ripples; the site includes project details and a direct contact link.

Featured projects: [KernelGuard](https://github.com/flyingsaucer1/KernelGuard), [CareerPilot AI](https://github.com/flyingsaucer1/AI-Career-Assistant), and [WealthSense](https://github.com/flyingsaucer1/WealthSense).

## Run locally

Requires Node.js. No package installation or build step is needed.

```sh
node serve.mjs
```

Open `http://127.0.0.1:4173/`.

## Edit the portfolio

- `dist/portfolio.js` contains the project descriptions, links, and contact details.
- `dist/index.html` contains the page structure and featured project shortcuts.
- `dist/style.css` controls the layout and visual design.
- `dist/ripple.js` draws the interactive painting effect. It respects reduced-motion settings and the on-page pause control.
- `dist/assets/` contains the painting and project visuals.

The KernelGuard and CareerPilot images are project screenshots shown with demonstration content. The WealthSense visual is an illustrative interface preview, not a live market-data screenshot. Its research signals are experimental and its paper trading never places real orders.
