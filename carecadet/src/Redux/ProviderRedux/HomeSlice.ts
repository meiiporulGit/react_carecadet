import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

import Cookies from "js-cookie";

// Define a type for the slice state
interface CounterState {
searchData:any;
searchDataTenMiles:any;
searchDataTwentyMiles:any;
searchDataThirtyMiles:any
}

// Define the initial state using that type
const initialState: CounterState = {
searchData:[],
searchDataTenMiles:[],
searchDataTwentyMiles:[],
searchDataThirtyMiles:[]
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
    dataSearchTenMiles: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        searchData: action.payload
        // searchDataTenMiles: action.payload,
      };
    },
    dataSearchTwentyMiles: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        searchData: action.payload
        //searchDataTwentyMiles: action.payload,
      };
    },
    dataSearchThirtyMiles: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        searchData: action.payload
        // searchDataThirtyMiles: action.payload,
      };
    },
    
  },
});

export const {
 dataSearch,dataSearchTenMiles,dataSearchTwentyMiles, dataSearchThirtyMiles
  // editButton
} = homeSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.login.token



export const homeReducer = homeSlice.reducer;
