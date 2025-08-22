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

import { setLoading } from "@/redux/features/loadingSlice";
import {
  useGetAllParcelQuery,
  useUpdateParcelRequestByAdminMutation,
} from "@/redux/features/Parcel/parcel.api";
import { useAppDispatch } from "@/redux/hook";
import { useEffect, useState } from "react";

import StatusUpdateAlertDialog from "../Sender/StatusUpdateAlertDialog";
import { toast } from "sonner";

export function AllParcelsTableAdmin() {
  const { data: parcels = [], isLoading } = useGetAllParcelQuery(undefined);
  const [updateParcelRequestByAdmin] = useUpdateParcelRequestByAdminMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [updateType, setUpdateType] = useState<"status" | "deliveryStatus">(
    "status"
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const handleStatusUpdate = async (value: string, id: string) => {
    const toastId = toast.loading("Updating status...");
    try {
      const res = await updateParcelRequestByAdmin({
        parcelInfo: { status: value },
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
  const handleDeliveryStatusUpdate = async (value: string, id: string) => {
    const toastId = toast.loading("Updating status...");
    try {
      const res = await updateParcelRequestByAdmin({
        parcelInfo: { currentStatus: value },
        id,
      }).unwrap();
      if (res.success) {
        toast.success("Delivery Status updated successfully", { id: toastId });
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
        <h1 className="text-lg font-bold mb-4">Parcels</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tracking Id</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Receiver</TableHead>

            <TableHead className="text-right">Delivery Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parcels?.map((parcel: any) => (
            <TableRow key={parcel?._id}>
              <TableCell className="font-medium">{parcel?.title}</TableCell>
              <TableCell>{parcel?.fee}</TableCell>
              <TableCell>{parcel?.weight}</TableCell>
              <TableCell>{parcel?.type}</TableCell>
              <TableCell>
                <Select
                  defaultValue={parcel?.status}
                  onValueChange={(value) => {
                    setSelectedValue(value);
                    setSelectedId(parcel?._id || null);
                    setUpdateType("status");
                    setOpenDialog(true);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                      <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                      <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{parcel?.trackingId}</TableCell>

              <TableCell className="font-medium">
                <div>
                  <p className="font-medium">{parcel?.senderId?.name}</p>
                  <span className="text-xs text-foreground/60">
                    {parcel?.senderId?.email}
                  </span>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <div>
                  <p className="font-medium">{parcel?.receiverId?.name}</p>
                  <span className="text-xs text-foreground/60">
                    {parcel?.receiverId?.email}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-right flex justify-end">
                <Select
                  defaultValue={parcel?.currentStatus}
                  onValueChange={(value) => {
                    setSelectedValue(value);
                    setSelectedId(parcel?._id || null);
                    setUpdateType("deliveryStatus");
                    setOpenDialog(true);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Confirm">Confirm</SelectItem>
                      <SelectItem value="Picked">Picked</SelectItem>
                      <SelectItem value="In Transit">In Transit</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
        onConfirm={
          updateType === "status"
            ? handleStatusUpdate
            : handleDeliveryStatusUpdate
        }
        title={
          updateType === "status"
            ? "Confirm Status Update"
            : "Confirm Delivery Status Update"
        }
      />
    </>
  );
}
