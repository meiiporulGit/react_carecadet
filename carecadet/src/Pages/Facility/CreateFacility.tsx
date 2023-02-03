// import React from "react";
// import { Formik, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import {
//   Grid,
//   Typography,
//   Paper,
//   TextField,
//   Select,
//   IconButton,
//   Button,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// //redux store
// import { useAppDispatch, useAppSelector } from "../../Redux/Hook";

// //components
// import FormTextField from "../../Components/Textfield";
// import { Buttoncomponent } from "../../Components/Buttoncomp";
// import SelectField from "../../Components/Select";
// import { axiosPrivate } from "../../axios/axios";
// import { tabValueNav } from "../../Redux/ProviderRedux/LoginSlice";

// interface forminitialValues {
//   providerID: string;
//   organizationID:string,
//   facilityNPI?: string | number;
//   facilityName: string;
//   facilityType: string;
//   addressLine1: string;
//   addressLine2?: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   contact: string;
//   email: string;
// }

// const options = [
//   { value: "Type1", item: "Type1" },
//   { value: "Type2", item: "Type2" },
//   { value: "Type3", item: "Type3" },
// ];

// export default function CreateFacility() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const data = useAppSelector(state=>state.providerAuth.login);
//   const orgID=useAppSelector((state) => state.providerOrganization.orgEditData);
//   console.log("data", orgID);

//   const initialValues: forminitialValues = {
//     providerID: data.userID,
//     organizationID:orgID[0].organizationID,
//     facilityNPI: "",
//     facilityName: "",
//     facilityType: "",
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     contact: "",
//     email: "",
//   };

//   const validationSchema = Yup.object().shape({
//     facilityName: Yup.string().required("Required"),
//     facilityType: Yup.string().required("Required"),
//     addressLine1: Yup.string().required("Required"),
//     // addressLine2: Yup.string().required("Required field"),
//     city: Yup.string().nullable().required("Required"),
//     zipCode: Yup.string()
//       .required("Required")
//       .test("len", (val: any) => val && val.length === 5),
//     state: Yup.string().nullable().required("Required"),
//     contact: Yup.string().required("Required"),
//     email: Yup.string().email().required("Required"),
//   });

//   const onSubmit = (values: forminitialValues, actions: any) => {
//     const facilitydata = {
//       providerID: values.providerID,
//       organizationID:values.organizationID,
//       facilityNPI: values.facilityNPI,
//       facilityName: values.facilityName,
//       facilityType: values.facilityType,
//       address: {
//         addressLine1: values.addressLine1,
//         addressLine2: values.addressLine2,
//         city: values.city,
//         state: values.state,
//         zipCode: values.zipCode,
//       },
//       email: values.email,
//       contact: values.contact,
//     };
//     // alert(JSON.stringify(facilitydata, null, 2));
//     actions.resetForm({
//       values: {
//         facilityNPI: "",
//         facilityName: "",
//         facilityType: " ",
//         addressLine1: "",
//         addressLine2: "",
//         city: "",
//         state: "",
//         zipCode: "",
//         email: "",
//         contact: "",
//       },
//     });
//     axiosPrivate
//       .post("http://localhost:5200/facility/createFacility", facilitydata)
//       .then((res) => {
//         // alert('success')
//         toast.success(res.data.message);
//         console.log("resfacilitypost", res.data);
//         dispatch(tabValueNav(1));
//         // dispatch(editButton())
//         navigate("/provider/facility/viewFacility");
//       })
//       .catch((err) => {
//         toast.error(err.message);
//       });
//   };

//   return (
//     <Paper
//       elevation={5}
//       sx={{
//         backgroundColor: "primary.light",
//         padding: "1.8rem",
//         // borderRadius: "15px",
//         // m:"0 1em 1em 1em"
//       }}
//     >
//       {/* <Typography
//                 variant="h6"
//                 textAlign={"right"}
//                 justifyItems={"right"}
//                 sx={{ color: "Black" }}
//                 margin={"10px"}
//                 marginBottom={"5px"}
//             >
//                 Hello {data.userID},
//             </Typography>
//             <div
//                 style={{
//                     marginBottom: "10px",
//                     flex: 1,
//                     height: "3px",
//                     backgroundColor: "darkgray",
//                 }}
//             /> */}
//       {/* <Grid container item xs={12} justifyContent="left">
                
