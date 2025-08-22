import AllUsers from "@/pages/Admin/AllUsers";
import AllParcel from "@/pages/Sender/AllParcel";
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
        component: AllParcel,
      },
    ],
  },
];
