import { RouterProvider } from "react-router";
import { router } from "./routes";

/**
 * Root component: mounts the client-side router. All pages share Layout (nav, footer, head).
 */
export default function App() {
  return <RouterProvider router={router} />;
}
