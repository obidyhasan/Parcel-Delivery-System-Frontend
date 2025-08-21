import DeliveryHistory from "@/pages/Receiver/DeliveryHistory";
import IncomingParcels from "@/pages/Receiver/IncomingParcels";
import type { ISidebarItem } from "@/types";

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
