import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    parcelRequest: builder.mutation({
      query: (parcelInfo) => ({
        url: "/parcel/request",
        method: "POST",
        data: parcelInfo,
      }),
      invalidatesTags: ["PARCEL"],
    }),
    getParcelRequest: builder.query({
      query: () => ({
        url: "/parcel/me",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
      transformResponse: (response) => response.data,
    }),
    updateParcel: builder.mutation({
      query: ({ parcelInfo, id }) => ({
        url: `/parcel/${id}`,
        method: "PATCH",
        data: parcelInfo,
      }),
      invalidatesTags: ["PARCEL"],
    }),
    parcelCancel: builder.mutation({
      query: (id) => ({
        url: `/parcel/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),
    parcelTrack: builder.query({
      query: (trackingId) => ({
        url: `/parcel/track/${trackingId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    inComingParcel: builder.query({
      query: () => ({
        url: `/parcel/incoming`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
      transformResponse: (response) => response.data,
    }),
    confirmParcel: builder.mutation({
      query: (id) => ({
        url: `/parcel/${id}/confirm`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),
    getDeliveryParcel: builder.query({
      query: () => ({
        url: `/parcel/delivery`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
      transformResponse: (response) => response.data,
    }),
    setParcelDeliveryRequest: builder.mutation({
      query: (id) => ({
        url: `/parcel/${id}/delivered`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),
    getAllParcel: builder.query({
      query: () => ({
        url: `/parcel`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
      transformResponse: (response) => response.data,
    }),
    updateParcelRequestByAdmin: builder.mutation({
      query: ({ parcelInfo, id }) => ({
        url: `/parcel/update/${id}`,
        method: "PATCH",
        data: parcelInfo,
      }),
      invalidatesTags: ["PARCEL"],
    }),
    deleteParcelRequestByAdmin: builder.mutation({
      query: ({ parcelInfo, id }) => ({
        url: `/parcel/delete/${id}`,
        method: "DELETe",
        data: parcelInfo,
      }),
      invalidatesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useParcelRequestMutation,
  useGetParcelRequestQuery,
  useUpdateParcelMutation,
  useParcelCancelMutation,
  useParcelTrackQuery,
  useInComingParcelQuery,
  useConfirmParcelMutation,
  useGetDeliveryParcelQuery,
  useSetParcelDeliveryRequestMutation,
  useGetAllParcelQuery,
  useUpdateParcelRequestByAdminMutation,
  useDeleteParcelRequestByAdminMutation,
} = parcelApi;
