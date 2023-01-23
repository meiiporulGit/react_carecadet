import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ifacility {
  fData: any;
  service: any;
}
const initialState: Ifacility = {
  fData: {},
  service: {},
};

export const facilitySlice = createSlice({
  name: "facilitydata",
  initialState,
  reducers: {
    facilityInfo: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        fData: action.payload,
      };
    },
    // serviceInfo: (state, action: PayloadAction<any>) => {
    //   return {
    //     ...state,
    //     service: action.payload,
    //   };
    // },
  },
});

export const { facilityInfo } = facilitySlice.actions;
export const facilityReducer = facilitySlice.reducer;
