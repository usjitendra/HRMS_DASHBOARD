import { lazy } from "react";
import { Navigate } from "react-router-dom"; // Import Navigate
import Loadable from "components/Loadable";
import DashboardLayout from "layout/Dashboard";
import Employee from "../pages/Employee/Employee";
import EmployeeAdd from "../pages/Employee/EmployeeAdd.jsx";
import EmployeeList from "../pages/Employee/EmployeeList.jsx";
import ProtectedRoute from "../auth/ProtectedRoute.jsx";

// Lazy loaded components
const DashboardDefault = Loadable(lazy(() => import("pages/dashboard/default")));
const Color = Loadable(lazy(() => import("pages/component-overview/color")));
const Typography = Loadable(lazy(() => import("pages/component-overview/typography")));
const Shadow = Loadable(lazy(() => import("pages/component-overview/shadows")));
const SamplePage = Loadable(lazy(() => import("pages/extra-pages/sample-page")));

const MainRoutes = {
  path: "/",
  element: <DashboardLayout />,
  children: [
    {
      path: "/",
      element: <Navigate to="/dashboard/default" replace />,
    },
    {
      path: "dashboard",
      element: <ProtectedRoute />, // ✅ Protecting Dashboard Routes
      children: [
        {
          path: "default",
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: "employee",
      element: <ProtectedRoute />, // ✅ Protecting Employee Routes
      children: [
        { path: "", element: <Employee /> },
        { path: "list", element: <EmployeeList /> },
        { path: "add", element: <EmployeeAdd /> },
      ],
    },
    {
      path: "typography",
      element: <ProtectedRoute />, // ✅ Protecting Typography Page
      children: [{ path: "", element: <Typography /> }],
    },
    {
      path: "color",
      element: <ProtectedRoute />, // ✅ Protecting Color Page
      children: [{ path: "", element: <Color /> }],
    },
    {
      path: "shadow",
      element: <ProtectedRoute />, // ✅ Protecting Shadow Page
      children: [{ path: "", element: <Shadow /> }],
    },
    {
      path: "sample-page",
      element: <ProtectedRoute />, // ✅ Protecting Sample Page
      children: [{ path: "", element: <SamplePage /> }],
    },
  ],
};

export default MainRoutes;
