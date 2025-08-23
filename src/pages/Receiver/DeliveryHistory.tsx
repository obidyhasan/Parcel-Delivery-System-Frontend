/* eslint-disable @typescript-eslint/no-explicit-any */
import ParcelDeliveryCard from "@/components/modules/Receiver/ParcelDeliveryCard";
import { setLoading } from "@/redux/features/loadingSlice";
import { useGetDeliveryParcelQuery } from "@/redux/features/Parcel/parcel.api";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";

const DeliveryHistory = () => {
  const { data: parcels = [], isLoading } =
    useGetDeliveryParcelQuery(undefined);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div>
      <div>
        <h1 className="text-lg font-bold mb-4">Delivery History</h1>
      </div>
      <div className="flex flex-col gap-4">
        {parcels?.map((parcel: any) => (
          <ParcelDeliveryCard parcel={parcel} />
        ))}
      </div>
    </div>
  );
};

export default DeliveryHistory;
