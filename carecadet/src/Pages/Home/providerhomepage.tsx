import React from "react";
import { NavLink } from "react-router-dom";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import healthcare from "../../Images/healthcare.jpg";
import SearchIcon from "@mui/icons-material/Search";

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
import { dataSearch } from "../../Redux/ProviderRedux/HomeSlice";
import { toast } from "react-toastify";

import dashboardicon from "../../Images/dashboardicon.png";
import dentallogo from "../../Images/dentallogo.jpg";
import lab from "../../Images/lab.png";
import emergency from "../../Images/emergency.jpg";
import care from "../../Images/care.jpg";

// import LocationOnIcon from '@material-ui/icons/LocationOn';
import InputAdornment from "@mui/material/InputAdornment";

interface forminitialValues {
Service: string;
Location :string;
}
const options = [
  { value: "Type1", item: "Type1" },
  { value: "Type2", item: "Type2" },
  { value: "Type3", item: "Type3" },
];
const Providerhomepage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch=useAppDispatch()
  const initialValues: forminitialValues = {
    Service:"",
    Location:""
  };
  const validationSchema = Yup.object().shape({
    Service: Yup.string().required("Required"),
  });
  const onSubmit = (values: forminitialValues, actions: any) => {
   
    // alert(JSON.stringify(facilitydata, null, 2));
    actions.resetForm({
      values: {
        facilityName: "",
      },
    });
    axiosPrivate
      .get(`http://210.18.155.251:5003/search/?q=${values.Service}` )
      .then((res) => {
        console.log(res.data)
          dispatch(dataSearch(res.data.data))
          navigate("/provider/search")
        console.log("i", res);
      })
      .catch((e) => console.log(e));
  };
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      // elevation={5}
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
            <Grid container justifyContent="flex-end">
              <Buttoncomponent
                type="button"
                size="small"
                fullWidth={false}
                variant="contained"
                onClick={() => navigate("/provider/login")}
                sx={{
                  backgroundColor: "secondary.dark",
                  width: "7vw",
                  color: "#fff",

                  mt: "-260px",
                  mb: "260px",
                  mr: "40px",
                  "&:hover": {
                    color: "secondary.dark",
                    border: "1px solid blue",
                    // letterSpacing: "0.2rem",
                    // fontSize: "1rem",
                  },
                }}
              >
                Sign in
              </Buttoncomponent>
            </Grid>

            {/* <Grid item xs={4}>
                  <SelectField
                    container={Select}
                    name="Payer"
                    label="Payer"
                    selectData={options}
                  />
                </Grid> */}

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

              <Grid item xs={5} sx={{ mt: "-250px" }}>
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
                    color: "#000",
                    border: "1px solid blue",
                    // letterSpacing: "0.2rem",
                    // fontSize: "1rem",
                  },
                }}
              >
                <SearchIcon /> Find Negotiated rates
              </Buttoncomponent>
            </Grid>

            <Card
              raised
              sx={{
                backgroundColor: "RGB(217 229 251)",
                padding: "10px",
                marginTop: "5px",
                height: "35em",
                marginBottom: "80px",
              }}
            >
              <Grid container sx={{ padding: "10px" }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  item
                >
                  <Typography
                    variant="h3"
                    sx={{ color: "#728AB7", padding: "10px", mb: "40px" }}
                  >
                    Products
                  </Typography>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  item
                  spacing={30}
                >
                  <Grid item xs={4}>
                    <Card
                      raised
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        height: "15em",
                        // ,width:"18em"
                      }}
                    >
                      <CardMedia
                        sx={{ width: "100px", height: "90px" }}
                        component="img"
                        image={dashboardicon}
                        title="payer dashboard"
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ textAlign: "center" }}
                        >
                          Dashboards for Payer<br></br> negotiated rates
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card
                      raised
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        height: "15em",
                        mb: "30px",
                      }}
                    >
                      <CardMedia
                        sx={{ width: "100px", height: "90px" }}
                        component="img"
                        image={dashboardicon}
                        title="payer dashboard"
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          sx={{ textAlign: "center" }}
                        >
                          Customized Rate report
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Card>

            <Grid container sx={{ padding: "10px" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                item
                sx={{ mb: "20px" }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "#4D77FF", fontWeight: "bold", padding: "5px" }}
                >
                  Providers
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#728AB7",
                    padding: "5px",
                    letterSpacing: "0.2rem",
                  }}
                >
                  Help Patients find you
                </Typography>
                <Typography
                  sx={{ padding: "10px", fontSize: "1rem", mt: "15px" }}
                >
                  Use our free service to manage your price listing
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                // justifyContent="center"
                // alignItems="center"
                spacing={3}
                item
              >
                <Grid item xs={3}>
                  {/* <Link  to="/provider/urgentcarelogin" style={{textDecoration:"none"}}> */}
                  <Card
                    raised
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "5px",
                      height: "15em",
                    }}
                  >
                    <CardMedia
                      sx={{ width: "100px", height: "90px" }}
                      component="img"
                      image={emergency}
                      title="emergency"
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        sx={{ textAlign: "center" }}
                      >
                        Urgent care
                      </Typography>
                    </CardContent>
                  </Card>
                  {/* </Link> */}
                </Grid>
                <Grid item xs={3}>
                  {/* <Link style={{textDecoration:"none"}}to="/provider/dentalcarelogin" > */}
                  <Card
                    raised
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "5px",
                      height: "15em",
                    }}
                  >
                    <CardMedia
                      sx={{ width: "100px", height: "90px" }}
                      component="img"
                      image={dentallogo}
                      title="dentalcarelogo"
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        sx={{ textAlign: "center" }}
                      >
                        Dental care
                      </Typography>
                    </CardContent>
                  </Card>
                  {/* </Link> */}
                </Grid>
                <Grid item xs={3}>
                  {/* <Link style={{textDecoration:"none"}}to="/provider/labcarelogin" > */}
                  <Card
                    raised
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "5px",
                      height: "15em",
                    }}
                  >
                    <CardMedia
                      sx={{ width: "90px", height: "100px" }}
                      component="img"
                      image={lab}
                      title="lab"
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        sx={{ textAlign: "center" }}
                      >
                        Labs
                      </Typography>
                    </CardContent>
                  </Card>
                  {/* </Link> */}
                </Grid>
                <Grid item xs={3}>
                  {/* <Link style={{textDecoration:"none"}}to="/provider/otherslogin" > */}
                  <Card
                    raised
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "5px",
                      height: "15em",
                    }}
                  >
                    <CardMedia
                      sx={{ width: "90px", height: "100px" }}
                      component="img"
                      image={care}
                      title="care"
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        sx={{ textAlign: "center" }}
                      >
                        others
                      </Typography>
                    </CardContent>
                  </Card>
                  {/* </Link> */}
                </Grid>
              </Grid>
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

export default Providerhomepage;
