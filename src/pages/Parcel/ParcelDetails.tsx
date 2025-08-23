import ParcelDeliveryCard from "@/components/modules/Receiver/ParcelDeliveryCard";
import { setLoading } from "@/redux/features/loadingSlice";
import { useParcelTrackQuery } from "@/redux/features/Parcel/parcel.api";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";
import { useParams } from "react-router";

const ParcelDetails = () => {
  const { trackingId } = useParams();

  const { data: parcel = {}, isLoading } = useParcelTrackQuery(trackingId);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div>
      <ParcelDeliveryCard parcel={parcel} />
      <div className="border my-4 p-4 rounded-sm">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <p className="text-muted-foreground">
            Type: <span className="text-foreground">{parcel?.type}</span>
          </p>
          <p className="text-muted-foreground">
            Weight: <span className="text-foreground">{parcel?.weight}</span>
          </p>
          <p className="text-muted-foreground">
            Fee: <span className="text-foreground">{parcel?.fee}</span>
          </p>
          <p className="text-muted-foreground">
            Pickup Address:{" "}
            <span className="text-foreground">{parcel?.pickupAddress}</span>
          </p>
          <p className="text-muted-foreground">
            Delivery Address:{" "}
            <span className="text-foreground">{parcel?.deliveryAddress}</span>
          </p>
          <p className="text-muted-foreground">
            Sender Name:{" "}
            <span className="text-foreground">{parcel?.senderId?.name}</span>
          </p>
          <p className="text-muted-foreground">
            Sender Email:{" "}
            <span className="text-foreground">{parcel?.senderId?.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetails;
