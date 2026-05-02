import { apiSlice } from "../api/apiSlice";

export const aiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    summarize: builder.mutation({
      query: (body) => ({ url: "/ai/summarize", method: "POST", body }),
      invalidatesTags: ["History"],
    }),
    generateQuestions: builder.mutation({
      query: (body) => ({ url: "/ai/questions", method: "POST", body }),
      invalidatesTags: ["History"],
    }),
    getHistory: builder.query({
      query: () => "/history",
      providesTags: ["History"],
    }),
    deleteHistory: builder.mutation({
      query: (id) => ({ url: `/history/${id}`, method: "DELETE" }),
      invalidatesTags: ["History"],
    }),
  }),
});

export const {
  useSummarizeMutation,
  useGenerateQuestionsMutation,
  useGetHistoryQuery,
  useDeleteHistoryMutation,
} = aiApiSlice;