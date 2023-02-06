import React, { FC, ReactNode } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";


interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }:LayoutProps) => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
         
          // minHeight: "100vh",
          // maxWidth: "100vw",
          // flexGrow: 1,
        }}
      >
        <Navbar />
       <Box sx ={{marginTop:"10vh"}}>{children}</Box> 
    
      </Box>
    </>
  );
};

export default Layout;