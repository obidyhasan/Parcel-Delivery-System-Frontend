import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { generateRouters } from "@/utils/generateRouters";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { receiverSidebarItems } from "./receiverSiderbarItems";
import { lazy } from "react";

const App = lazy(() => import("@/App"));
const Home = lazy(() => import("@/pages/Home/Home"));
const About = lazy(() => import("@/pages/About/About"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const Contact = lazy(() => import("@/pages/Contact/Contact"));
const ParcelTrack = lazy(() => import("@/pages/ParcelTrack/ParcelTrack"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized/Unauthorized"));
const DashboardLayout = lazy(
  () => import("@/components/layouts/DashboardLayout")
);

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        path: "/",
      },
      {
        Component: About,
        path: "/about",
      },
      {
        Component: Contact,
        path: "/contact",
      },
      {
        Component: ParcelTrack,
        path: "/track",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    path: "/admin",
    children: [
      {
        index: true,
        element: <Navigate to={"/admin/users"} />,
      },
      ...generateRouters(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.SENDER as TRole),
    path: "/sender",
    children: [
      {
        index: true,
        element: <Navigate to={"/sender/parcels"} />,
      },
      ...generateRouters(senderSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.RECEIVER as TRole),
    path: "/receiver",
    children: [
      {
        index: true,
        element: <Navigate to={"/receiver/incoming-parcel"} />,
      },
      ...generateRouters(receiverSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
