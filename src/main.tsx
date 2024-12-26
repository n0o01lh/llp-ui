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
import Forbidden from "./components/Forbidden.tsx";
import { ROLES } from "./components/Shared/Constants.tsx";
import TopMenu from "./components/Shared/TopMenu.tsx";
import ResourcesForm from "./components/Resources/ResourcesForm.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
    path: "/home",
    element: <TopMenu />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoutes protectedRole={ROLES.TEACHER} />,
    children: [
      {
        path: "/dashboard",
        element: <App />,
        children: [
          { path: "sales", index: true, element: <Sales /> },
          {
            path: "resources",
            element: <Resources />,
          },
          {
            path: "resources/new",
            element: <ResourcesForm />,
          },
          {
            path: "resources/edit/:id",
            element: <ResourcesEditForm />,
          },
          { path: "courses", element: <Courses /> },
          { path: "courses/edit/:id", element: <CoursesEditForm /> },
        ],
      },
    ],
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "/forbidden",
    element: <Forbidden />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={router} />
    </DndProvider>
  </QueryClientProvider>
);
