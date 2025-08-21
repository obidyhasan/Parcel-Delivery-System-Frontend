import { useGetMeQuery } from "@/redux/features/User/user.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthRapper() {
    const { data, isLoading } = useGetMeQuery(undefined);

    console.log(data);

    if (!isLoading && !data?.email) {
      return <Navigate to={"/login"} />;
    }

    if (requiredRole && !isLoading && requiredRole !== data?.role) {
      return <Navigate to={"/unauthorized"} />;
    }

    return <Component />;
  };
};
