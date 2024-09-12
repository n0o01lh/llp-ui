import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Resources from "./components/Resources.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/resources", element: <Resources /> },
      { path: "/courses", element: <h1>COURSES</h1> },
      { path: "/sales", element: <h1>SALES</h1> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