//                 <Button
//                     variant="outlined"
//                     type="button"
//                     onClick={() => { 
//                         dispatch(tabValueNav(1))
//                         navigate("/providerlanding") }}
//                     sx={{
//                         backgroundColor: "secondary.dark",
//                         width: "8vw",

//                         marginBottom: "0.5rem",
//                         color: "#fff",
//                         "&:hover": {
//                             color: "secondary.dark",
//                             border: "1px solid blue",
//                         },
//                     }}
//                     startIcon={<ArrowBackIcon fontSize="large" />}>
//                     BACK
//                 </Button>
//             </Grid> */}

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//       >
//         <Form>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Typography
//                 mb={"0.3rem"}
//                 sx={{
//                   backgroundColor: "secondary.light",
//                   padding: "0.7rem",
//                   textAlign: "center",
//                   fontSize: "1.2rem",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Add Facility Information
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={12}>
//               <Typography
//                 sx={{
//                   fontSize: "1rem",
//                   fontWeight: "bold",
//                   // m: "0.5rem 0 0.2rem 0",
//                   mb: "0.3rem",
//                 }}
//               >
//                 Facility NPI
//               </Typography>
//               <FormTextField
//                 container={TextField}
//                 label="Facility NPI"
//                 name="facilityNPI"
//                 placeholder="Facility NPI"
//                 type="text"
//                 fullWidth={true}
//                 sx={{
//                   ".MuiFormLabel-root ": {
//                     letterSpacing: "0.2rem",
//                     fontSize: "0.8rem",
//                   },
//                   ".MuiInputLabel-shrink": {
//                     letterSpacing: 0,
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography
//                 sx={{
//                   fontSize: "1rem",
//                   fontWeight: "bold",
//                   // m: "0.5rem 0 0.2rem 0",
//                   mb: "0.3rem",
//                 }}
//               >
//                 Facility Name
//               </Typography>
//               <FormTextField
//                 container={TextField}
//                 label="Facility Name"
//                 name="facilityName"
//                 placeholder="FacilityName"
//                 type="text"
//                 fullWidth={true}
//                 sx={{
//                   ".MuiFormLabel-root ": {
//                     letterSpacing: "0.2rem",
//                     fontSize: "0.8rem",
//                   },
//                   ".MuiInputLabel-shrink": {
//                     letterSpacing: 0,
//                   },
//                   //  ".Mui-focused":{
//                   //     letterSpacing: "0.2rem"
//                   //  }
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography
//                 // variant="h6"
//                 sx={{
//                   fontSize: "1rem",
//                   fontWeight: "bold",
//                   // m: "0.5rem 0 0.2rem 0",
//                   mb: "0.3rem",
//                 }}
//               >
//                 Facility Type
//               </Typography>
//               <SelectField
//                 container={Select}
//                 name="facilityType"
//                 label="Facility Type"
//                 selectData={options}
//               />
//               {/* <ErrorMessage name="facilityType">
//                                 {(error) => <ErrorProps>{error}</ErrorProps>}
//                             </ErrorMessage> */}
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography
//                 sx={{
//                   fontSize: "1rem",
//                   fontWeight: "bold",
//                   // m: "0.5rem 0 0.2rem 0",
//                   mb: "0.3rem",
//                 }}
//               >
//                 Street Address1
//               </Typography>
//               <FormTextField
//                 container={TextField}
//                 label="Street Address1"
//                 name="addressLine1"
//                 placeholder="Street Address1"
//                 type="text"
//                 fullWidth={true}
//                 sx={{
//                   ".MuiFormLabel-root ": {
//                     letterSpacing: "0.2rem",
//                     fontSize: "0.8rem",
//                   },
//                   ".MuiInputLabel-shrink": {
//                     letterSpacing: 0,
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography
//                 sx={{
//                   fontSize: "1rem",
//                   fontWeight: "bold",
//                   // m: "0.5rem 0 0.2rem 0",
//                   mb: "0.3rem",
//                 }}
//               >
//                 Street Address2
//               </Typography>
//               <FormTextField
//                 container={TextField}
//                 label="Street Address2"
//                 name="addressLine2"
//                 placeholder="Street Address2"
//                 type="text"
//                 fullWidth={true}
//                 sx={{
//                   ".MuiFormLabel-root ": {
//                     letterSpacing: "0.2rem",
//                     fontSize: "0.8rem",
//                   },
//                   ".MuiInputLabel-shrink": {
//                     letterSpacing: 0,
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Typography
//                 sx={{
//                   fontSize: "1rem",
//                   fontWeight: "bold",
//                   // m: "0.5rem 0 0.2rem 0",
//                   mb: "0.3rem",
//                 }}
//               >
//                 City
//               </Typography>
//               <FormTextField
//                 container={TextField}
//                 label="City"
//                 name="city"
//                 placeholder="City"
//                 type="text"
//                 fullWidth={true}
//                 sx={{
//                   ".MuiFormLabel-root ": {
//                     letterSpacing: "0.2rem",
//                     fontSize: "0.8rem",
//                   },
//                   ".MuiInputLabel-shrink": {
//                     letterSpacing: 0,
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Typography
//                 sx={{
//                   fontSize: "1rem",
//                   fontWeight: "bold",
//                   // m: "0.5rem 0 0.2rem 0",
//                   mb: "0.3rem",
//                 }}
//               >
//                 State
//               </Typography>
//               <FormTextField
//                 container={TextField}
//                 label="State"
//                 name="state"
//                 placeholder="State"
//                 type="text"
//                 fullWidth={true}
//                 sx={{
//                   ".MuiFormLabel-root ": {
//                     letterSpacing: "0.2rem",
//                     fontSize: "0.8rem",
//                   },
//                   ".MuiInputLabel-shrink": {
//                     letterSpacing: 0,
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Typography
//                 sx={{
//                   fontSize: "1rem",
//                   fontWeight: "bold",
//                   // m: "0.5rem 0 0.2rem 0",
//                   mb: "0.3rem",
//                 }}
//               >
//                 ZipCode
//               </Typography>
//               <FormTextField
//                 container={TextField}
//                 label="ZipCode"
//                 name="zipCode"
//                 placeholder="ZipCode"
//                 type="text"
//                 fullWidth={true}
//                 sx={{
//                   ".MuiFormLabel-root ": {
//                     letterSpacing: "0.2rem",
//                     fontSize: "0.8rem",
//                   },
//                   ".MuiInputLabel-shrink": {
//                     letterSpacing: 0,
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography
//                 sx={{
//                   fontSize: "1rem",
//                   fontWeight: "bold",
//                   // m: "0.5rem 0 0.2rem 0",
//                   mb: "0.3rem",
//                 }}
//               >
//                 Phone
//               </Typography>
//               <FormTextField
//                 container={TextField}
//                 label="Phone"
//                 name="contact"
//                 placeholder="Phone"
//                 type="text"
//                 fullWidth={true}
//                 sx={{
//                   ".MuiFormLabel-root ": {
//                     letterSpacing: "0.2rem",
//                     fontSize: "0.8rem",
//                   },
//                   ".MuiInputLabel-shrink": {
//                     letterSpacing: 0,
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography
//                 sx={{
//                   fontSize: "1rem",
//                   fontWeight: "bold",
//                   // m: "0.5rem 0 0.2rem 0",
//                   mb: "0.3rem",
//                 }}
//               >
//                 Email
//               </Typography>
//               <FormTextField
//                 container={TextField}
//                 label="Email"
//                 name="email"
//                 placeholder="Email"
//                 type="email"
//                 fullWidth={true}
//                 sx={{
//                   ".MuiFormLabel-root ": {
//                     letterSpacing: "0.2rem",
//                     fontSize: "0.8rem",
//                   },
//                   ".MuiInputLabel-shrink": {
//                     letterSpacing: 0,
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid container item xs={12} justifyContent="right">
//               <Buttoncomponent
//                 type="submit"
//                 size="large"
//                 fullWidth={false}
//                 variant="contained"
//                 sx={{
//                   backgroundColor: "secondary.dark",
//                   width: "10vw",
//                   color: "#fff",
//                   "&:hover": {
//                     color: "secondary.dark",
//                     border: "1px solid blue",
//                     // letterSpacing: "0.2rem",
//                     // fontSize: "1rem",
//                   },
//                 }}
//               >
//                 Submit
//               </Buttoncomponent>
//             </Grid>
//           </Grid>
//         </Form>
//       </Formik>
//     </Paper>
//   );
// }
import React from "react";
import { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field,FormikProps } from "formik";
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
  Autocomplete,
  AutocompleteRenderInputParams,
  createFilterOptions
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//redux store
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";


