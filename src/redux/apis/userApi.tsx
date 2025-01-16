// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TaskInterface } from "../commonInterfaces";

// Check User Authentication
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    prepareHeaders: (headers, {}) => {
      // Add a token to the headers
      const token = localStorage.getItem("user.sid"); // Adjust based on your state
      if (token) {
        headers.set("user.sid", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Home"],
  endpoints: (builder) => ({
    checkUserAuth: builder.query<
      { status: number; data: { name: string; email: string } },
      void
    >({
      query: () => ({
        url: `/entity/user/auth`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    fetchHomePageData: builder.query<
      {
        status: number;
        data: {
          inProgressTasks: TaskInterface[];
          lateTasks: TaskInterface[];
          completedTasks: TaskInterface[];
          countOfCompletedTasks: number;
          countOfIncompleteTasks: number;
        };
      },
      { currentTab: string }
    >({
      query: ({ currentTab }) => ({
        url: `/entity/user/home${
          currentTab === "all" ? `` : `?tag=${currentTab}`
        }`,
        credentials: "include",
      }),
      providesTags: ["Home"],
    }),
    registerUser: builder.mutation<
      { status: boolean; message: string },
      Partial<{ name: string; email: string; password: string }>
    >({
      // Define a POST endpoint
      query: (newUser) => ({
        url: "/entity/user/register",
        method: "POST",
        body: newUser,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation<
      { status: boolean; message: string },
      Partial<{ email: string; password: string }>
    >({
      // Define a POST endpoint
      query: (userCredentials) => ({
        url: "/entity/user/login",
        method: "POST",
        body: userCredentials,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation<{ status: boolean; message: string }, void>({
      // Define a POST endpoint
      query: () => ({
        url: "/entity/user/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useCheckUserAuthQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useFetchHomePageDataQuery,
  useLogoutUserMutation,
} = userApi;
