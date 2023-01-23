import React from "react";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import healthcare from "../../Images/healthcare.jpg";
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom"

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

// import LocationOnIcon from '@material-ui/icons/LocationOn';
import InputAdornment from "@mui/material/InputAdornment";

interface forminitialValues {
  facilityName: string;
}
const options = [
  { value: "Type1", item: "Type1" },
  { value: "Type2", item: "Type2" },
  { value: "Type3", item: "Type3" },
];
const Patienthomepage = () => {
  const navigate = useNavigate();
  const initialValues: forminitialValues = {
    facilityName: "",
  };
  const validationSchema = Yup.object().shape({
    facilityName: Yup.string().required("Required"),
  });
  const onSubmit = (values: forminitialValues, actions: any) => {
    const facilitydata = {
      facilityName: values.facilityName,
    };
    // alert(JSON.stringify(facilitydata, null, 2));
    actions.resetForm({
      values: {
        facilityName: "",
      },
    });
    axiosPrivate
      .post("http://localhost:5200/facility/createFacility", facilitydata)
      .then((res) => {
        // alert('success')
        toast.success("Successfully Added ");
        console.log("i", res.data);
      })
      .catch((e) => console.log(e));
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
                onClick={() => navigate("/patient/login")}
                sx={{
                  backgroundColor: "secondary.dark",
                  width: "7vw",
                  color: "#fff",
                  ml: "15px",
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
<Grid container sx={{marginBottom:"30px",padding:"10px" }}>
  <Grid>
              {/* <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                item
               
              >
              
                <Typography
                  variant="h3"
                  sx={{
                    display: "flex",
                    color: "#728AB7",
                    fontWeight: "bold",
                    // padding: "20px",
                    marginBottom:"50px"
                  }}
                >

                  I am <Box sx={{ color: "#4D77FF" }}>&ensp;  <Link to="/">Patient </Link> <Link to = "/provider/home">/Provider or Employer</Link></Box>
                </Typography>
               
              </Grid> */}

              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                
                <Grid item xs={4}>
                  <FormTextField
                    container={TextField}
                    label="Service"
                    name="Service"
                    placeholder="Service"
                    type="text"
                    fullWidth={false}
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

                <Grid item xs={4}>
                  <FormTextField
                    container={TextField}
                    label="location"
                    name="location"
                    placeholder="location"
                    type="text"
                    fullWidth={false}
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
                <Grid
                  container
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  item
                >
                  <Buttoncomponent
                    type="submit"
                    size="large"
                    fullWidth={false}
                    variant="contained"
                    sx={{
                      marginTop: "30px",
                      backgroundColor: "secondary.dark",
                      width: "20vw",
                      color: "#fff",
                      display:"flex",
                      justifyContent:"center",
                      gap:"1.2rem",

                      "&:hover": {
                        color: "secondary.dark",
                        border: "1px solid blue",
                        // letterSpacing: "0.2rem",
                        // fontSize: "1rem",
                      },
                    }}
                  >
                 
                  <SearchIcon/>  Find care
                  </Buttoncomponent>


                </Grid>
             
             
              </Grid>
              </Grid>   
       <Grid item sx={{marginLeft:"49px"}}>
      
          <img
            src={healthcare}
            alt="Home"
            style={{
              width: "550px",
              height: "480px",
              //  top: "35px",
              // right: "60%",
              borderRadius: "13px",
            }}
          />
       </Grid>
            </Grid>

            
            <Card
              raised
              sx={{ backgroundColor:"RGB(217 229 251)",padding: "20px",marginTop:"0px",height:"30em",marginBottom:"140px"  }}
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
                  sx={{ color: "#728AB7", padding: "10px",mb:"40px" }}
                >
                  Products
                </Typography>
              </Grid>

             
               <Grid container direction="row" item 
              spacing={10}
              >
                <Grid item xs={4}>
                  <Card raised sx={{ display: "flex", flexDirection: "column",justifyContent:"center",alignItems:"center",padding:"10px",height:"15em"  }}>
                         
                    <CardMedia
                      sx={{width: "100px", height: "90px" }}
                      component="img"
                      image={dashboardicon}
                      title="payer dashboard"
                    />
                    <CardContent>
                      <Typography variant="h6" color="textSecondary" sx={{textAlign:"center"}}>
                        Dashboards for Payer<br></br> negotiated rates
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card raised sx={{ display: "flex", flexDirection: "column",justifyContent:"center",alignItems:"center",padding:"10px",height:"15em"  }}>
                         
                    <CardMedia
                      sx={{width: "100px", height: "90px" }}
                      component="img"
                      image={dashboardicon}
                      // title="payer dashboard"
                    />
                    <CardContent>
                      <Typography variant="h6" color="textSecondary" sx={{textAlign:"center"}}>
                        Dashboards for hospital<br></br> cash price
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card raised sx={{ display: "flex", flexDirection: "column",justifyContent:"center",alignItems:"center",padding:"10px",height:"15em" }}>
                    <CardMedia
                      sx={{ width: "100px", height: "90px" }}
                      component="img"
                      image={dashboardicon}
                      title="payer dashboard"
                    />
                    <CardContent>
                      <Typography variant="h6" color="textSecondary" sx={{textAlign:"center"}}>
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
               sx={{mb:"20px"}}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "#4D77FF", fontWeight: "bold",padding:"5px" }}
                >
                  Providers
                </Typography>
                <Typography variant="h3" sx={{ color: "#728AB7",padding:"5px",letterSpacing:"0.2rem" }}>
                  Help Patients find you
                </Typography>
                <Typography sx={{ padding: "10px", fontSize: "1rem",mt:"15px" }}>
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
                <Grid item xs={3} >
               
                  <Link  to="/provider/urgentcarelogin" style={{textDecoration:"none"}}> 
                  
                  
                  <Card raised sx={{ display: "flex", flexDirection: "column",justifyContent:"center",alignItems:"center",padding:"5px",height:"15em" }} >
                    <CardMedia 
                      sx={{ width: "100px", height: "90px"}}
                      component="img"
                      image={emergency}
                      title="emergency"
                    />
                    <CardContent>
                   
                      <Typography variant="h6" color="textSecondary" sx={{textAlign:"center"}}>
                        Urgent care
                      </Typography>
                    </CardContent>
                  </Card>
                  </Link>
                </Grid>
                <Grid item xs={3}>
                  <Link style={{textDecoration:"none"}}to="/provider/dentalcarelogin" >
                  <Card raised sx={{ display: "flex", flexDirection: "column",justifyContent:"center",alignItems:"center",padding:"5px",height:"15em"}}>
                    <CardMedia
                     sx={{ width: "100px", height: "90px" }}
                      component="img"
                      image={dentallogo}
                      title="dentalcarelogo"
                    />
                    <CardContent>
                      <Typography variant="h6" color="textSecondary" sx={{textAlign:"center"}}>
                        Dental care
                      </Typography>
                    </CardContent>
                  </Card>
                  </Link>
                </Grid>
                <Grid item xs={3}>
                
                <Link style={{textDecoration:"none"}}to="/provider/labcarelogin" >
                  <Card raised sx={{ display: "flex", flexDirection: "column",justifyContent:"center",alignItems:"center",padding:"5px",height:"15em"}}>
                    <CardMedia
                    sx={{ width: "90px", height: "100px" }}
                      component="img"
                      image={lab}
                      title="lab"
                    />
                    <CardContent>
                      <Typography variant="h6" color="textSecondary" sx={{textAlign:"center"}}>
                        Labs
                      </Typography>
                    </CardContent>
                  </Card>
                  </Link>
                </Grid>
                <Grid item xs={3}>
                <Link style={{textDecoration:"none"}}to="/provider/otherslogin" >
                  <Card raised sx={{ display: "flex", flexDirection: "column",justifyContent:"center",alignItems:"center",padding:"5px",height:"15em"}}>
                    <CardMedia
                     sx={{ width: "90px", height: "100px" }}
                      component="img"
                      image={care}
                      title="care"
                    />
                    <CardContent>
                      <Typography variant="h6" color="textSecondary" sx={{textAlign:"center"}}>
                        others
                      </Typography>
                    </CardContent>
                  </Card>
                  </Link>
                </Grid>
              </Grid> 
              
            </Grid>
           <Box sx={{backgroundColor:"RGB(217 229 251)",height:"10em",mt:"50px"}}>
           <Box sx={{ display: "flex", fontWeight: "bold",fontSize:"30px",padding:"50px" }}>
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
