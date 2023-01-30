import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

import Cookies from "js-cookie";

// Define a type for the slice state
interface CounterState {
searchData:any
}

// Define the initial state using that type
const initialState: CounterState = {
searchData:[]
};

export const homeSlice = createSlice({
  name: "home",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  

    dataSearch: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        searchData: action.payload,
      };
    },
    
  },
});

export const {
 dataSearch
  // editButton
} = homeSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.login.token



export const homeReducer = homeSlice.reducer;
