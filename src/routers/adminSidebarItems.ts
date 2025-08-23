import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const AllParcels = lazy(() => import("@/pages/Admin/AllParcels"));
const AllUsers = lazy(() => import("@/pages/Admin/AllUsers"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "Users",
        url: "/admin/users",
        component: AllUsers,
      },
      {
        title: "Parcels",
        url: "/admin/parcels",
        component: AllParcels,
      },
    ],
  },
];
