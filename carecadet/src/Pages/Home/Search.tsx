import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Card,
  Typography,
  Container
  
} from "@mui/material";
import { Grid, Paper,TextField,Select, } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//comp
import { Buttoncomponent } from "../../Components/Buttoncomp";
//redux store
import { useAppSelector, useAppDispatch } from "../../Redux/Hook";

import * as Yup from "yup";

import { axiosPrivate } from "../../axios/axios";
// import {editButton} from "../../Redux/LoginSlice";
import FormTextField from "../../Components/Textfield";
import SelectField from "../../Components/Select";
import SearchIcon from "@mui/icons-material/Search";

interface forminitialValues {
  providerID: string;
  facilityID: string;
  facilityNPI?: string;
  facilityName: string;
  facilityType: string;
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: string;
  email: string;
}

export default function ViewFacility() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([] as forminitialValues[]);
  console.log(data, "datinfo");
  const dispatch = useAppDispatch();
  const searchData = useAppSelector((state) => state.homeReducer.searchData);
  

  
interface forminitialValues {
  Service: string;
}

  const initialValues: forminitialValues = {
    Service: "",
  };

  const options = [
    { value: "Type1", item: "Type1" },
    { value: "Type2", item: "Type2" },
    { value: "Type3", item: "Type3" },
  ];
  const validationSchema = Yup.object().shape({
    Service: Yup.string().required("Required"),
  });
  const onSubmit = (values: forminitialValues, actions: any) => {
    // const facilitydata = {
    //   Service: values.Service,
    // };
    alert(JSON.stringify(values));
    // actions.resetForm({
    //   values: {

    //     Service:""
    //   },
    // });
    axiosPrivate
      .get(`http://210.18.155.251:5003/search/?q=${values.Service}`)
      .then((res) => {
        console.log(res.data);
        // dispatch(dataSearch(res.data.data));
        navigate("/patient/search");
        console.log("i", res);
      })
      .catch((e) => console.log(e));
    // axiosPrivate
    // .get(`http://210.18.155.251:5003/org`)
  };


  //   useEffect(() => {
  //     getData();
  //   }, []);

  //   const getData = async () => {
  //     // const facilityDetails = await axios.get('http://localhost:5200/facility/getFacilityList')
  //     const facilityDetails = await axiosPrivate.get(
  //       `http://localhost:5200/facility/getFacilityByProvider?providerID=${getid.userID}`
  //     );
  //     setData(facilityDetails.data.data);
  //   };

 

  const Pointer = { cursor: "hand" };

  const deleteFacility = async (event: any, id: number) => {
    //event.persist();
  };

  //Table Pagination
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box sx={{ backgroundColor: "primary.light"}}>
      
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          {/* <Box
            sx={{
              width: "100%",
              // height: "160vh",
              backgroundColor: "primary.light",
            }}
          > */}
              {/* <Grid item xs={12} sx={{display:"flex",justifyContent:"center",alignItems:"center",mb:"40px"}}> */}
               <Box sx={{display:"flex",justifyContent:"center"}}>
                <Grid container justifyContent="center" alignItems="center" columnSpacing={5}
                  sx={{
                    padding:"1rem",
                    
                    background: "#4D77FF",
                    // height: "6em",
                   width:"80%"
                    // gap:"1rem",
                 
                  }}
                >
                     <Grid item xs={2.5}>
                  <SelectField
                    container={Select}
                    name="Payer"
                    label="Facility type"
                    selectData={options}
                    sx={{
                    
                      borderRadius:1,
                       ".MuiInputBase-input" : {
                         background: "white"
                       }
                      }}
                  />
                </Grid>
                
                <Grid item xs={3}>
                  <FormTextField
                    container={TextField}
                   
                    name="Service"
                    placeholder="Search Service"
                    type="text"
                    fullWidth={false}
                    sx={{
                     borderRadius:1,
                      ".MuiInputBase-input" : {
                        background: "white"
                      },
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
             <Grid item xs={3}>
                  <FormTextField
                    container={TextField}
                   
                    name="Location"
                    placeholder="location"
                    type="text"
                    fullWidth={false}
                    sx={{
                      borderRadius:1,
                      ".MuiInputBase-input" : {
                        background: "white"
                      },
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
                  <Grid item xs={3}>
                    <Buttoncomponent
                type="submit"
                size="large"
                fullWidth={false}
                variant="contained"
                sx={{
                  // marginTop: "-100px",
                  // ml: "350px",
                  backgroundColor: "secondary.dark",
                  // width: "20vw",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  // gap:"1.2rem",

                  "&:hover": {
                    color: "secondary.dark",
                    border: "1px solid blue",
                    // letterSpacing: "0.2rem",
                    // fontSize: "1rem",
                  },
                }}
              >
                <SearchIcon /> search
              </Buttoncomponent>
                </Grid>
                </Grid>
                </Box>
              {/* </Grid> */}
            
            {/* </Box> */}
            </Form></Formik>

            <Grid container justifyContent="center" display="flex" columnSpacing={5} mt="20px">
              <Grid item  xs={2.5}sx={{ backgroundColor: "primary.dark"}} >
                <Typography variant="h6"sx={{mb:"10px"}} >Filters</Typography>
              <Button
                      variant="contained"
                      sx={{
                        width: "250px",
                        fontSize: "1rem",
                        color: "white",
                        borderRadius:"20px",
                        mb: "20px"
                        // textAlign: "right",
                      }}
                    >
                    Distance
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        width: "250px",
                        fontSize: "1rem",
                        color: "white",
                        borderRadius:"20px",
                        mb: "20px"
                        // textAlign: "right",
                      }}
                    >
                    Quality score
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        width: "250px",
                        fontSize: "1rem",
                        color: "white",
                        borderRadius:"20px",
                        mb: "20px"
                        // textAlign: "right",
                      }}
                    >
                    Negotiated rates
                    </Button>
                
              </Grid>
            <Grid item xs={9}sx={{backgroundColor:"primary.light"}}>
      {searchData.map((dsearch: any, i: any) => (
        <div key={i}>
          <Paper elevation={5}>
            <Card
              raised
              sx={{
                backgroundColor: "RGB(217 229 251)",
                padding: "15px",
                // height: "10em",
                mb: "10px",
              }}
            >
              <Grid container direction="row">
                <Grid xs={9}>
                  <Typography
                    sx={{ fontSize: "1.45rem", color: "black", mb: "30px" }}
                  >
                    {dsearch.FacilityName + " - " + dsearch.FacilityNPI}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "1.2rem", color: "black", mb: "10px" }}
                  >
                    {dsearch.DiagnosisTestorServiceName +
                      " - " +
                      dsearch.ServiceCode}
                  </Typography>
                  {/* <Button variant="contained">Humana</Button>
           <Button variant="contained">Humana</Button>
           <Button variant="contained">Antenna</Button>
           <Button variant="contained">others</Button> */}
                </Grid>
                <Grid xs={3}>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      padding: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        width: "100px",
                        fontSize: "1.35rem",
                        backgroundColor:"#4D77FF",
                        color: "white",
                        mb: "10px",
                        textAlign: "right",
                      }}
                    >
                      {dsearch.FacilityPrices}
                    </Button>
                    <Typography
                      sx={{
                        fontSize: "8px",
                       
                        // width: "100px",
                      }}
                    >
                      Average price
                    </Typography>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-end">
                    <Typography sx={{ fontSize: "1.25rem", color: "black",mr:"60px" }}>
                      eCQMscore:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "2rem", color: "black", mb: "15px" }}
                    >
                      {dsearch.eCQMscore}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Paper>
        </div>
      ))}
    </Grid>
    </Grid>
    </Box>

  

    
  );
}
