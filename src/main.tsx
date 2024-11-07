import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Resources from "./components/Resources/Resources.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Courses from "./components/Courses/Courses.tsx";
import ResourcesEditForm from "./components/Resources/ResourcesEditForm.tsx";
import CoursesEditForm from "./components/Courses/CoursesEditForm.tsx";
import Sales from "./components/Sales/Sales.tsx";
import Auth from "./components/User/Auth.tsx";
import RegisterSuccess from "./components/User/RegisterSuccess.tsx";

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
      { path: "/sales", element: <Sales /> },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/auth/register/:email",
    element: <RegisterSuccess />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
