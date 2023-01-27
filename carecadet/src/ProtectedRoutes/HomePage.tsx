import React from "react";
// import { Route, RouteProps, Navigate, useLocation } from "react-router";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SideNavBar from "../component/SideNav/SideNavComp";
import { Box, Grid, Paper, Typography, Link } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../Redux/Hook";
import { refresh } from "../Redux/ProviderRedux/LoginSlice";

type Props = {
  children: React.ReactNode;
  getData:string
};
const HomePage = ({ children,getData }: Props) => {
  // const dispatch = useAppDispatch();
  // dispatch(refresh());
  const navigate=useNavigate()
  const location = useLocation().pathname.split("/")[1];
  //   const path = location === "" ? "patient" : location;
  const patientUser = useAppSelector(
    (state) => state.patientAuth.patientLogoutButton
  );

  const providerUser=useAppSelector(state=>state.providerAuth.providerLogoutButton)
  

React.useEffect(()=>{
    if(patientUser){
    navigate("/patient/checkPage")
    }
    if(providerUser){
        navigate("/provider/facility/viewFacility")
    }
},[getData])

  // let isAuth=true
  //   return !authUser && path==="patient" ? (
  //     <> {children}</>
  //   ) : (
  //     <Navigate to="/patient/checkPage" replace />
  //   );

  return (
    <Box sx={{ backgroundColor: "primary.light", padding: "1.8rem" }}>
      <Typography
        variant="h3"
        sx={{
          display: "flex",
          gap: "1.3rem",

          color: "#728AB7",
          fontWeight: "bold",
          // padding: "20px",
          //   marginBottom: "50px",
        }}
      >
        I am a
        <Link component={NavLink} to="/" color="black" underline="none">
          <Typography
            variant="h3"
            sx={{
              color: "#4D77FF",
              borderBottom: location === "" ? "2px solid blue" : "none",
              "&:hover": {
                color: "blue",
               
                // letterSpacing: "0.2rem",
                // fontSize: "1rem",
              },
            }}
          >
            Patient
          </Typography>
        </Link>
        or
        <Link
          component={NavLink}
          to="/provider/home"
          color="black"
          underline="none"
        >
          <Typography
            variant="h3"
            sx={{
              color: "#4D77FF",
              borderBottom: location === "provider" ? "2px solid blue" : "none",
              "&:hover": {
                color: "blue",
               
                // letterSpacing: "0.2rem",
                // fontSize: "1rem",
              },
            }}
          >
            Provider
          </Typography>
        </Link>
      </Typography>
      {children}
    </Box>
  );
};

export default HomePage;

// import React from "react";
// import { Route, RouteProps, Navigate } from "react-router";
// import {Paper} from '@mui/material';
// import SideNavBar from './component/SideNav/SideNavComp';
// import "./check.css"

// interface Props {
//   children: JSX.Element;
// }
// const ProtectedRoute = ({ children }: Props) => {
//   const isAuth = true;
//   return isAuth ? <div className="check"><SideNavBar/>{children} </div> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;
