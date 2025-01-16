// Need to use the React-specific entry point to allow generating React hooks
import { PriorityTypes, StatusTypes } from "@/data/commonTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TaskDetailsInterface, TaskInterface } from "../commonInterfaces";

export const taskApi = createApi({
  reducerPath: "taskApi",
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
  tagTypes: ["FetchTasks", "FetchTaskDetails"],
  endpoints: (builder) => ({
    // create task
    createTask: builder.mutation<
      { status: boolean; message: string },
      Partial<{
        title: string;
        description: string;
        tag: string;
        priority: PriorityTypes;
        startAt: string;
        endAt: string;
        subTasks: {
          title: string;
          status: boolean;
        }[];
      }>
    >({
      // Define a POST endpoint
      query: (payload) => ({
        url: "/metadata/task",
        method: "POST",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["FetchTasks"],
    }),
    // update task
    updateTask: builder.mutation<
      { status: boolean; message: string },
      Partial<{
        todoId: string;
        title?: string;
        description?: string;
        tag?: string;
        priority?: PriorityTypes;
        startAt?: string;
        endAt?: string;
        subTasks?: {
          title: string;
          status: boolean;
        }[];
        status?: StatusTypes;
      }>
    >({
      // Define a PATCH endpoint
      query: (payload) => ({
        url: "/metadata/task",
        method: "PATCH",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["FetchTaskDetails", "FetchTasks"],
    }),
    // update task status
    updateTaskStatus: builder.mutation<
      { status: boolean; message: string },
      Partial<{
        todoId: string;
        status: StatusTypes;
      }>
    >({
      // Define a PATCH endpoint
      query: (payload) => ({
        url: "/metadata/task/status",
        method: "PATCH",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["FetchTaskDetails", "FetchTasks"],
    }),
    // delete task
    deleteTask: builder.mutation<
      { status: boolean; message: string },
      Partial<{
        todoId: string;
      }>
    >({
      // Define a DELETE endpoint
      query: (payload) => ({
        url: "/metadata/task",
        method: "DELETE",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["FetchTasks"],
    }),
    // fetch tasks
    fetchTasks: builder.query<
      {
        status: boolean;
        data: { count: number; hasNext: boolean; data: TaskInterface[] };
      },
      {
        page: number;
        limit: number;
        sortField: string;
        sortValue: "ASC" | "DESC";
        status?: string;
        priority?: string;
        tag?: string;
        searchKey?: string;
      }
    >({
      // Define a GET endpoint
      query: ({
        limit,
        page,
        priority,
        searchKey,
        sortField,
        sortValue,
        status,
        tag,
      }) => ({
        url: `/metadata/task?page=${page}&limit=${limit}&sortField=${sortField}&sortValue=${sortValue}${
          priority ? `&priority=${priority}` : ""
        }${status ? `&status=${status}` : ""}${
          searchKey ? `&searchKey=${searchKey}` : ""
        }${tag && tag !== "all" ? `&tag=${tag}` : ""}`,
        credentials: "include",
      }),
      providesTags: ["FetchTasks"],
    }),
    // fetch task details
    fetchTasksDetails: builder.query<
      {
        status: boolean;
        data: TaskDetailsInterface;
      },
      {
        taskId: string;
      }
    >({
      // Define a GET endpoint
      query: ({ taskId }) => ({
        url: `/metadata/task/details/${taskId}`,
        credentials: "include",
      }),
      providesTags: ["FetchTaskDetails"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateTaskMutation,
  useFetchTasksQuery,
  useFetchTasksDetailsQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
} = taskApi;
