import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routers/adminSidebarItems";
import { receiverSidebarItems } from "@/routers/receiverSiderbarItems";
import { senderSidebarItems } from "@/routers/senderSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItem = (userRole: TRole) => {
  switch (userRole) {
    case role.ADMIN:
      return [...adminSidebarItems];
    case role.RECEIVER:
      return [...receiverSidebarItems];
    case role.SENDER:
      return [...senderSidebarItems];
    default:
      return [];
  }
};
