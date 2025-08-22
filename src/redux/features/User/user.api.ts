import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
      transformResponse: (response) => response.data,
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["USER"],
      transformResponse: (response) => response.data,
    }),
    userUpdate: builder.mutation({
      query: ({ userInfo, id }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
    userDelete: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetAllUsersQuery,
  useUserUpdateMutation,
  useUserDeleteMutation,
} = userApi;
