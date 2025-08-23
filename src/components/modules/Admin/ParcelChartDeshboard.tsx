import { useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetParcelStatsQuery } from "@/redux/features/stats/stats.api";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";

const COLORS = ["#4f46e5", "#22c55e", "#f97316", "#ef4444"];

export default function ParcelDashboard() {
  const { data: stats, isLoading } = useGetParcelStatsQuery(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const pieData = useMemo(() => {
    if (!stats?.totalParcelByStatus) return [];
    return Object.entries(stats?.totalParcelByStatus).map(([name, value]) => ({
      name,
      value,
    }));
  }, [stats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="rounded-md shadow-none">
        <CardHeader>
          <CardTitle>Monthly Parcel Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.monthlyParcels || []}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill={COLORS[0]} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Delivery Status Distribution */}
      <Card className="rounded-md shadow-none">
        <CardHeader>
          <CardTitle>Delivery Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
