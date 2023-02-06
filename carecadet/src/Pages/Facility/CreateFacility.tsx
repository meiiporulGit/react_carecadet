import React from "react";
import { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field, FormikProps } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  Select,
  IconButton,
  Button,
  Autocomplete,
  AutocompleteRenderInputParams,
  createFilterOptions,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
//redux store
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { nppesInfo } from '../../Redux/ProviderRedux/facilitySlice';
import { facilityTypeInfo } from "../../Redux/ProviderRedux/facilitySlice";

//components
import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import SelectField from "../../Components/Select";
import ErrorProps from "../../Components/Errorprops";
import { axiosPrivate } from "../../axios/axios";
import { tabValueNav } from "../../Redux/ProviderRedux/LoginSlice";

interface forminitialValues {
  providerID: string;
  organizationID: string,
  facilityNPI?: string | number;
  facilityName: string;
  facilityType: string;
 othersFacilityType:string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  contact: string;
  email: string;
  latitude: string;
  longitude: string;
}

export default function CreateFacility() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [checkInfo, setCheckInfo]=useState<any>([])

  const data = useAppSelector(state => state.providerAuth.login);
  console.log("datafaciltiy", data);
  const orgID = useAppSelector((state) => state.providerOrganization.orgEditData);
  const initialValues: forminitialValues = {
    providerID: data.userID,
    organizationID: orgID[0].organizationID,
    facilityNPI: "",
    facilityName: "",
    facilityType: "",
   othersFacilityType:"",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    contact: "",
    email: "",
    latitude: "",
    longitude: ""
  };

  
  useEffect(() => {
    const fetchFacilityNPI = async () => {
      await axiosPrivate.get(`http://localhost:5200/facility/findfacilityNPI`)
        .then((res) => {
          console.log(res.data, 'nppes')
          // dispatch(nppesInfo(res.data))
          setCheckInfo(res.data)
        })
        .catch((e) => console.log(e));
      // .then (res => {setInfo(res.data);
      // setQuery(res.data)})
    }
    fetchFacilityNPI()

  }, [])
  useEffect(() => {
    const getFacilityType = async () => {
      await axiosPrivate.get(`http://localhost:5200/facility/findfacilityType`)
        .then((res) => {
          console.log(res.data, 'facilityType')
          dispatch(facilityTypeInfo(res.data))
        })
        .catch((e) => console.log(e));
    }
    getFacilityType()
  }, [])

  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options: any, state: any) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };
  const info = useAppSelector((state) => state.providerFacility.nppes);
  const options = useAppSelector((state) => state.providerFacility.facilityTypedata)
  console.log(options, 'options')
  const validationSchema = Yup.object().shape({
    facilityNPI: Yup.string().required("Required"),
    facilityName: Yup.string().required("Required"),
    facilityType: Yup.string().required("Required"),
    //facilityTypeOthers: Yup.string().required("Required"),
    addressLine1: Yup.string().required("Required"),
    // addressLine2: Yup.string().required("Required field"),
    city: Yup.string().nullable().required("Required"),
    zipCode: Yup.string()
      .required("Required"),
    // .test("len", (val: any) => val && val.length === 5),
    state: Yup.string().nullable().required("Required"),
    contact: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
  });

  const onSubmit = (values: forminitialValues, actions: any) => {
    const facilitydata = {
      providerID: values.providerID,
      organizationID: values.organizationID,
      facilityNPI: values.facilityNPI,
      facilityName: values.facilityName,
      // facilityType: values.facilityType,
      facilityType: values.facilityType === "6- Others" ? values.othersFacilityType : values.facilityType,
      address: {
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
      },
      email: values.email,
      contact: values.contact,
      GPSCoordinate:{   
        latitude: values.latitude,
        longitude: values.longitude}
   
    };
    alert(JSON.stringify(facilitydata, null, 2));
    actions.resetForm({
      values: initialValues,
    });
    axiosPrivate
      .post("http://localhost:5200/facility/createFacility", facilitydata)
      .then((res) => {
        toast.success(res.data.message);
        console.log("resfacilitypost", res.data);
        dispatch(tabValueNav(1));
        navigate("/provider/facility/viewFacility");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const CustomPaper = (props:any) => {
    return <Paper elevation={8} sx={{backgroundColor:"#DCF0FA",color:"black"}}{...props} />;
  };

  return (
    <Box
      // elevation={5}
      // sx={{
      //   backgroundColor: "primary.light",
      //   padding: "1.8rem",
      //   // borderRadius: "15px",
      //   // m:"0 1em 1em 1em"
      // }}
    >


      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, values, setFieldValue }) => (

          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  mb={"0.3rem"}
                  sx={{
                    backgroundColor: "secondary.light",
                    padding: "0.7rem",
                    textAlign: "center",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Add Facility Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}
              // style={{ marginLeft: "70%" }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
                  }}
                >
                  Search Facility NPI
                </Typography>
                {/* <Field
              name="autocomplete"
              component={Autocomplete}
              options={info}
              getOptionLabel={(option: any) => option.facilityNPI}
               popupIcon={<SearchIcon />}
               noOptionsText={
                true
                  ? 'NPI data not found -Enter manually'
                  : 'Type atleast 4 letters'
              }
              // ListboxProps={{ style: { maxHeight: "15rem" }, position: "bottom-start" }}
             
              onChange={(e: any, value: any) => {
                console.log(value,"imanualentervalue");
                setFieldValue(
                  "facilityName",
                  value !== null ? value.facilityName : ""
                )
                // setFieldValue("facilityNPI", value !== null ? value.facilityNPI :"");
                setFieldValue("facilityNPI",value.facilityNPI)
                setFieldValue("facilityType", value !== null ? value.facilityType : "");
                setFieldValue("addressLine1", value !== null ? value.addressLine1 : "");
                setFieldValue("addressLine2",value !== null ? value.addressLine2 : "");
                setFieldValue("city", value !== null ? value.city : "");
                setFieldValue ("state", value !== null ? value.state : "");
                setFieldValue ("zipCode", value !== null ? value.zipCode : "");
                setFieldValue("email", value !== null ? value.email : "");
                setFieldValue ("contact", value !== null ? value.contact : "");

              }}
              //  defaultValue = ''
              // onInputChange = {(e: any, value: any) => {
              //   console.log(value,"imanualentervalue");
              //   setFieldValue(
              //     "facilityNPI",
              //     value.facilityNPI 
              //   )}}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  name="autocomplete"
                  // error={touched['autocomplete'] && !!errors['autocomplete']}
                  // helperText={touched['autocomplete'] && errors['autocomplete']}
                  label="Search Facility NPI"
                  variant="outlined"
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
                      fontSize: "0.8rem",
                    },
                    ".MuiInputLabel-shrink": {
                      letterSpacing: 0,
                    },
                    "& .MuiAutocomplete-popupIndicator": { transform: "none" }
                    // ".MuiInputBase-root":{
                    //   borderRadius: "50px",
                    //   // height:"40px"
                    // },
                  
                  }}
                />
              )}
            /> */}
                <Field
                  name="facilityNPI"
                  component={Autocomplete}
                  filterOptions={filterOptions}
                  // options={info}
                  options={checkInfo}
                  // loading={info.length === 0}

                  // popupIcon={<SearchIcon />}
                  //  open={info.length >= 3}
                  //  options={info.map((option:any)=>option.facilityNPI)}
                  PaperComponent={CustomPaper}
                  getOptionLabel={(option: any) => option.facilityNPI || option}
                  // getOptionLabel = {(option: any) => typeof option === 'string'
                  // || option instanceof String ? option : ""}
                  freeSolo
                  // autoSelect
                  onChange={(e: any, value: any) => {

                    console.log(value, "imanualentervalue");
                    setFieldValue("facilityName", value !== null ? value.facilityName : "");
                    setFieldValue("facilityNPI", value !== null ? value.facilityNPI : "");
                    // setFieldValue("facilityType", value !== null ? value.facilityType : "");
                    setFieldValue("addressLine1", value !== null ? value.addressLine1 : "");
                    setFieldValue("addressLine2", value !== null ? value.addressLine2 : "");
                    setFieldValue("city", value !== null ? value.city : "");
                    setFieldValue("state", value !== null ? value.state : "");
                    setFieldValue("zipCode", value !== null ? value.zipCode : "");
                    setFieldValue("email", value !== null ? value.email : "");
                    setFieldValue("contact", value !== null ? value.contact : "");
                    setFieldValue("latitude", value !== null ? value.latitude : "");
                    setFieldValue("longitude", value !== null ? value.longitude : "")
                  }}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField
                      {...params}
                      name="facilityNPI"
                      label="Search Facility NPI"
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {/* {info.length === 0 ? <CircularProgress color="inherit" size={20} /> : null} */}
                            {checkInfo.length === 0 ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>),
                      }}
                      sx={{
                        ".MuiFormLabel-root ": {
                          letterSpacing: "0.2rem",
                          fontSize: "0.8rem",
                        },
                        ".MuiInputLabel-shrink": {
                          letterSpacing: 0,
                        },
                        "& .MuiAutocomplete-popupIndicator": { transform: "none" }

                        // ".MuiInputBase-root":{
                        //   borderRadius: "50px",
                        //   // height:"40px"
                        // },

                      }}
                    />
                  )}
                />

            
              </Grid>
             
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
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
                  autoComplete="new-country-area"
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
                      fontSize: "0.8rem",
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
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
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
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
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
                  autoComplete="new-country-area"
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
                      fontSize: "0.8rem",
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
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
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
                  autoComplete="new-country-area"
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
                      fontSize: "0.8rem",
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
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
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
                  autoComplete="new-country-area"
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
                      fontSize: "0.8rem",
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
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
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
                  autoComplete="new-country-area"
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
                      fontSize: "0.8rem",
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
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
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
                  autoComplete="new-country-area"
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
                      fontSize: "0.8rem",
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
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
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
                  autoComplete="new-country-area"
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
                      fontSize: "0.8rem",
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
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
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
                  autoComplete="new-country-area"
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
                      fontSize: "0.8rem",
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
    </Box>
  );
}
