import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import { logout } from "../features/authSlice";



const rawBaseQuery = fetchBaseQuery({
    baseUrl: (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL : "") || "http://localhost:5000",
    credentials: "include"
});


const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, apiInstance, extraOptions) => {
    const result = await rawBaseQuery(args, apiInstance, extraOptions)
    const isMutation = typeof args === "object" && args.method && args.method !== "GET";
    if (result.data && typeof result.data === "object" && "success" in (result.data as any)) {
        const res = result.data as any;
        if (res.success) {
            if (isMutation && res.message) {
                toast.success(res.message)
            }
        } else {
            if (res.message) {
                toast.error(res.message)
            }
        }
    } else if (result.error) {
        const errMSG = (result.error.data as any)?.message || (result.error as any).message || "something went wrong";
        toast.error(errMSG)
        if (result.error.status === 401) {
            apiInstance.dispatch(logout())
        }
    }
    return result
}
export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['admin', "blogs", "singleBlog", 'categories', "singleCategory", 'contact', 'singleContact', 'faqs', 'singleFaq', 'project', 'singleProject', 'services', 'singleServices', 'skills', 'singleSkill', 'testimonials', 'singleTestimonials','theme'],
    endpoints: () => ({}),
});