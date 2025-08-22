/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect, useState } from "react";

import {
  useGetAllUsersQuery,
  useUserUpdateMutation,
} from "@/redux/features/User/user.api";
import StatusUpdateAlertDialog from "../Sender/StatusUpdateAlertDialog";
import { toast } from "sonner";

export function AllUsersTable() {
  const { data: users = [], isLoading } = useGetAllUsersQuery(undefined);
  const [userUpdate] = useUserUpdateMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const handleStatusUpdate = async (value: string, id: string) => {
    const toastId = toast.loading("Updating status...");
    try {
      const res = await userUpdate({
        userInfo: { status: value },
        id,
      }).unwrap();
      if (res.success) {
        toast.success("Status updated successfully", { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message || error.data || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-lg font-bold mb-4">Users</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: any) => (
            <TableRow key={user?._id}>
              <TableCell className="font-medium">{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>
                <Select
                  defaultValue={user?.status}
                  onValueChange={(value) => {
                    setSelectedValue(value);
                    setSelectedId(user?._id || null);
                    setOpenDialog(true);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="BLOCKED">Blocked</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell className="text-right flex flex-wrap gap-2 justify-end">
                {format(new Date(user?.createdAt), "MMMM dd, yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <StatusUpdateAlertDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedValue={selectedValue}
        selectedId={selectedId}
        onConfirm={handleStatusUpdate}
        title={"Confirm Status Update"}
      />
    </>
  );
}
