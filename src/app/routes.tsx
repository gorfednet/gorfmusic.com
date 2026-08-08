import { Navigate, createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { RouteLoadingFallback } from "./components/RouteLoadingFallback";
import { HomePage } from "./pages/HomePage";

/**
 * Browser-side routes for the static-exported SPA. Each section has a real `*.html` shell
 * in `dist/` (see `*.vite.template.html`) plus clean URLs via nginx fallback.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    HydrateFallback: RouteLoadingFallback,
    children: [
      { index: true, Component: HomePage },
      { path: "index.html", Component: () => <Navigate to="/" replace /> },
      {
        path: "listen",
        lazy: async () => {
          const { MusicPage } = await import("./pages/MusicPage");
          return { Component: MusicPage };
        },
      },
      { path: "listen.html", Component: () => <Navigate to="/listen" replace /> },
      { path: "music", Component: () => <Navigate to="/listen" replace /> },
      { path: "music.html", Component: () => <Navigate to="/listen" replace /> },
      {
        path: "live",
        lazy: async () => {
          const { LivePage } = await import("./pages/LivePage");
          return { Component: LivePage };
        },
      },
      { path: "live.html", Component: () => <Navigate to="/live" replace /> },
      {
        path: "collaborations",
        lazy: async () => {
          const { CollaborationsPage } = await import("./pages/CollaborationsPage");
          return { Component: CollaborationsPage };
        },
      },
      { path: "collaborations.html", Component: () => <Navigate to="/collaborations" replace /> },
      {
        path: "services",
        lazy: async () => {
          const { ServicesPage } = await import("./pages/ServicesPage");
          return { Component: ServicesPage };
        },
      },
      { path: "services.html", Component: () => <Navigate to="/services" replace /> },
      {
        path: "contact",
        lazy: async () => {
          const { ContactPage } = await import("./pages/ContactPage");
          return { Component: ContactPage };
        },
      },
      { path: "contact.html", Component: () => <Navigate to="/contact" replace /> },
      {
        path: "*",
        id: "not-found",
        lazy: async () => {
          const { NotFoundPage } = await import("./pages/NotFoundPage");
          return { Component: NotFoundPage };
        },
      },
    ],
  },
]);
