import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UploadResponse {
  name: string;
}

export const uploadApiFile = createApi({
  reducerPath: "uploadApiFile",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.escuelajs.co/api/v1/files`,
  }),
  tagTypes: ["Files"],
  endpoints: (builder) => ({
  uploadFiles: builder.mutation<UploadResponse, File>({
  query: (file) => {
    const formData = new FormData();
   formData.append("file", file);
    return {
      url: '/upload',
      method: "POST",
      body: formData,
    };
  },
}),
  }),
});

export const { useUploadFilesMutation } = uploadApiFile;