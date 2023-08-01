import { createSlice } from "@reduxjs/toolkit";

import appApi from "../services/appApi";

const initialState = null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.CreateAccount.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.SignIn.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.addToCart.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.removeFromCart.matchFulfilled, (_, { payload }) => payload);
    }
});

export const { logout} = userSlice.actions;
export default userSlice.reducer;
