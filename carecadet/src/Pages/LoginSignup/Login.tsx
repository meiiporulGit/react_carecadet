import React from "react";
import { TextField, Box, Typography, Grid } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import login from "../../Images/login.jpg";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
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
  email: yup
    .string()
    .min(2, 'Too Short!')
     .max(50, 'Too Long!')
    .required("Email is a required field")
    .email("Invalid email"),
  password: yup
    .string()
    .required("password is a required field")
    .min(4, "Password must be at least 4 characters")
    .max(50, 'Too Long!')
    .required("Password is a required field")
    
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character")
    .matches(/\d+/, "One number")
});
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ backgroundColor: "#EBF3FA", height: "95vh", mt: "-0.5vh",padding:{xs:"20px",md:"none"} }}>
      <Grid container>
        <Grid item md={7} sx={{ display: "flex", justifyContent: "center" }}>
          <Formik
            validationSchema={schema}
            initialValues={{
              email: "",
              password: "",
              userType: "PROVIDER",
            }}
            onSubmit={(values) => {
              // alert(JSON.stringify(values));
              const Logindata = {
                userName: values.email,
                password: values.password,
                userType: values.userType,
              };
              console.log(Logindata, "values");

              axiosPrivate
                .post("/user/login", Logindata)
                .then((res) => {
                  toast.success(res.data.message);
                  //  localStorage.setItem("userType", JSON.stringify(res.data.data.userType));
                  //  localStorage.setItem("token", JSON.stringify(res.data.data.token));
                  // localStorage.setItem("auth",JSON.stringify(res.data.data))
                  Cookie.set("token", JSON.stringify(res.data.data), {
                    secure: true,
                    sameSite: "strict",
                    path: "/",
                  });
                  // localStorage.setItem("pageUserType",res.data.data.userType)
                  dispatch(storeLoginInfo(res.data.data));
                  dispatch(loginButton());
                  console.log(res);

                  //  window.location = "/profile";
                  // alert("Success");
                  navigate("/provider/facility/viewFacility");
                })
                .catch((err) => {
                  // if (
                  //   err.response &&
                  //   err.response.status >= 400 &&
                  //   err.response.status <= 500
                  // ) {
                  toast.error(err.message);
                  // }
                });
            }}
          >
            <Form >
        
              <Typography variant="h4" sx={{ mt: 12, color: "#728AB7" }}>
                Welcome Provider
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
                  Enter your email and password to login
                </Typography>
              </Grid>

              <Grid>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    mt: 4,
                    color: "#728AB7",
                  }}
                >
                  Email
                </Typography>

                <FormTextField
                  container={TextField}
                  name="email"
                  placeholder="Email"
                  type="email"
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
              <Grid>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                    color: "#728AB7",
                  }}
                >
                  Password
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
                  Login
                </Buttoncomponent>
              </Grid>
              <Typography sx={{ color: "#728AB7" }}>
                Don't have an account.<Link to="/provider/signup">Signup</Link>
              </Typography>
              <Typography sx={{ color: "#728AB7" }}>
              <Link to="/provider/forgotpass">Forgot password</Link>
              </Typography>
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
