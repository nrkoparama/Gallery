import {createSlice,} from "@reduxjs/toolkit";

const accountInformation = {
    id: "",
    email: "",
    login: false,
    role: 0
}

const accountSlice = createSlice({
    name: "account",
    initialState: {
        accountInformation
    },
    reducers: {
        updateAccountState: (state, action) => {
            const fields = ["id", "email", "login", "role"];
            const oldStates = state.accountInformation;
            const newStates = action.payload; // payload {}

            fields.map((field) => {
                if (newStates.hasOwnProperty(field) && newStates[field] !== oldStates[field]) {
                    state.accountInformation[field] = newStates[field];
                }
            })
        }
    }
});

export const {updateAccountState} = accountSlice.actions;

export default accountSlice.reducer;