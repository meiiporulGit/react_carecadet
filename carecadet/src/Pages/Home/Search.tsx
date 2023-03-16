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
  Radio,
  RadioGroup,
  FormGroup,
} from "@mui/material";
import { Grid, Paper, TextField, Select } from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { values } from "lodash";



export default function ViewFacility() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const [distance, setDistance] = useState("")
const [checkText,setCheckText]=useState<boolean>(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([] as forminitialValues[]);
  const searchData = useAppSelector((state) => state.homeReducer.searchData);
  console.log(searchData, 'searchdata')
const serviceValue = useAppSelector((state)=>state.homeReducer)
console.log('serviceValue',serviceValue)
const [searchqueryData,setSearchqueryData] = useState(searchData);
console.log(searchqueryData,'searchquerydata')
const [search,setSearch] = useState()
  console.log(distance, "datinfo");
  const dispatch = useAppDispatch();
  
  interface forminitialValues {
    Service: any;
    Location: any;
  }

  const q=searchParams.get('q')
  const locationQ=searchParams.get('location')

  const initialValues: forminitialValues = {
    Service: q,
    Location:locationQ ,
  };


  const validationSchema = Yup.object().shape({
    Service: Yup.string().required("Required"),
    Location: Yup.string().required("Required"),
  });
  const onSubmit = (values: forminitialValues, actions: any) => {

    axiosPrivate
      .get(
        `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}`
      )
      .then((res) => {
        console.log(res.data);
        // setSearchqueryData(res.data.data)
        dispatch(dataSearch(res.data.data));
        setSearchParams({q:values.Service,location:values.Location})
        // navigate("/patient/search");
        console.log("searchi", res);
      })
      .catch((e) => console.log(e));

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


  function handleInputChange(event: any) {
    if (event.target.value === distance) {
     setCheckText(false)
      setDistance("");     
    } else {
      setCheckText(true)
      setDistance(event.target.value);
    }
  }

  return (
    <Box sx={{ backgroundColor: "primary.light", padding: "1.8rem" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, setFieldValue, values }) => (<Form>

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
                <Field
                  as={TextField}
                  name="Service"
                  value={values.Service}
                  placeholder="Search Service"
                  type="text"
                  onChange={(e:any)=>{
                    setCheckText(false)
                    setFieldValue("Service",e.target.value)
                  }}
                  fullWidth={true}
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
                <Button
                  type="submit"
                  size="large"
                  fullWidth={false}
                  variant="contained"
                  // onClick={() => { setSelect("searchdata") }}
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
                </Button>
              </Grid>
            </Grid>
          </Box>
          {/* </Grid> */}

          {/* </Box> */}


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

                <Box>
                  <Paper sx={{
                    fontSize: "1rem",
                    borderRadius: "20px",
                    backgroundColor: "#CDDBF8",
                    mb: "10px"
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
                    <Grid item xs={12}>
                      <FormGroup
                      // name="distancefilter"
                      // value={distance}
                      >
                        <FormControlLabel value="10mi"
                          control={<Checkbox
                            checked={distance === "10mi" && checkText }
                            onClick={handleInputChange}
                            onChange={() => {
                              distance != "10mi" ?
                              axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}&distance= 10mi`
                                )
                                .then((res) => {
                                  console.log(res.data, "10miles");
                                  dispatch(dataSearch(res.data.data))
                                  // setSearchqueryData(res.data.data)
                                })
                                .catch((e) => console.log(e)) 
                                 : axiosPrivate
                                  .get(
                                    `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}`
                                  )
                                  .then((res) => {
                                    console.log(res.data);
                                    // setSearchqueryData(res.data.data)
                                     dispatch(dataSearch(res.data.data));
                                    // navigate("/patient/search");
                                    console.log("searchi", res);
                                  })
                                  .catch((e) => console.log(e))
                            }}
                          />}
                          label="10 miles" 
                          labelPlacement="end"/>
                        <FormControlLabel value="20mi"
                          control={<Checkbox
                            checked={distance === "20mi"}
                            onClick={handleInputChange}
                            onChange={() => {
                              axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}&distance= 20mi`
                                )
                                .then((res) => {
                                  console.log(res.data, "20miles");
                                  // dispatch(dataSearch(res.data.data))
                                  setSearchqueryData(res.data.data)
                                })
                                .catch((e) => console.log(e));
                            }} />}
                          label="20 miles" labelPlacement="end"
                          />
                        <FormControlLabel value="30mi"
                          control={<Checkbox
                            checked={distance === "30mi"}
                            onClick={handleInputChange}
                            onChange={() => {
                              axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}&distance= 30mi`
                                )
                                .then((res) => {
                                  console.log(res.data, "30miles");
                                  // dispatch(dataSearch(res.data.data))
                                  setSearchqueryData(res.data.data)
                                })
                                .catch((e) => console.log(e));
                            }} />}
                          label="30 miles" 
                          labelPlacement="end" />

                      </FormGroup>
                    </Grid>
                 
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
                <Typography sx={{ fontSize: "2rem" }} textAlign={"center"}>Map Place holder</Typography>
              </Box>
            </Grid>
            <Grid item xs={9} sx={{ backgroundColor: "#E5EEF7", padding: "4rem" }}>
              {/* {select === 'searchdata' ?                */}
              {searchData.map((dsearch: any, i: any) => (
                <div key={i}>
                  <Paper elevation={3}>
                    <Card
                      raised
                      sx={{
                        backgroundColor: "#CDDBF8",
                        padding: "15px",

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

                            }
                          </Typography>
                          <Typography
                            sx={{ fontSize: "1rem", color: "blue", mb: "10px" }}
                          >
                            Distance: {
                              dsearch.distance
                            } miles
                          </Typography>
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
        </Form>)}

      </Formik>
    </Box>
  );
}
