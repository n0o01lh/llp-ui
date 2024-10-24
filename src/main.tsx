import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Resources from "./components/Resources/Resources.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Courses from "./components/Courses/Courses.tsx";
import ResourcesEditForm from "./components/Resources/ResourcesEditForm.tsx";
import CoursesEditForm from "./components/Courses/CoursesEditForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/resources",
        element: <Resources />,
      },
      { path: "/resources/edit/:id", element: <ResourcesEditForm /> },
      { path: "/courses", element: <Courses /> },
      { path: "/courses/edit/:id", element: <CoursesEditForm /> },
      { path: "/sales", element: <h1>SALES</h1> },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
