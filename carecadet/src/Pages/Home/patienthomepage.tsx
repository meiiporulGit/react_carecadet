import React from "react";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import healthcare from "../../Images/healthcare.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";

import {
  Grid,
  Typography,
  Paper,
  TextField,
  Select,
  IconButton,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Menu,
  Link,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../Redux/Hook";
import { pageUser } from "../../Redux/ProviderRedux/LoginSlice";

import { axiosPrivate } from "../../axios/axios";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import SelectField from "../../Components/Select";
import FormTextField from "../../Components/Textfield";
import { toast } from "react-toastify";

import dashboardicon from "../../Images/dashboardicon.png";
import dentallogo from "../../Images/dentallogo.jpg";
import lab from "../../Images/lab.png";
import emergency from "../../Images/emergency.jpg";
import care from "../../Images/care.jpg";
import { dataSearch } from "../../Redux/ProviderRedux/HomeSlice";
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import InputAdornment from "@mui/material/InputAdornment";

interface forminitialValues {
  Service: string;
}

const Patienthomepage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const initialValues: forminitialValues = {
    Service: "",
  };
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
        dispatch(dataSearch(res.data.data));
        navigate("/patient/search");
        console.log("i", res);
      })
      .catch((e) => console.log(e));
    // axiosPrivate
    // .get(`http://210.18.155.251:5003/org`)
  };

  return (
    <Box
      sx={{
        background: "transparent",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Box
            sx={{
              width: "100%",
              // height: "160vh",

              backgroundColor: "primary.light",
            }}
          >
            <Grid
              container
              spacing={1}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ ml: "10px" }}
            >
            <Grid item xs={7}>
                <Box
                  sx={{
                    padding:"1rem",
                    display: "flex",
                    justifyContent:"center",
                    alignItems:"center",
                    background: "#4D77FF",
                    height: "6em",
                    width: "55em",
                    gap:"1rem"
                   
                  }}
                >
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
                </Box>
              </Grid>

              <Grid item xs={3.75} sx={{ mt: "-250px" }}>
                <img
                  src={healthcare}
                  alt="Home"
                  style={{
                    width: "650px",
                    height: "530px",
                    //  top: "35px",
                    // right: "60%",
                    borderRadius: "13px",
                  }}
                />
              </Grid>

              <Buttoncomponent
                type="submit"
                size="large"
                fullWidth={false}
                variant="contained"
                sx={{
                  marginTop: "-100px",
                  ml: "350px",
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
                <SearchIcon /> Find care
              </Buttoncomponent>
            </Grid>

            <Box
              sx={{
                backgroundColor: "RGB(217 229 251)",
                height: "10em",
                mt: "50px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  fontWeight: "bold",
                  fontSize: "30px",
                  padding: "50px",
                }}
              >
                Care<Box sx={{ color: "#4D77FF" }}>Cadet</Box>
              </Box>
            </Box>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default Patienthomepage;
