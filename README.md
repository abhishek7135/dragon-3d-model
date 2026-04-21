# Dragon 3D Scroll Showcase

A cinematic React + Three.js landing page that presents a 3D dragon model across three full-screen sections. As the page scrolls, the dragon rotates smoothly from left to right to create a simple storytelling effect.

## Live Demo

[View the live site](https://abhishek7135.github.io/dragon-3d-model/)

## Preview

### Desktop

![Desktop preview](docs/screenshots/desktop-showcase.png)

### Responsive Narrow Screen

![Responsive narrow-screen preview](docs/screenshots/mobile-showcase.png)

## Features

- Scroll-driven 3D dragon rotation
- Three full-screen content sections
- React + Vite setup for fast local development
- Responsive scene framing for desktop, tablet, and mobile screens
- GitHub Pages-friendly build output through the `docs/` folder

## Tech Stack

- React
- Vite
- Three.js
- @react-three/fiber
- @react-three/drei

## Project Structure

```text
.
|- docs/                # GitHub Pages output
|- public/models/       # Source 3D asset used by the app
|- src/
|  |- App.jsx           # Scroll logic, scene setup, and sections
|  |- main.jsx          # React entry point
|  `- styles.css        # Layout and responsive styling
|- package.json
`- vite.config.js
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Create a production build

```bash
npm run build
```

The production-ready GitHub Pages files are generated in the `docs/` folder.

## GitHub Pages Deployment

This project is configured for the simplest GitHub Pages setup:

1. Build the app with `npm run build`.
2. Commit the updated `docs/` folder.
3. Push to the `main` branch.
4. In GitHub repository settings, go to `Pages`.
5. Set `Source` to `Deploy from a branch`.
6. Select `main` and the `/docs` folder.

## Customization

- Replace the dragon model in `public/models/dragon.glb`.
- Edit the section content in `src/App.jsx`.
- Adjust layout, colors, and responsive styling in `src/styles.css`.
- Tune deployment output and base path in `vite.config.js`.

## License

This project is available for personal and portfolio use.

## Screenshots

<img width="1899" height="862" alt="image" src="https://github.com/user-attachments/assets/787ad419-84a8-4308-9c6b-edeac77e8a6d" />
<img width="1897" height="861" alt="image" src="https://github.com/user-attachments/assets/573c3cde-3dba-46b7-9e0f-2ccb36d5c112" />
<img width="1902" height="866" alt="image" src="https://github.com/user-attachments/assets/6c7ebd1f-d9c7-435c-b405-45c4527f5803" />
