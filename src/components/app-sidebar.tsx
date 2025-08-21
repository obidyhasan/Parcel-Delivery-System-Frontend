import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetMeQuery } from "@/redux/features/User/user.api";
import { getSidebarItem } from "@/utils/getSidebarItems";
import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetMeQuery(undefined);

  const data = {
    navMain: getSidebarItem(userData?.role),
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="m-2">
        <Link to="/">
          <div className="flex gap-2 items-center">
            <Logo />
            <h1 className="text-2xl font-bold ">
              Deliver
              <span className="text-primary hover:text-primary/90">X</span>
            </h1>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {item.items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className="bg-muted rounded-md p-1 font-medium border"
                  >
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
