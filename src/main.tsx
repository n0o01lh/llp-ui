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
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import NotFound from "./components/NotFound.tsx";
import RootRedirection from "./RootRedirection.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirection />,
    children: [
      {
        index: true,
        element: <Auth />,
      },
      {
        path: "auth/register/:email",
        element: <RegisterSuccess />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <App />,
        children: [
          {
            path: "resources",
            index: true,
            element: <Resources />,
          },
          {
            path: "resources/edit/:id",
            element: <ResourcesEditForm />,
          },
          { path: "courses", element: <Courses /> },
          { path: "courses/edit/:id", element: <CoursesEditForm /> },
          { path: "sales", element: <Sales /> },
        ],
      },
    ],
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
