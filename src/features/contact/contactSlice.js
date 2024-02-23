import { apiSlice } from "../api/apiSlice";

export const contactSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllContacts: builder.mutation({
            query: ({ search="", page = 1, dataPerPage = 20 }) => `/contacts?search=${search}&page=${page}&page_size=${dataPerPage}`,
        }),
        getUsContacts: builder.mutation({
            query: ({ search="", page = 1, dataPerPage = 20, country = "United States" }) => `/country-contacts/${country}?search=${search}&page=${page}&page_size=${dataPerPage}`,
        }),
    })
})

export const {
    useGetAllContactsMutation,
    useGetUsContactsMutation,
} = contactSlice