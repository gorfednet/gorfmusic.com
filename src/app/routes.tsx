import { Navigate, createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ContactPage } from "./pages/ContactPage";
import { CollaborationsPage } from "./pages/CollaborationsPage";
import { HomePage } from "./pages/HomePage";
import { LivePage } from "./pages/LivePage";
import { MusicPage } from "./pages/MusicPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ServicesPage } from "./pages/ServicesPage";

/**
 * Browser-side routes for the static-exported SPA. Each section has a real `*.html` shell
 * in `dist/` (see `*.vite.template.html`) plus clean URLs via nginx fallback.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "index.html", Component: () => <Navigate to="/" replace /> },
      { path: "listen", Component: MusicPage },
      { path: "listen.html", Component: () => <Navigate to="/listen" replace /> },
      { path: "music", Component: () => <Navigate to="/listen" replace /> },
      { path: "music.html", Component: () => <Navigate to="/listen" replace /> },
      { path: "live", Component: LivePage },
      { path: "live.html", Component: () => <Navigate to="/live" replace /> },
      { path: "collaborations", Component: CollaborationsPage },
      { path: "collaborations.html", Component: () => <Navigate to="/collaborations" replace /> },
      { path: "services", Component: ServicesPage },
      { path: "services.html", Component: () => <Navigate to="/services" replace /> },
      { path: "contact", Component: ContactPage },
      { path: "contact.html", Component: () => <Navigate to="/contact" replace /> },
      { path: "*", id: "not-found", Component: NotFoundPage },
    ],
  },
]);
