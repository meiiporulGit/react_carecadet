import React from "react";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { TextField, Box, Typography, Grid, Paper,Autocomplete,
  AutocompleteRenderInputParams,
  createFilterOptions } from "@mui/material";
import axios from "axios";

import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";

import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { axiosPrivate } from "../../axios/axios";
import Pricelistlandingpage from "./pricelistlandingpage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface InitialValues {
  Organisationid: string;
  ServiceCode: string;
  DiagnosisTestorServiceName: string;
  OrganisationPrices?: string;
  FacilityNPI?: string;
  FacilityPrices: string;
}

const CreateServicethroFacility = () => {
  const [query,setQuery] = useState([]);
  console.log(query,'q')
  const [info,setInfo]=useState([])
  console.log(info,'query')
  const select = useAppSelector((state) => state.providerAuth.login);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Organisationid = useAppSelector((state) => state.providerOrganization.orgEditData);
  const facilityinput = useAppSelector(
    (state) => state.providerService.serviceData)
  console.log(facilityinput.facilityName, "ggg")
  const initialValues: InitialValues = {
    Organisationid: "",
    ServiceCode: "",
    DiagnosisTestorServiceName: "",
    OrganisationPrices: "",
    FacilityNPI: "",
    FacilityPrices: "",
  };

  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();
  
  const filterOptions = (options:any, state:any) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };
    useEffect(() => {
  
      const fetchUsers = async() =>{
        await axiosPrivate.get(`http://localhost:5200/findServiceCode`)
        .then (res => {setInfo(res.data);
        setQuery(res.data)})
      }
      fetchUsers()
    }, [])

  const onSubmit = (values: InitialValues, actions: any) => {
    const servicedata = {
      Organisationid: Organisationid[0].organizationID,
      ServiceCode: values.ServiceCode,
      DiagnosisTestorServiceName: values.DiagnosisTestorServiceName,
      OrganisationPrices: values.OrganisationPrices,
      FacilityNPI: facilityinput.facilityNPI,
      FacilityPrices: values.FacilityPrices,
    };
    // alert(JSON.stringify(servicedata, null, 2));
    axiosPrivate.post("/createservice", servicedata).then((res) => {
      toast.success(res.data.message)
      actions.resetForm({
        values: initialValues,
      });
      navigate("/provider/facility/pricelistlanding");
    }).catch(err=>{
      toast.error(err.message)
    })
  };

  const validationSchema = Yup.object().shape({
    ServiceCode: Yup.string().required("ServiceCode is required"),
    DiagnosisTestorServiceName: Yup.string().required(
      "Servicename is required"
    ),
    FacilityPrices: Yup.string().required("ServicePrice is required"),
  });

  // const servicepriceData = [
  //   {
  //     xs: 12,
  //     label: "Service Code ",
  //     name: "ServiceCode",
  //     placeholder: "Service Code",
  //     type: "text",
  //   },
  //   {
  //     xs: 12,
  //     label: "Service Name",
  //     name: "DiagnosisTestorServiceName",
  //     placeholder: "Service Name",
  //     type: "text",
  //   },
  //   {
  //     xs: 12,
  //     label: "Organisation Prices",
  //     name: "OrganisationPrices",
  //     placeholder: "Organisation Prices",
  //     type: "text",
  //   },
  //   // {
  //   //   xs: 12,
  //   //   label: "Facility NPI",
  //   //   name: "FacilityNPI",
  //   //   placeholder: "FacilityNPI",
  //   //   type: "text",
  //   // },
  //   {
  //     xs: 12,
  //     label: "Facility Prices",
  //     name: "FacilityPrices",
  //     placeholder: "FacilityPrices",
  //     type: "text",
  //   },
  // ];
  return (
    <Paper
      elevation={9}
      sx={{
        backgroundColor: "primary.light",
        padding: "1.5rem",
        borderRadius: "15px",
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >

{({ handleChange, setFieldValue}) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                mb={"0.5rem"}
                sx={{
                  backgroundColor: "#B4C8FC",
                  padding: "0.7rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
              >
                Add Service Price
              </Typography>
            </Grid>
            {/* {servicepriceData.map((d, i) => (
              <Grid item xs={d.xs} key={i}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                  {d.label}
              
                </Typography>
                <FormTextField
                  container={TextField}
                  name={d.name}
                  placeholder={d.placeholder}
                  type={d.type}
                  fullWidth={true}
                  sx={{
                    "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },
                  }}
                />
              </Grid>
            ))} */}

<Grid item xs={12}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                 Service Code
                </Typography>
                <Field
              name="serviceCode"
              component={Autocomplete}
               options = {info}
               loading={info.length === 0}
filterOptions = {filterOptions}
               getOptionLabel={(option: any) => option.Code || option}         
              freeSolo    
             fullWidth={true}
              onChange={(e: any, value: any) => {
                setFieldValue("ServiceCode",value !== null ? value.Code :"");
               setFieldValue("DiagnosisTestorServiceName",value !== null ? value.DiagnosisTestorServiceName :"");
                // setFieldValue("facilityNPI",value !== null ? value.facilityNPI : "");
              
                // setFieldValue("addressLine1", value !== null ? value.addressLine1 : "");
                // setFieldValue("addressLine2",value !== null ? value.addressLine2 : "");
                // setFieldValue("city", value !== null ? value.city : "");
                // setFieldValue ("state", value !== null ? value.state : "");
                // setFieldValue ("zipCode", value !== null ? value.zipCode : "");
                // setFieldValue("email", value !== null ? value.email : "");
                // setFieldValue ("contact", value !== null ? value.contact : "")
                             }}
               renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  name="serviceCode"
                  label="Search serviceCode"
                  onChange={handleChange}
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
                  }}
                />
              )}
            />

              </Grid>

              {/* <Grid item xs={12} sm={4}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  // m: "0.5rem 0 0.2rem 0",
                  mb: "0.3rem",
                }}
              >
                Description
              </Typography>
              <FormTextField
                container={TextField}
                label="Description"
                name="Description"
                placeholder="Description"
                type="text"
                fullWidth={true}
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
            </Grid> */}

              <Grid item xs={12} >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  // m: "0.5rem 0 0.2rem 0",
                  mb: "0.3rem",
                }}
              >
                DiagnosisTest or ServiceName
              </Typography>
              <FormTextField
                container={TextField}
                label="DiagnosisTest or ServiceName"
                name="DiagnosisTestorServiceName"
                placeholder="DiagnosisTestorServiceName"
                type="text"
                fullWidth={true}
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

           
            <Grid item xs={12} >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  // m: "0.5rem 0 0.2rem 0",
                  mb: "0.3rem",
                }}
              >
                Organisation Prices
              </Typography>
              <FormTextField
                container={TextField}
                label="OrganisationPrices"
                name="OrganisationPrices"
                placeholder="OrganisationPrices"
                type="text"
                fullWidth={true}
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

            {/* <Grid item xs={12} >
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
                name="FacilityName"
                placeholder="FacilityName"
                type="text"
                fullWidth={true}
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
            </Grid> */}

            <Grid item xs={12} >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  // m: "0.5rem 0 0.2rem 0",
                  mb: "0.3rem",
                }}
              >
                Facility NPI
              </Typography>
              <FormTextField
                container={TextField}
                label="Facility NPI"
                name="FacilityNPI"
                placeholder="FacilityNPI"
                type="text"
                fullWidth={true}
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

            <Grid item xs={12} >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  // m: "0.5rem 0 0.2rem 0",
                  mb: "0.3rem",
                }}
              >
                Facility Prices
              </Typography>
              <FormTextField
                container={TextField}
                label="Facility Prices"
                name="FacilityPrices"
                placeholder="FacilityPrices"
                type="text"
                fullWidth={true}
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
    </Paper>
  );
};

export default CreateServicethroFacility;
