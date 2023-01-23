import { Box, Typography, Link, Grid } from "@mui/material";
import React from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../Redux/Hook";
import { logoutButton } from "../Redux/ProviderRedux/LoginSlice";
import { refrestState } from "../Redux/ProviderRedux/orgSlice";

import { axiosPrivate } from "../axios/axios";
import { toast } from "react-toastify";

const OrganizationNav = () => {
  const location = useLocation().pathname.split("/")[2];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = useAppSelector(
    (state) => state.providerAuth.providerLogoutButton
  );
  const userID=useAppSelector((state)=>state.providerAuth.login.userID)
  const userName=useAppSelector(state=>state.providerAuth.login.userName)
 
  return (
    <Box display={"flex"}>
      <Box display={"flex"} gap="2rem">
        <Link
          to="/provider/facility/viewFacility"
          component={NavLink}
          underline="none"
        >
          <Typography
            sx={{
              color: location === "facility" ? "#4D77FF" : "default",
              fontSize: "1.1rem",
              borderBottom: location === "facility" ? "3px solid blue" : "none",
              padding: "0.3rem",
            
              cursor:"pointer"
            }}
          >
            Facility
          </Typography>
        </Link>
        <Link
          to="/provider/service/listService"
          component={NavLink}
          underline="none"
        >
          <Typography
            sx={{
              color: location === "service" ? "#4D77FF" : "default",
              fontSize: "1.1rem",
              borderBottom: location === "service" ? "3px solid blue" : "none",
              padding: "0.3rem",
              cursor:"pointer"
            }}
          >
            Service
          </Typography>
        </Link>
        <Link
          to="/provider/serviceView/serviceView"
          component={NavLink}
          underline="none"
        >
          <Typography
            sx={{
              color: location === "serviceView" ? "#4D77FF" : "default",
              fontSize: "1.1rem",
              borderBottom: location === "serviceView" ? "3px solid blue" : "none",
              padding: "0.3rem",
              cursor:"pointer"
            }}
          >
            ServiceDetails
          </Typography>
        </Link>
      </Box>
     
    </Box>
  );
};

export default OrganizationNav;
