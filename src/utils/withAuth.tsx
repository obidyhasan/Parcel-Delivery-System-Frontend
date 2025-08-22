import { setLoading } from "@/redux/features/loadingSlice";
import { useGetMeQuery } from "@/redux/features/User/user.api";
import { useAppDispatch } from "@/redux/hook";
import type { TRole } from "@/types";
import { useEffect, type ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetMeQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);

    if (!data?.email) return <Navigate to={"/login"} />;

    if (requiredRole && requiredRole !== data?.role) {
      return <Navigate to={"/unauthorized"} />;
    }

    return <Component />;
  };
};
