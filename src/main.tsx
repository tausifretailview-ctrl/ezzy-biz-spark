import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;

// Prerendered pages (see vite.config.ts) arrive with their HTML already in #root. Hydrating it keeps
// that HTML on screen instead of painting the page a second time; other routes start empty.
if (root.dataset.prerendered && root.firstChild) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
