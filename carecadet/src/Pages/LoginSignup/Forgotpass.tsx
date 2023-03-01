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
    .required("Email is a required field")
    .email("Invalid email")

});
export default function Forgotpass() {
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
              userType: "PROVIDER"
            
            }}
            onSubmit={(values) => {
              
              const Resetpass = {
                email: values.email,
              
              };
              console.log(Resetpass, "Resetpass");

              axiosPrivate
                .put("/provider/forgotpassword", Resetpass)
                .then((res) => {
                  
                  toast.success(res.data.message);
              
                //   Cookie.set("token", JSON.stringify(res.data.data), {
                //     secure: true,
                //     sameSite: "strict",
                //     path: "/",
                //   }
                //   );
                 
                //   dispatch(storeLoginInfo(res.data.data));
                //   dispatch(loginButton());
                //   console.log(res);
         
                //   navigate("/provider/resetpass");
                })
                .catch((err) => {
                  
                  toast.error(err.message);
                 
                });
            }}
          >
            <Form >
        
              <Typography variant="h4" sx={{ mt: 12, color: "#728AB7" }}>
               Account Details
              </Typography>

              <Grid>
                <Typography
                  variant="h6"
                  sx={{ mt: 1, color: "#728AB7" }}
                
                >
                  Enter your email used for Sign up
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
                  autoComplete="text"
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
                  Recovery Email
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
