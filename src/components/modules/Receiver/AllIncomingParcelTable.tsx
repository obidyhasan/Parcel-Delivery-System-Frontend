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

import { setLoading } from "@/redux/features/loadingSlice";
import {
  parcelApi,
  useConfirmParcelMutation,
  useInComingParcelQuery,
  useSetParcelDeliveryRequestMutation,
} from "@/redux/features/Parcel/parcel.api";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export function AllIncomingParcelTable() {
  const { data: parcels = [], isLoading } = useInComingParcelQuery(undefined);
  const [confirmParcel] = useConfirmParcelMutation();
  const [setParcelDeliveryRequest] = useSetParcelDeliveryRequestMutation();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const handleParcelConfirm = async (id: string) => {
    const toastId = toast.loading("Parcel confirming...");
    try {
      const res = await confirmParcel(id).unwrap();
      if (res.success) {
        toast.success("Parcel confirm successfully", { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message || error.data || "Something went wrong", {
        id: toastId,
      });
    } finally {
      dispatch(parcelApi.util.resetApiState());
    }
  };

  const handleParcelDelivered = async (id: string) => {
    const toastId = toast.loading("Parcel Delivery confirming...");
    try {
      const res = await setParcelDeliveryRequest(id).unwrap();
      if (res.success) {
        toast.success("Parcel delivery confirm successfully", { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message || error.data || "Something went wrong", {
        id: toastId,
      });
    } finally {
      dispatch(parcelApi.util.resetApiState());
    }
  };

  return (
    <>
      <div>
        <h1 className="text-lg font-bold mb-4">All Incoming Parcels</h1>
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
            <TableHead>Sender</TableHead>

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
                <Badge>{parcel?.currentStatus}</Badge>
              </TableCell>
              <TableCell className="font-medium">
                <div>
                  <p className="font-medium">{parcel?.senderId?.name}</p>
                  <span className="text-xs text-foreground/60">
                    {parcel?.senderId?.email}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-right flex flex-wrap gap-2 justify-end">
                {parcel?.currentStatus === "Pending" && (
                  <Button onClick={() => handleParcelConfirm(parcel?._id)}>
                    Confirm
                  </Button>
                )}
                {parcel?.currentStatus !== "Pending" &&
                  parcel?.currentStatus !== "Canceled" &&
                  parcel?.currentStatus !== "Delivered" && (
                    <Button
                      onClick={() => handleParcelDelivered(parcel?._id)}
                      disabled={parcel?.currentStatus !== "In Transit"}
                    >
                      Delivered
                    </Button>
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
