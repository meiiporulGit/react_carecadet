import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, validateYupSchema, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Select,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

//components
import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import SelectField from "../../Components/Select";

//redux store
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { tabValueNav } from "../../Redux/ProviderRedux/LoginSlice";
import { axiosPrivate } from "../../axios/axios";
import ErrorProps from "../../Components/Errorprops";

interface forminitialValues {
  providerID: string;
  facilityNPI?: string | number;
  facilityName: string;
  facilityType: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  latitude:string;
  longitude:string;
  contact: string;
  email: string;
}

// const options = [
//   { value: "1- Primary care", item: "1- Primary care" },
//   { value: "2- Urgent Care", item: "2- Urgent Care" },
//   { value: "3- Dentist Office", item: "3- Dentist Office" },
//   {value:"4- Imaging and Laboratory",item: "4- Imaging and Laboratory"},
//   {value:"5- Hospital",item:"5- Hospital"},
//   {value:"6- Others",item:"6- Others"}
// ];

export default function UpdateFacility() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getid = useAppSelector(state=>state.providerAuth.login);
  const facilityinput = useAppSelector(
    (state: { providerFacility: { fData: any } }) => state.providerFacility.fData
  );
  const options = useAppSelector((state) => state.providerFacility.facilityTypedata)
  const initialValues = {
    providerID: getid.userID,
    facilityNPI: facilityinput.facilityNPI,
    facilityName: facilityinput.facilityName,
    facilityType: facilityinput.facilityType,
    addressLine1: facilityinput.address.addressLine1,
    addressLine2: facilityinput.address.addressLine2,
    city: facilityinput.address.city,
    state: facilityinput.address.state,
    zipCode: facilityinput.address.zipCode,
    latitude:facilityinput.latitude,
    longitude:facilityinput.longitude,
    contact: facilityinput.contact,
    email: facilityinput.email,
  };
  const onSubmit = (values: forminitialValues, actions: any) => {
    const facilitydata = {
      facilityID: facilityinput.facilityID,
      providerID: values.providerID,
      facilityNPI: values.facilityNPI,
      facilityName: values.facilityName,
      facilityType: values.facilityType,
      address: {
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
      },
      latitude:values.latitude,
      longitude:values.longitude,
      email: values.email,
      contact: values.contact,
    };
    alert(JSON.stringify(facilitydata, null, 2));
    // actions.resetForm({
    //   values: {
    //     facilityNPI: "",
    //     facilityName: "",
    //     facilityType: " ",
    //     addressLine1: "",
    //     addressLine2: "",
    //     city: "",
    //     state: "",
    //     zipCode: "",
    //     email: "",
    //     contact: "",
    //   },
    // });
    axiosPrivate
      .put(`http://localhost:5200/facility/updateFacility`, facilitydata)
      .then((res) => {
        // alert('updated')
        toast.success("Successfully Updated");
        console.log("i", res.data);
        navigate("/provider/facility/viewFacility");
      })
      .catch((e) => console.log(e));
  };

  return (
    <Paper
      elevation={5}
      sx={{
        backgroundColor: "primary.light",
        padding: "1.8rem",
        // borderRadius: "15px",
        m: "1em",
      }}
    >
      {/* <Typography
        variant="h6"
        textAlign={"right"}
        justifyItems={"right"}
        sx={{ color: "Black" }}
        margin={"10px"}
        marginBottom={"5px"}
      >
        Hello {getid.userID},
      </Typography>
      <div
        style={{
          marginBottom: "10px",
          flex: 1,
          height: "3px",
          backgroundColor: "darkgray",
        }}
      /> */}
      {/* <Grid container item xs={12} justifyContent="left">
        <Button
          variant="outlined"
          type="button"
          onClick={() => {
            dispatch(tabValueNav(1));
            dispatch(editButton())
            navigate("/providerlanding");
          }}
          sx={{
            backgroundColor: "secondary.dark",
            width: "8vw",

            marginBottom: "0.5rem",
            color: "#fff",
            "&:hover": {
              color: "secondary.dark",
              border: "1px solid blue",
            },
          }}
          startIcon={<ArrowBackIcon fontSize="large" />}
        >
          BACK
        </Button>
      </Grid> */}

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, values, setFieldValue,  }) => (
         <Form>
         <Grid container spacing={2}>
           <Grid item xs={12}>
             <Typography
               mb={"0.5rem"}
               sx={{
                 backgroundColor: "#B4C8FC",
                 padding: "0.7rem",
                 textAlign: "center",
                 fontSize: "1.2rem",
                 fontWeight: "bold",
               }}
             >
               Facility Information
             </Typography>
           </Grid>
           <Grid item xs={12} sm={12}>
             <Typography
               sx={{
                 fontSize: "1.2rem",
                 // m: "0.5rem 0 0.2rem 0",
                 mb: "0.5rem",
               }}
             >
               Facility NPI
             </Typography>
             <FormTextField
               container={TextField}
               label="Facility NPI"
               name="facilityNPI"
               placeholder="Facility NPI"
               type="text"
               fullWidth={true}
               sx={{
                 ".MuiFormLabel-root ": {
                   letterSpacing: "0.2rem",
                 },
                 ".MuiInputLabel-shrink": {
                   letterSpacing: 0,
                 },
               }}
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <Typography
               sx={{
                 fontSize: "1.2rem",
                 // m: "0.5rem 0 0.2rem 0",
                 mb: "0.5rem",
               }}
             >
               Facility Name
             </Typography>
             <FormTextField
               container={TextField}
               label="Facility Name"
               name="facilityName"
               placeholder="FacilityName"
               type="text"
               fullWidth={true}
               sx={{
                 ".MuiFormLabel-root ": {
                   letterSpacing: "0.2rem",
                 },
                 ".MuiInputLabel-shrink": {
                   letterSpacing: 0,
                 },
                 //  ".Mui-focused":{
                 //     letterSpacing: "0.2rem"
                 //  }
               }}
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <Typography
               // variant="h6"
               sx={{
                 fontSize: "1.2rem",
                 // m: "0.5rem 0 0.2rem 0",
                 mb: "0.5rem",
               }}
             >
               Facility Type
             </Typography>
             <FormControl sx={{ width: "100%" }}>
               <InputLabel sx={{ letterSpacing: "0.2rem", fontSize: "0.8rem", "&.MuiInputLabel-shrink": { letterSpacing: 0 } }}>Facility Type</InputLabel>
               <Field as={Select} name="facilityType" label="Facility Type">
                 {(options || []).map((select: any, index: any) => (
                   <MenuItem key={index + 1} value={select.value}>
                     {select.item}
                   </MenuItem>
                 ))}

               </Field>

               <ErrorMessage name="facilityType">
                 {(error) => (
                   <ErrorProps >
                     {error}
                   </ErrorProps>
                 )}
               </ErrorMessage>
             </FormControl>
             {values.facilityType === "6- Others" ? (<FormTextField
                 container={TextField}
                 label="Enter Options for Others"
                 name="othersFacilityType"
                 placeholder="Facility Type"
                 type="text"
                 autoComplete="new-country-area"
                 sx={{
                   mt: "0.3rem",
                   ".MuiFormLabel-root ": {
                     letterSpacing: "0.2rem",
                     fontSize: "0.8rem",
                   },
                   ".MuiInputLabel-shrink": {
                     letterSpacing: 0,
                   },
                 }}
               />
             ): null                  
             }
           </Grid>
           <Grid item xs={12} sm={6}>
             <Typography
               sx={{
                 fontSize: "1.2rem",
                 // m: "0.5rem 0 0.2rem 0",
                 mb: "0.5rem",
               }}
             >
               Street Address1
             </Typography>
             <FormTextField
               container={TextField}
               label="Street Address1"
               name="addressLine1"
               placeholder="Street Address1"
               type="text"
               fullWidth={true}
               sx={{
                 ".MuiFormLabel-root ": {
                   letterSpacing: "0.2rem",
                 },
                 ".MuiInputLabel-shrink": {
                   letterSpacing: 0,
                 },
               }}
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <Typography
               sx={{
                 fontSize: "1.2rem",
                 // m: "0.5rem 0 0.2rem 0",
                 mb: "0.5rem",
               }}
             >
               Street Address2
             </Typography>
             <FormTextField
               container={TextField}
               label="Street Address2"
               name="addressLine2"
               placeholder="Street Address2"
               type="text"
               fullWidth={true}
               sx={{
                 ".MuiFormLabel-root ": {
                   letterSpacing: "0.2rem",
                 },
                 ".MuiInputLabel-shrink": {
                   letterSpacing: 0,
                 },
               }}
             />
           </Grid>
           <Grid item xs={12} sm={4}>
             <Typography
               sx={{
                 fontSize: "1.2rem",
                 // m: "0.5rem 0 0.2rem 0",
                 mb: "0.5rem",
               }}
             >
               City
             </Typography>
             <FormTextField
               container={TextField}
               label="City"
               name="city"
               placeholder="City"
               type="text"
               fullWidth={true}
               sx={{
                 ".MuiFormLabel-root ": {
                   letterSpacing: "0.2rem",
                 },
                 ".MuiInputLabel-shrink": {
                   letterSpacing: 0,
                 },
               }}
             />
           </Grid>
           <Grid item xs={12} sm={4}>
             <Typography
               sx={{
                 fontSize: "1.2rem",
                 // m: "0.5rem 0 0.2rem 0",
                 mb: "0.5rem",
               }}
             >
               State
             </Typography>
             <FormTextField
               container={TextField}
               label="State"
               name="state"
               placeholder="State"
               type="text"
               fullWidth={true}
               sx={{
                 ".MuiFormLabel-root ": {
                   letterSpacing: "0.2rem",
                 },
                 ".MuiInputLabel-shrink": {
                   letterSpacing: 0,
                 },
               }}
             />
           </Grid>
           <Grid item xs={12} sm={4}>
             <Typography
               sx={{
                 fontSize: "1.2rem",
                 // m: "0.5rem 0 0.2rem 0",
                 mb: "0.5rem",
               }}
             >
               ZipCode
             </Typography>
             <FormTextField
               container={TextField}
               label="ZipCode"
               name="zipCode"
               placeholder="ZipCode"
               type="text"
               fullWidth={true}
               sx={{
                 ".MuiFormLabel-root ": {
                   letterSpacing: "0.2rem",
                 },
                 ".MuiInputLabel-shrink": {
                   letterSpacing: 0,
                 },
               }}
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <Typography
               sx={{
                 fontSize: "1.2rem",
                 // m: "0.5rem 0 0.2rem 0",
                 mb: "0.5rem",
               }}
             >
               Phone
             </Typography>
             <FormTextField
               container={TextField}
               label="Phone"
               name="contact"
               placeholder="Phone"
               type="text"
               fullWidth={true}
               sx={{
                 ".MuiFormLabel-root ": {
                   letterSpacing: "0.2rem",
                 },
                 ".MuiInputLabel-shrink": {
                   letterSpacing: 0,
                 },
               }}
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <Typography
               sx={{
                 fontSize: "1.2rem",
                 // m: "0.5rem 0 0.2rem 0",
                 mb: "0.5rem",
               }}
             >
               Email
             </Typography>
             <FormTextField
               container={TextField}
               label="Email"
               name="email"
               placeholder="Email"
               type="email"
               fullWidth={true}
               sx={{
                 ".MuiFormLabel-root ": {
                   letterSpacing: "0.2rem",
                 },
                 ".MuiInputLabel-shrink": {
                   letterSpacing: 0,
                 },
               }}
             />
           </Grid>
           <Grid container item xs={12} justifyContent="right">
             <Buttoncomponent
               type="submit"
               size="large"
               fullWidth={false}
               variant="contained"
               sx={{
                 backgroundColor: "secondary.dark",
                 width: "10vw",
                 color: "#fff",
                 "&:hover": {
                   color: "secondary.dark",
                   border: "1px solid blue",
                   // letterSpacing: "0.2rem",
                   // fontSize: "1rem",
                 },
               }}
             >
               Submit
             </Buttoncomponent>
           </Grid>
         </Grid>
       </Form>
      )} 
       
      </Formik>
    </Paper>
  );
}
