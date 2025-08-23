/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
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
import { setLoading } from "@/redux/features/loadingSlice";
import {
  parcelApi,
  useGetParcelRequestQuery,
  useParcelCancelMutation,
  useUpdateParcelMutation,
} from "@/redux/features/Parcel/parcel.api";
import { useAppDispatch } from "@/redux/hook";
import { useEffect, useState } from "react";
import StatusUpdateAlertDialog from "./StatusUpdateAlertDialog";
import { toast } from "sonner";
import { ViewStatusLogsDialog } from "./ViewStatuslogsDialog";

export function AllParcelTable() {
  const { data: parcels = [], isLoading } = useGetParcelRequestQuery(undefined);
  const [updateParcel] = useUpdateParcelMutation();
  const [parcelCancel] = useParcelCancelMutation();

  const [openDeleteDialog, setDeleteOpenDialog] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  const [openViewStatusDialog, setOpenViewStatusDialog] = useState(false);
  const [selectedTrackingId, setSelectedTrackingId] = useState<string | null>(
    null
  );

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
      const res = await updateParcel({
        parcelInfo: { currentStatus: value },
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

  const handleParcelDelete = async () => {
    const toastId = toast.loading("Parcel canceling...");
    try {
      const res = await parcelCancel(selectedDeleteId).unwrap();
      if (res.success) {
        toast.success("Parcel cancel successfully", { id: toastId });
        dispatch(parcelApi.util.resetApiState());
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
        <h1
          className="text-lg font-bold mb-4
        "
        >
          Parcels
        </h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Tracking Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Receiver</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parcels?.map((parcel: any) => (
            <TableRow key={parcel?._id}>
              <TableCell className="font-medium">{parcel?.title}</TableCell>
              <TableCell>{parcel?.fee}</TableCell>
              <TableCell>{parcel?.weight}</TableCell>
              <TableCell>{parcel?.type}</TableCell>
              <TableCell>{parcel?.trackingId}</TableCell>
              <TableCell>
                <Select
                  defaultValue={parcel?.currentStatus}
                  onValueChange={(value) => {
                    setSelectedValue(value);
                    setSelectedId(parcel?._id || null);
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
              <TableCell className="font-medium">
                <div>
                  <p className="font-medium">{parcel?.receiverId?.name}</p>
                  <span className="text-xs text-foreground/60">
                    {parcel?.receiverId?.email}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-right flex gap-2 justify-end">
                <Button
                  onClick={() => {
                    setSelectedTrackingId(parcel?.trackingId);
                    setOpenViewStatusDialog(true);
                  }}
                  variant={"outline"}
                  size={"sm"}
                >
                  Status Logs
                </Button>
                <Button
                  disabled={parcel?.currentStatus === "Cancelled"}
                  onClick={() => {
                    setSelectedDeleteId(parcel?._id);
                    setDeleteOpenDialog(true);
                  }}
                  size={"sm"}
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Logout confirm dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setDeleteOpenDialog}>
        <AlertDialogContent className="w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Cancel</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this parcel?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleParcelDelete();
                setOpenDialog(false);
              }}
            >
              Yes, Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <StatusUpdateAlertDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedValue={selectedValue}
        selectedId={selectedId}
        onConfirm={handleStatusUpdate}
        title={"Confirm Status Update"}
      />
      <ViewStatusLogsDialog
        openDialog={openViewStatusDialog}
        setOpenDialog={setOpenViewStatusDialog}
        trackingId={selectedTrackingId}
      />
    </>
  );
}
