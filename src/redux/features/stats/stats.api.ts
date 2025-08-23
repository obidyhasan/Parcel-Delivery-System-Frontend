import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParcelStats: builder.query({
      query: () => ({
        url: "/stats/parcel",
        method: "GET",
      }),
      providesTags: ["USER"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetParcelStatsQuery } = statsApi;
