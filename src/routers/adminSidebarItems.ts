import AllParcels from "@/pages/Admin/AllParcels";
import AllUsers from "@/pages/Admin/AllUsers";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
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
