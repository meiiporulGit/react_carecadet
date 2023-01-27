import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ifacility {
  serviceData: any;

}
const initialState: Ifacility = {
  serviceData: {},

};

export const serviceSlice = createSlice({
  name: "servicedata",
  initialState,
  reducers: {
    serviceInfo: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        serviceData: action.payload,
      };
    },
  
  },
});

export const {  serviceInfo } = serviceSlice.actions;
export const serviceReducer = serviceSlice.reducer;
