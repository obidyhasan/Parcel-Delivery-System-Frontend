import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    parcelRequest: builder.mutation({
      query: (parcelInfo) => ({
        url: "/parcel/create",
        method: "POST",
        data: parcelInfo,
      }),
    }),
    getParcelRequest: builder.query({
      query: () => ({
        url: "/parcel/me",
        method: "GET",
      }),
    }),
    updateParcel: builder.mutation({
      query: ({ parcelInfo, id }) => ({
        url: `/parcel/${id}`,
        method: "PATCH",
        data: parcelInfo,
      }),
    }),
    parcelCancel: builder.mutation({
      query: (id) => ({
        url: `/parcel/${id}/cancel`,
        method: "PATCH",
      }),
    }),
    parcelTrack: builder.query({
      query: (trackingId) => ({
        url: `/parcel/track/${trackingId}`,
        method: "GET",
      }),
    }),
    inComingParcel: builder.query({
      query: () => ({
        url: `/parcel/incoming`,
        method: "GET",
      }),
    }),
    confirmParcel: builder.mutation({
      query: (id) => ({
        url: `/parcel/${id}/confirm`,
        method: "PATCH",
      }),
    }),
    getDeliveryParcel: builder.query({
      query: () => ({
        url: `/parcel/delivery`,
        method: "GET",
      }),
    }),
    setParcelDeliveryRequest: builder.mutation({
      query: (id) => ({
        url: `/parcel/${id}/delivered`,
        method: "PATCH",
      }),
    }),
    getAllParcel: builder.query({
      query: () => ({
        url: `/parcel`,
        method: "GET",
      }),
    }),
    updateParcelRequestByAdmin: builder.mutation({
      query: ({ parcelInfo, id }) => ({
        url: `/parcel/update/${id}`,
        method: "PATCH",
        data: parcelInfo,
      }),
    }),
    deleteParcelRequestByAdmin: builder.mutation({
      query: ({ parcelInfo, id }) => ({
        url: `/parcel/delete/${id}`,
        method: "DELETe",
        data: parcelInfo,
      }),
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
