import ParcelChartDashboard from "@/components/modules/Admin/ParcelChartDeshboard";
import { setLoading } from "@/redux/features/loadingSlice";
import { useGetParcelStatsQuery } from "@/redux/features/stats/stats.api";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";

const Analytics = () => {
  const { data, isLoading } = useGetParcelStatsQuery(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  console.log(data);

  return (
    <div>
      <div>
        <div className="relative overflow-hidden rounded-xl bg-muted py-14 px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-between gap-5 text-center">
            <div className="flex flex-col gap-4">
              <p>Total Parcels</p>
              <span className="text-4xl font-semibold md:text-5xl">
                {data?.totalParcel}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <p>Delivered</p>
              <span className="text-4xl font-semibold md:text-5xl">
                {data?.totalParcelByStatus?.Delivered || 0}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <p>In Transit</p>
              <span className="text-4xl font-semibold md:text-5xl">
                {(data?.totalParcelByStatus?.Confirm || 0) +
                  (data?.totalParcelByStatus?.Picked || 0) +
                  (data?.totalParcelByStatus?.InTransit || 0)}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <p>Pending</p>
              <span className="text-4xl font-semibold md:text-5xl">
                {data?.totalParcelByStatus?.Pending || 0}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <p>Cancelled</p>
              <span className="text-4xl font-semibold md:text-5xl">
                {data?.totalParcelByStatus?.Cancelled || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10">
        <ParcelChartDashboard />
      </div>
    </div>
  );
};

export default Analytics;
