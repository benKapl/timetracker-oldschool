import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

const activitiesSlice = createSlice({
    name: "activities",
    initialState,
    reducers: {
        addActivityToStore: (state, action) => {
            state.value.push({
                name: action.payload,
                timer: 0
            })
        },
        removeActivityFromStore: (state, action) => {
            state.value = state.value.filter(activity => activity.name != action.payload)
        },
        updateTimer: (state, action) => {
            const { name, timer } = action.payload;
            // Use findIndex to get the index of the activity by name
            const index = state.value.findIndex(activity => activity.name === name);
            if (index !== -1) {
                // Directly update the timer using the index
                state.value[index].timer = timer;
            }
        }
    }
})

export const { addActivityToStore, removeActivityFromStore, updateTimer} = activitiesSlice.actions;
export default activitiesSlice.reducer;