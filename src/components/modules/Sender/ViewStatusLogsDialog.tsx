/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { setLoading } from "@/redux/features/loadingSlice";
import { useParcelTrackQuery } from "@/redux/features/Parcel/parcel.api";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";
import ParcelDeliveryCard from "../Receiver/ParcelDeliveryCard";

export function ViewStatusLogsDialog({
  openDialog,
  setOpenDialog,
  trackingId,
}: any) {
  const { data: parcel, isLoading } = useParcelTrackQuery(trackingId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  console.log(parcel);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <div>
        <DialogContent className="max-h-[90%] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle>Status Logs</DialogTitle>
            <DialogDescription>
              View your parcel request status logs
            </DialogDescription>
          </DialogHeader>
          <div>
            <ParcelDeliveryCard parcel={parcel} />
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}
