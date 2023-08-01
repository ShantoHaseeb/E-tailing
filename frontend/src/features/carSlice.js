import { createSlice } from "@reduxjs/toolkit";

import appApi from "../services/appApi";

const initialState = [];

export const carSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        updateCars: (_, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.AddCar.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.UpdateCar.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.RemoveCar.matchFulfilled, (_, { payload }) => payload);
    },
});
export const { updateCars } = carSlice.actions;
export default carSlice.reducer;
