/* eslint-disable @typescript-eslint/no-explicit-any */
import { LayoutDashboard, LogOutIcon, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/redux/hook";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useState } from "react";
import { Link } from "react-router";
import { role } from "@/constants/role";

export default function UserMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  // Decide dashboard route based on role
  const getDashboardLink = () => {
    switch (user?.role) {
      case role.ADMIN:
        return "/admin";
      case role.SENDER:
        return "/sender";
      case role.RECEIVER:
        return "/receiver";
      default:
        return "/";
    }
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={"icon"}
            className="p-0 hover:bg-transparent rounded-full border"
          >
            <UserRound />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64" align="end">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              {user?.name || "User"}
            </span>
            <span className="text-muted-foreground truncate text-xs font-normal">
              {user?.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem asChild onClick={() => setOpen(false)}>
              <Link to={getDashboardLink()} className="flex items-center gap-2">
                <LayoutDashboard size={16} className="opacity-60" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpen(false);
              setOpenDialog(true);
            }}
          >
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logout confirm dialog */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You will need to log in again to
              access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleLogout();
                setOpenDialog(false);
              }}
            >
              Yes, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