//components
import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import SelectField from "../../Components/Select";
import { axiosPrivate } from "../../axios/axios";
import { tabValueNav } from "../../Redux/ProviderRedux/LoginSlice";

interface forminitialValues {
  providerID: string;
  organizationID:string,
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
interface Props {
  formik:FormikProps<forminitialValues>
}
const options = [
  { value: "1- Primary care", item: "1- Primary care" },
  { value: "2- Urgent Care", item: "2- Urgent Care" },
  { value: "3- Dentist Office", item: "3- Dentist Office" },
  {value:"4- Imaging and Laboratory",item: "4- Imaging and Laboratory"},
  {value:"5- Hospital and 5- Others",item:"5- Hospital and 5- Others"}
  
];

export default function CreateFacility() {
  const [query,setQuery] = useState([]);
  console.log(query,'q')
  const [info,setInfo]=useState([])
  console.log(info,'query')
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector(state => state.providerAuth.login);
  console.log("datafaciltiy", data);
  const orgid = useAppSelector((state) => state.providerOrganization.orgEditData);
  console.log('orgiddd', orgid)
  const orgID=useAppSelector((state) => state.providerOrganization.orgEditData);
  const initialValues: forminitialValues = {
    providerID: data.userID,
    organizationID:orgID[0].organizationID,
    facilityNPI: "",
    facilityName: "",
    facilityType: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    contact: "",
    email: "",
   
  };

const OPTIONS_LIMIT = 10;
const defaultFilterOptions = createFilterOptions();

const filterOptions = (options:any, state:any) => {
  return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
};
  useEffect(() => {

    const fetchUsers = async() =>{
      await axiosPrivate.get(`http://localhost:5200/facility/findfacilityNPI`)
      .then (res => {setInfo(res.data);
      setQuery(res.data)})
    }
    fetchUsers()
  }, [])

  

  const validationSchema = Yup.object().shape({
    facilityName: Yup.string().required("Required"),
    facilityType: Yup.string().required("Required"),
    addressLine1: Yup.string().required("Required"),
    // addressLine2: Yup.string().required("Required field"),
    city: Yup.string().nullable().required("Required"),
    zipCode: Yup.string()
      .required("Required"),
      
    state: Yup.string().nullable().required("Required"),
    contact: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
  });

  const onSubmit = (values: forminitialValues, actions: any) => {
    const facilitydata = {
      providerID: values.providerID,
      organizationID:values.organizationID,
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

  return (
    <Paper
      elevation={5}
      sx={{
        backgroundColor: "primary.light",
        padding: "1.8rem",
      
      }}
    >


      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, setFieldValue}) => (
     
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
    
             <Field
              name="facilityNPI"
              component={Autocomplete}
               options = {info}
               loading={info.length === 0}
filterOptions = {filterOptions}
               getOptionLabel={(option: any) => option.facilityNPI || option}         
              freeSolo    
             
              onChange={(e: any, value: any) => {
                setFieldValue("facilityName",value !== null ? value.facilityName :"");
                setFieldValue("facilityNPI",value !== null ? value.facilityNPI : "");
              
                setFieldValue("addressLine1", value !== null ? value.addressLine1 : "");
                setFieldValue("addressLine2",value !== null ? value.addressLine2 : "");
                setFieldValue("city", value !== null ? value.city : "");
                setFieldValue ("state", value !== null ? value.state : "");
                setFieldValue ("zipCode", value !== null ? value.zipCode : "");
                setFieldValue("email", value !== null ? value.email : "");
                setFieldValue ("contact", value !== null ? value.contact : "")
                             }}
               renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  name="facilityNPI"
                  label="Search Facility NPI"
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
              <SelectField
              // defaultValue = ''
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
}
