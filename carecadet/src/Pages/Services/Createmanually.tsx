import React from "react";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { TextField, Box, Typography, Grid, Paper ,Autocomplete,
  AutocompleteRenderInputParams,
  createFilterOptions} from "@mui/material";
import axios from "axios";

import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import SelectField from "../../Components/Select";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { axiosPrivate, baseURL } from "../../axios/axios";
import Pricelistlandingpage from "./pricelistlandingpage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface InitialValues {
  Organisationid: string;
  ServiceCode: string;
  DiagnosisTestorServiceName: string;
  OrganisationPrices?: string;
  FacilityNPI?: string;
  FacilityName?: string;
  FacilityPrices: string;
}

const CreateService = () => {
  const [query,setQuery] = useState([]);
  console.log(query,'q')
  const [info,setInfo]=useState([])
  console.log(info,'query')
  const select = useAppSelector((state) => state.providerAuth.login);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Organisationid = useAppSelector((state) => state.providerOrganization.orgEditData);
  const initialValues: InitialValues = {
    Organisationid: "",
    ServiceCode: "",
    DiagnosisTestorServiceName: "",
    OrganisationPrices: "",
    FacilityNPI: "",
    FacilityName: "",
    FacilityPrices: "",
  };

  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();
  
  const filterOptions = (options:any, state:any) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };
    useEffect(() => {
  
      const fetchUsers = async() =>{
        await axiosPrivate.get(`/service/findServiceCode`)
        .then (res => {setInfo(res.data);
        setQuery(res.data)})
      }
      fetchUsers()
    }, [])

    // const filterOptions1 = (options:any, state:any) => {
    //   return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
    // };
      // useEffect(() => {
    
      //   const fetchUsers= async() =>{
      //     await axiosPrivate.get(`/service/findDiagnosisTestorServiceName`)
      //     .then (res => {setInfo(res.data);
      //     setQuery(res.data)})
      //   }
      //   fetchUsers()
      // }, [])


  const onSubmit = (values: InitialValues, actions: any) => {
    console.log("test")
    const servicedata = {
      Organisationid: Organisationid[0].organizationID,
      ServiceCode: values.ServiceCode,
      DiagnosisTestorServiceName: values.DiagnosisTestorServiceName,
      OrganisationPrices: values.OrganisationPrices,
      FacilityNPI: values.FacilityNPI,
      FacilityName: values.FacilityName,
      FacilityPrices: values.FacilityPrices,
    };
    // alert(JSON.stringify(servicedata, null, 2));
    axiosPrivate.post("/service/createservice", servicedata).then((res) => {
     toast.success(res.data.message)
      actions.resetForm({
        values: initialValues,
      });
      navigate("/provider/service/listservice");
    }).catch(err=>{
      toast.error(err.message)
    })
  };

  const CustomPaper = (props:any) => {
    return <Paper elevation={8} sx={{backgroundColor:"#DCF0FA",color:"black"}}{...props} />;
  };

  const validationSchema = Yup.object().shape({
    ServiceCode: Yup.string().required("ServiceCode is required"),
    DiagnosisTestorServiceName: Yup.string().required(
      "Servicename is required"
    ),
    FacilityPrices: Yup.string().required("ServicePrice is required"),
  });


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

{({ handleChange, setFieldValue,values}) => (
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
               PaperComponent={CustomPaper}
filterOptions = {filterOptions}
               getOptionLabel={(option: any) => option.Code || option}         
              freeSolo    
             
              onChange={(e: any, value: any) => {
                setFieldValue("ServiceCode",value !== null ? value.Code :"");
               setFieldValue("DiagnosisTestorServiceName",value !== null ? value.DiagnosisTestorServiceName :"");
                
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
                autoComplete="text"
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

            <Grid item xs={12} >
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
                autoComplete="text"
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
                Facility NPI
              </Typography>
              <FormTextField
                container={TextField}
                label="Facility NPI"
                name="FacilityNPI"
                placeholder="FacilityNPI"
                autoComplete="text"
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
                autoComplete="text"
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

export default CreateService;
