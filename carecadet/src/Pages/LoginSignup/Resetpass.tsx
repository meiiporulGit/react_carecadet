import React from "react";
import { TextField, Box, Typography, Grid } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import login from "../../Images/login.jpg";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom'
import Cookie from "js-cookie";

import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";

import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import {
  loginButton,
  storeLoginInfo,
} from "../../Redux/ProviderRedux/LoginSlice";
import { axiosPrivate } from "../../axios/axios";

const schema = yup.object().shape({
 
  password: yup
    .string()
    .required("password is a required field")
    .min(4, "password must be at least 4 characters"),
});
export default function Resetpass() {
    const [searchParams, setSearchParams] = useSearchParams();

    // console.log("searchParams",searchParams.get("resettoken"));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ backgroundColor: "#EBF3FA", height: "95vh", mt: "-0.5vh",padding:{xs:"20px",md:"none"} }}>
      <Grid container>
        <Grid item md={7} sx={{ display: "flex", justifyContent: "center" }}>
            
          <Formik
            // validationSchema={schema}
            initialValues={{
            
              password: "",
              userType: "PROVIDER",
            }}
            
            onSubmit={(values) => {

                let searchquery = searchParams.get("resettoken")
                console.log("searchquery",searchquery)
              // alert(JSON.stringify(values));
              const Resetdata = {
                resetLink: searchquery,
                newPass: values.password,
                userType: values.userType,
              };
              console.log(Resetdata, "values");

              axiosPrivate
                .put("/provider/resetpassword", Resetdata)
                .then((res) => {
                  toast.success(res.data.message);
                 
                  navigate("/provider/login");
                })
                .catch((err) => {
                 
                  toast.error(err.message);
               
                });
            }}
          >
            <Form >
        
              <Typography variant="h4" sx={{ mt: 12, color: "#728AB7" }}>
                Reset Password
              </Typography>

              <Grid>
                <Typography
                  variant="h6"
                  sx={{ mt: 1, color: "#728AB7" }}
                  // mb={"0.5rem"}
                  // sx={{
                  //   backgroundColor: "secondary.light",
                  //   padding: "0.7rem",
                  //   textAlign: "center",
                  //   fontSize: "1.5rem",
                  // }}
                >
                  Enter your new password to reset
                </Typography>
              </Grid>

             
              <Grid>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                    color: "#728AB7",
                  }}
                >
                New  Password
                </Typography>
                <FormTextField
                  container={TextField}
                  name="password"
                  placeholder="Password"
                  type="password"
                  autoComplete="new-country-area"
                  sx={{
                    width: {md:"20vw"},
                    "&::placeholder": {
                      color: "#728AB7",
                      letterSpacing: "0.2rem",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <Buttoncomponent
                  type="submit"
                  size="large"
                  fullWidth={false}
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "secondary.dark",
                    width: "20vw",
                    color: "#fff",
                    "&:hover": {
                      color: "secondary.dark",
                      border: "1px solid blue",
                      letterSpacing: "0.2rem",
                      fontSize: "1rem",
                    },
                  }}
                >
                 Reset password
                </Buttoncomponent>
              </Grid>
                          
            </Form>
          </Formik>
        </Grid>
        <Grid
          item
          md={5}
          sx={{
            display: {xs:"none",md:"flex"},
            justifyContent: "center",
            alignItems: "center",
            mt: 8,
          }}
        >
          <img
            src={login}
            alt="login"
            style={{
              width: "450px",
              height: "567px",
              //  top: "35px",
              // right: "20px",
              borderRadius: "13px",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
