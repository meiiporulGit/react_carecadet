import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, validateYupSchema } from "formik";
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

interface forminitialValues {
  providerID: string;
  organizationID:string;
  facilityNPI?: string | number;
  facilityName: string;
  facilityType: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  contact: string;
  email: string;
}

const options = [
  { value: "Type1", item: "Type1" },
  { value: "Type2", item: "Type2" },
  { value: "Type3", item: "Type3" },
];

export default function UpdateFacility() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getid = useAppSelector(state=>state.providerAuth.login);
  const facilityinput = useAppSelector(
    (state: { providerFacility: { fData: any } }) => state.providerFacility.fData
  );
  const initialValues = {
    providerID: getid.userID,
    organizationID:facilityinput.organizationID,
    facilityNPI: facilityinput.facilityNPI,
    facilityName: facilityinput.facilityName,
    facilityType: facilityinput.facilityType,
    addressLine1: facilityinput.address.addressLine1,
    addressLine2: facilityinput.address.addressLine2,
    city: facilityinput.address.city,
    state: facilityinput.address.state,
    zipCode: facilityinput.address.zipCode,
    contact: facilityinput.contact,
    email: facilityinput.email,
  };
  const onSubmit = (values: forminitialValues, actions: any) => {
    const facilitydata = {
      facilityID: facilityinput.facilityID,
      organizationID:values.organizationID,
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
      email: values.email,
      contact: values.contact,
    };
    // alert(JSON.stringify(facilitydata, null, 2));
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
              <SelectField
                container={Select}
                name="facilityType"
                label="Facility Type"
                selectData={options}
              />
              {/* <ErrorMessage name="facilityType">
                                {(error) => <ErrorProps>{error}</ErrorProps>}
                            </ErrorMessage> */}
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
      </Formik>
    </Paper>
  );
}
