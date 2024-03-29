import { apiSlice } from "./apiSlice";

const USERS_URL = "https://stack-sense-api.vercel.app/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/auth`,
				method: "POST",
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: "POST",
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}`,
				method: "POST",
				body: data,
			}),
		}),
		update: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: "PUT",
				body: data,
			}),
		}),
		get: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/profile`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useUpdateMutation,
	useGetMutation,
} = usersApiSlice; // specific convention
