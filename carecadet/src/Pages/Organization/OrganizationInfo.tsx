import React from "react";
import { useState, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Box, Typography, Grid, Paper, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";

import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { axiosPrivate } from "../../axios/axios";
import OrganizationLandingView from "./OrganizationLandingView";
import { useNavigate } from "react-router-dom";
// import FileUploadService from './Fileupload/FileUpload';
interface InitialValues {
  file: any;
  organizationInformation: {
    providerID: string;
    organizationName: string;
    streetAdd1: string;
    streetAdd2: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    Email: string;
  };
  contactPersonInformation: {
    firstName: string;
    lastName: string;
    role: string;
    contactno: string;
    email: string;
  };
}

const OrganizationInfo = () => {
  const select = useAppSelector((state) => state.providerAuth.login);
  const navigate = useNavigate();

  const [currentFile, setCurrentFile] = useState<any>();

  const [fileName, setFileName] = useState<any>("");

  const fileInput = useRef<any>();
  // console.log(currentFile,'single');

  const initialValues: InitialValues = {
    organizationInformation: {
      providerID: "",
      organizationName: "",
      streetAdd1: "",
      streetAdd2: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      Email: "",
    },
    contactPersonInformation: {
      firstName: "",
      lastName: "",
      role: "",
      contactno: "",
      email: "",
    },
    file: "",
  };
  const SingleFileChange = () => {
    setCurrentFile(fileInput.current.files[0]);
    setFileName(fileInput.current.files[0].name);
  };

  const onSubmit = async (values: InitialValues, actions: any) => {
    let formData = new FormData();
    formData.append("file", currentFile);
    //  formData.append("file", fileName);
    console.log(formData, "formData");
    console.log(currentFile, "curr");
    try {
      axiosPrivate
        .post("organization/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const orgdata = {
            providerID: select.userID,
            organizationName: values.organizationInformation.organizationName,
            orgImg: res.data.data ? res.data.data.filename : "",
            address: {
              addressLine1: values.organizationInformation.streetAdd1,
              addressLine2: values.organizationInformation.streetAdd2,
              city: values.organizationInformation.city,
              state: values.organizationInformation.state,
              zipCode: values.organizationInformation.zipCode,
            },
            email: values.organizationInformation.Email,
            contact: values.organizationInformation.phone,
            contactPerson: {
              firstName: values.contactPersonInformation.firstName,
              lastName: values.contactPersonInformation.lastName,
              role: values.contactPersonInformation.role,
              contact: values.contactPersonInformation.contactno,
              email: values.contactPersonInformation.email,
            },
          };
          // alert(JSON.stringify(orgdata, null, 2));
          console.log(orgdata, "orgdata");
          axiosPrivate
            .post("/organization/createOrganization", orgdata)
            .then((res) => {
              toast.success(res.data.message);
              actions.resetForm({
                values: initialValues,
              });
              navigate("/provider/facility/addFacility");
            })
            .catch((err) => {
              console.log(err, "orgErr");
              toast.error(err.message);
            });
        });
    } catch (err) {
      throw err;
    }
  };

  const validationSchema = Yup.object().shape({
    organizationInformation: Yup.object().shape({
      organizationName: Yup.string().required("Organization Name is required"),
      streetAdd1: Yup.string().required("Address is required"),
      city: Yup.string().required("city is required"),
      state: Yup.string().required("state is required"),
      zipCode: Yup.string().required("zip code is required"),
      Email: Yup.string().required("Email is required").email("invalid email"),
    }),
    contactPersonInformation: Yup.object().shape({
      firstName: Yup.string().required("First Name is a required field"),
      lastName: Yup.string().required("Last Name is required"),
      role: Yup.string().required("Role is a required field"),
      contactno: Yup.string().required("Contact is a required field"),
      email: Yup.string()
        .required("Email is a required field")
        .email("invalid email"),
    }),
  });

  const organizationData = [
    {
      xs: 12,
      label: "Organization Name",
      name: "organizationInformation.organizationName",
      placeholder: "Organization Name",
      type: "text",
    },
    {
      xs: 6,
      label: "Street Address1",
      name: "organizationInformation.streetAdd1",
      placeholder: "Street Address1",
      type: "text",
    },
    {
      xs: 6,
      label: "Street Address2",
      name: "organizationInformation.streetAdd2",
      placeholder: "Street Address2",
      type: "text",
    },
    {
      xs: 4,
      label: "City",
      name: "organizationInformation.city",
      placeholder: "City",
      type: "text",
    },
    {
      xs: 4,
      label: "State",
      name: "organizationInformation.state",
      placeholder: "State",
      type: "text",
    },
    {
      xs: 4,
      label: "Zip Code",
      name: "organizationInformation.zipCode",
      placeholder: "Zip Code",
      type: "text",
    },
    {
      xs: 6,
      label: "Phone",
      name: "organizationInformation.phone",
      placeholder: "Phone Number",
      type: "text",
    },
    {
      xs: 6,
      label: "Email",
      name: "organizationInformation.Email",
      placeholder: "Email",
      type: "email",
    },
  ];
  const contactPersonData = [
    {
      xs: 6,
      label: "First Name",
      name: "contactPersonInformation.firstName",
      placeholder: "First Name",
      type: "text",
    },
    {
      xs: 6,
      label: "Last Name",
      name: "contactPersonInformation.lastName",
      placeholder: "Last Name",
      type: "text",
    },

    {
      xs: 6,
      label: "Role",
      name: "contactPersonInformation.role",
      placeholder: "Role",
      type: "text",
    },
    {
      xs: 6,
      label: "Contact",
      name: "contactPersonInformation.contactno",
      placeholder: "Contact Number",
      type: "text",
    },
    {
      xs: 12,
      label: "Email",
      name: "contactPersonInformation.email",
      placeholder: "Email",
      type: "email",
    },
  ];
  return (
    <Paper
      elevation={9}
      sx={{
        backgroundColor: "primary.light",
        padding: "1.5rem",
        borderRadius: "15px",
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <>
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  mb={"0.5rem"}
                  sx={{
                    backgroundColor: "#B4C8FC",
                    padding: "0.7rem",
                    textAlign: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  Organization Information
                </Typography>
              </Grid>
              <Grid xs={12}>
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    // name="upload-photo"
                    type="file"
                    accept="image/*"
                    ref={fileInput}
                    onChange={SingleFileChange}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    component="span"
                    sx={{ backgroundColor: "#B4C8FC", marginLeft: "1rem" }}
                  >
                    Upload profile image
                  </Button>
                </label>
                <Box component="span" sx={{ marginLeft: "1rem" }}>
                  {fileName}
                </Box>
              </Grid>

              {organizationData.map((org, i) => (
                <Grid item xs={org.xs} key={i}>
                  <Typography
                    // variant="h6"
                    sx={{
                      fontSize: "1.2rem",
                      mb: "0.5rem",
                    }}
                  >
                    {org.label}
                  </Typography>
                  <FormTextField
                    container={TextField}
                    name={org.name}
                    placeholder={org.placeholder}
                    type={org.type}
                    fullWidth={true}
                    sx={{
                      "&::placeholder": {
                        // color: "green",
                        letterSpacing: "0.2rem",
                        // fontSize: "1rem",
                      },
                    }}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Typography
                  mb={"0.5rem"}
                  sx={{
                    backgroundColor: "#B4C8FC",
                    padding: "0.7rem",
                    textAlign: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  Contact Person Information
                </Typography>
              </Grid>
              {contactPersonData.map((person, i) => (
                <Grid item xs={person.xs} key={i}>
                  <Typography
                    // variant="h6"
                    sx={{
                      fontSize: "1.2rem",
                      mb: "0.5rem",
                    }}
                  >
                    {person.label}
                  </Typography>
                  <FormTextField
                    container={TextField}
                    sx={{
                      // boxShadow: "0 0 45px 1px red" ,
                      "&::placeholder": {
                        // color: "green",
                        letterSpacing: "0.2rem",
                        // fontSize: "1rem",
                      },
                    }}
                    name={person.name}
                    placeholder={person.placeholder}
                    type={person.type}
                    fullWidth={true}
                  />
                </Grid>
              ))}

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
        </>
      </Formik>
    </Paper>
  );
};

export default OrganizationInfo;
