import AllParcel from "@/pages/Sender/AllParcel";
import CreateParcel from "@/pages/Sender/CreateParcel";
import type { ISidebarItem } from "@/types";

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
