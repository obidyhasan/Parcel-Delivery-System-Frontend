import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/About/About";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";
import ParcelTrack from "@/pages/ParcelTrack/ParcelTrack";
import Unauthorized from "@/pages/Unauthorized/Unauthorized";
import type { TRole } from "@/types";
import { generateRouters } from "@/utils/generateRouters";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { receiverSidebarItems } from "./receiverSiderbarItems";

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
