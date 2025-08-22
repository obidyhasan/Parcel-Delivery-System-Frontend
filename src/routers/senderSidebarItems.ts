import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AllParcel = lazy(() => import("@/pages/Sender/AllParcel"));
const CreateParcel = lazy(() => import("@/pages/Sender/CreateParcel"));

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Parcels",
        url: "/sender/parcels",
        component: AllParcel,
      },
      {
        title: "Create Parcel",
        url: "/sender/parcel-create",
        component: CreateParcel,
      },
    ],
  },
];
