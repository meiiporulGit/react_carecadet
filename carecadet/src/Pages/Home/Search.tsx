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
  Container,
  ListItemButton,
  ListItemIcon,
  Collapse,
  ListItemText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Grid, Paper, TextField, Select } from "@mui/material";
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
import { dataSearch } from "../../Redux/ProviderRedux/HomeSlice";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";



export default function ViewFacility() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([] as forminitialValues[]);
  console.log(data, "datinfo");
  const dispatch = useAppDispatch();
  const searchData = useAppSelector((state) => state.homeReducer.searchData);

  interface forminitialValues {
    Service: string;
    Location: string;
  }

  const initialValues: forminitialValues = {
    Service: "",
    Location: "",
  };

  const options = [
    { value: "Type1", item: "Type1" },
    { value: "Type2", item: "Type2" },
    { value: "Type3", item: "Type3" },
  ];
  const optionscheck = [
        {
          name: "10 miles",
          label: "10 miles",
        },
        {
          name: "30 miles",
          label: "30 miles",
        },
        {
          name: "50 miles",
          label: "50 miles",
        },
      ];
  const validationSchema = Yup.object().shape({
    Service: Yup.string().required("Required"),
    Location: Yup.string().required("Required"),
  });
  const onSubmit = (values: forminitialValues, actions: any) => {
    // const facilitydata = {
    //   Service: values.Service,
    // };
    // alert(JSON.stringify(values));
    // actions.resetForm({
    //   values: {

    //     Service:""
    //   },
    // });
    axiosPrivate
      .get(
        `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}`
      )
      .then((res) => {
        console.log(res.data);
        dispatch(dataSearch(res.data.data));
        // navigate("/patient/search");
        console.log("searchi", res);
      })
      .catch((e) => console.log(e));
    // axiosPrivate
    // .get(`http://210.18.155.251:5003/org`)
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Box sx={{ backgroundColor: "primary.light", padding: "1.8rem" }}>
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
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid
              container
              columnSpacing={5}
              sx={{
                padding: "1rem",
                borderRadius: "0.5rem",
                background: "#6D90FE",
                // height: "6em",
                width: "80%",
                // gap:"1rem",
              }}
            >
             

              <Grid item xs={6}>
                <FormTextField
                  container={TextField}
                  name="Service"
                  placeholder="Search Service"
                  type="text"
                  fullWidth={false}
                  sx={{
                    borderRadius: 1,
                    "&::placeholder": {
                      fontSize: "1.1rem",
                      color: "black",
                    },
                    ".MuiInputBase-input": {
                      background: "white",
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
              <Grid item xs={4}>
                <FormTextField
                  container={TextField}
                  name="Location"
                  placeholder="Location"
                  type="text"
                  fullWidth={false}
                  sx={{
                    borderRadius: 1,
                    "&::placeholder": {
                      fontSize: "1.1rem",
                      color: "black",
                    },
                    ".MuiInputBase-input": {
                      background: "white",
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
              <Grid item xs={2}>
                <Buttoncomponent
                  type="submit"
                  size="large"
                  fullWidth={false}
                  variant="contained"
                  sx={{
                    // marginTop: "-100px",
                    // ml: "350px",
                    backgroundColor: "#1C3988",

                    height: "7.3vh",
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
        </Form>
      </Formik>

      <Grid container xs={12} columnGap={5} mt="20px">
        <Grid
          item
          xs={2.5}
          sx={{
            padding: "1rem",
            backgroundColor: "primary.dark",
            display: "flex",
            flexDirection: "column",
            rowGap: "14rem",
          }}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="h6" sx={{ mb: "30px", fontSize: "2rem" }}>
              Filters
            </Typography>
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
                alignItems: "center",
              }}
            > */}
              {/* <Button
                variant="contained"
                sx={{
                  width: "250px",
                  fontSize: "1rem",
                  color: "white",
                  borderRadius: "20px",
                  mb: "20px",
                  // textAlign: "right",
                }}
              >
                Distance
              </Button> */}
              <Box>
            <Paper sx={{ 
              fontSize: "1rem",                  
                  borderRadius: "20px",
                  backgroundColor:"#CDDBF8",
                  mb:"10px"
                 }}>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
                Distance
            </Paper>
            <Collapse in={open} timeout="auto" unmountOnExit>
            <ListItemButton sx={{ pl: 4 }} disableRipple>
            <ListItemIcon>
            <FormControlLabel control={<Checkbox  sx = {{p:0}} onChange={handleChange} disableRipple />} label="10 miles" />
            </ListItemIcon>
            {/* <ListItemText primary="Within 10km" /> */}
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
            <FormControlLabel control={<Checkbox  sx = {{p:0}} onChange={handleChange}/>} label="30 miles" />
            </ListItemIcon>
            {/* <ListItemText primary="Within 10km" /> */}
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
            <FormControlLabel control={<Checkbox sx = {{p:0}} onChange={handleChange}/>} label="50 miles" />
            </ListItemIcon>
            {/* <ListItemText primary="Within 10km" /> */}
          </ListItemButton>
         
            </Collapse>
        </Box>
              <Button
                variant="contained"
                sx={{
                  width: "250px",
                  fontSize: "1rem",
                  color: "white",
                  borderRadius: "20px",
                  mb: "20px",
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
                  borderRadius: "20px",
                  mb: "20px",
                  // textAlign: "right",
                }}
              >
                Negotiated rates
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "250px",
                  fontSize: "1rem",
                  color: "white",
                  borderRadius: "20px",
                  mb: "20px",
                  // textAlign: "right",
                }}
              >
                Facility Type
              </Button>
            {/* </Box> */}
          </Box>
          <Box
            sx={{
              backgroundColor: "#D9D9D9",
              height: "35vh",
              width: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              
            }}
          >
            <Typography sx={{fontSize:"2rem"}} textAlign={"center"}>Map Place holder</Typography>
          </Box>
        </Grid>
        <Grid item xs={9} sx={{ backgroundColor: "#E5EEF7", padding: "4rem" }}>
          {searchData.map((dsearch: any, i: any) => (
            <div key={i}>
              <Paper elevation={3}>
                <Card
                  raised
                  sx={{
                    backgroundColor: "#CDDBF8",
                    padding: "15px",
                    // height: "10em",
                    mb: "2rem",
                  }}
                >
                  <Grid container direction="row">
                    <Grid xs={9}>
                      <Typography
                        sx={{ fontSize: "1.40rem", color: "black", mb: "20px" }}
                      >
                        {
                          dsearch.FacilityName
                          // + " - " + dsearch.FacilityNPI
                        }
                      </Typography>
                      <Typography
                        sx={{ fontSize: "1rem", color: "black", mb: "20px" }}
                      >
                        {dsearch.FacilityDetails?.addressLine1 +
                          "," +
                          dsearch.FacilityDetails?.city +
                          "," +
                          dsearch.FacilityDetails?.state +
                          " - " +
                          dsearch.FacilityDetails?.zipCode}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "1rem", color: "black", mb: "10px" }}
                      >
                        {
                          dsearch.DiagnosisTestorServiceName

                          //+ " - " +
                          // dsearch.ServiceCode
                        }
                      </Typography>
                      <Typography
                        sx={{ fontSize: "1rem", color: "blue", mb: "10px" }}
                      >
                       Distance: {
                          dsearch.distance
                       
                        } miles
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
                        <Box
                          sx={{
                            borderRadius: "0.5rem",
                            padding: "0.5rem",
                            width: "100px",
                            fontSize: "1.35rem",
                            backgroundColor: "#1C3988",
                            color: "white",
                            mb: "10px",
                            textAlign: "center",
                          }}
                        >
                          $ {dsearch.FacilityPrices}
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "15px",

                            // width: "100px",
                          }}
                        >
                          Average price
                        </Typography>
                      </Grid>
                      <Grid container direction="row" justifyContent="flex-end">
                        <Typography
                          sx={{
                            fontSize: "1.25rem",
                            color: "black",
                            mr: "60px",
                          }}
                        >
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
