import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const DeliveryHistory = lazy(() => import("@/pages/Receiver/DeliveryHistory"));
const IncomingParcels = lazy(() => import("@/pages/Receiver/IncomingParcels"));

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Incoming Parcel",
        url: "/receiver/incoming-parcel",
        component: IncomingParcels,
      },
      {
        title: "Delivery History",
        url: "/receiver/delivery-history",
        component: DeliveryHistory,
      },
    ],
  },
];
