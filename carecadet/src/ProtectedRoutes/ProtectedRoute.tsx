import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Box, Grid, Tabs, Tab, Typography, Divider } from "@mui/material";

import OrganizationLandingView from "../Pages/Organization/OrganizationLandingView";
import { useAppSelector, useAppDispatch } from "../Redux/Hook";
import { axiosPrivate } from "../axios/axios";
import { organizationEdit } from "../Redux/ProviderRedux/orgSlice";
import { Buttoncomponent } from "../Components/Buttoncomp";
import { refrestState } from "../Redux/ProviderRedux/orgSlice";
import {
    logoutButton,
    pageUser,
    storeLoginInfo,
  } from "../Redux/ProviderRedux/LoginSlice";
import OrganizationNav from "./OrganizationNav";

interface Props {
  children: JSX.Element;
  getData: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
  };
}

const ProtectedRoute = ({ children, getData }: Props) => {
  const navigate = useNavigate();
  const location=useLocation()

  const dispatch = useAppDispatch();
  const userID = useAppSelector((state) => state.providerAuth.login.userID);
  const authUser = useAppSelector((state) => state.providerAuth);


  const [data, setData] = React.useState<any>([]);
  const [value, setValue] = React.useState(false);
  const path=location.pathname.split("/")[1]

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  //   if (newValue === 0) {
  //     navigate("/viewFacility");
  //   }
  //   if (newValue === 1) {
  //     navigate("/listService");
  //   }
  // };
  

  React.useEffect(() => {
    if (data.length === 0 || getData === "providerorg") {
      setValue(true)
      axiosPrivate
        .get(`/organization/getOrganizationByProvider?providerID=${userID}`)
        .then((res) => {
          const resData = res.data.data;
          if (resData.length === 0) {
            navigate("/provider/org");
            
          } else {
            dispatch(organizationEdit(resData));
            setData(res.data.data);
            setValue(false)
          }
        })
        .catch((err) => console.log(err));
    }
  }, [getData]);

  let isAuth =
    path==="provider" &&
    authUser.login.userType==="PROVIDER"&&
    (authUser.login.token !== null || undefined || "") &&
    authUser.providerLogoutButton;

  return isAuth ? (
    <Grid container columnSpacing={"1rem"}>
   
      <Grid
        item
        xs={2.5}
        sx={{
          display: { xs: "none", md: data.length === 0 ? "none" : "block" },
        }}
      >
        <OrganizationLandingView data={data} />
      </Grid>
     
      <Grid item xs={data.length === 0 ? 12 : 9.5}>
        {getData !== "org" && getData !== "editOrg" ? (
          // <Box sx={{ m: 0, p: 0 }}>
          //   <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          //     <Tabs value={value} onChange={handleChange}>
          //       <Tab label="Facility " {...a11yProps(0)} />
          //       <Tab label="Services" {...a11yProps(1)} />
          //     </Tabs>
          //   </Box>

          //   {value === 0 ? (
          //     <TabPanel value={value} index={0}>
          //       {children}
          //     </TabPanel>
          //   ) : (
          //     <TabPanel value={value} index={1}>
          //       {children}
          //     </TabPanel>
          //   )}
          // </Box>
          value?"....loading":
          <Box display={"flex"} flexDirection="column" gap="0.5rem">
            <OrganizationNav/>
            <Divider/>
            {children}
          </Box>
        ) : (
          <>{children}</>
        )}
      </Grid>
    </Grid>
  ) : (
    <Navigate to="/provider/home" replace />
  );
};

export default ProtectedRoute;
