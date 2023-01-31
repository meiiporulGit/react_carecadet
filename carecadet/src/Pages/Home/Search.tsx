import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Card,
  Typography,
} from "@mui/material";
import { Grid, Paper } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//comp
import { Buttoncomponent } from "../../Components/Buttoncomp";
//redux store
import { useAppSelector, useAppDispatch } from "../../Redux/Hook";

import { axiosPrivate } from "../../axios/axios";
// import {editButton} from "../../Redux/LoginSlice"

interface forminitialValues {
  providerID: string;
  facilityID: string;
  facilityNPI?: string;
  facilityName: string;
  facilityType: string;
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: string;
  email: string;
}

export default function ViewFacility() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([] as forminitialValues[]);
  console.log(data, "datinfo");
  const dispatch = useAppDispatch();
  const searchData = useAppSelector((state) => state.homeReducer.searchData);

  //   useEffect(() => {
  //     getData();
  //   }, []);

  //   const getData = async () => {
  //     // const facilityDetails = await axios.get('http://localhost:5200/facility/getFacilityList')
  //     const facilityDetails = await axiosPrivate.get(
  //       `http://localhost:5200/facility/getFacilityByProvider?providerID=${getid.userID}`
  //     );
  //     setData(facilityDetails.data.data);
  //   };

  const Pointer = { cursor: "hand" };

  const deleteFacility = async (event: any, id: number) => {
    //event.persist();
  };

  //Table Pagination
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    // <Paper sx={{ backgroundColor: "primary.light" }}>
    // <Grid container justifyContent='center' display='flex'>
    // <TableContainer
    //   component={Paper}
    //   // elevation={3}
    //   sx={{
    //     //  m:"-20px 0px 0 -20px",

    //     width: "100%",
    //     backgroundColor: "primary.light",
    //     //  borderRadius: '10px',
    //     //  m: '0em 0 1em 0em',
    //     //  padding:"1rem 2.5rem 0 2.5rem"
    //   }}
    // >
    //   <Grid container>
    //     <Grid item xs={12} sm={6}>
    //       <Typography
    //         sx={{
    //           padding: "1.5rem",
    //           textAlign: "left",
    //           fontSize: "1.2rem",
    //           fontWeight: "bold",
    //         }}
    //       >
    //        Service List
    //       </Typography>
    //     </Grid>

    //   </Grid>

    //   <Grid item sx={{ justifyContent: "center" }}>
    //     <Table sx={{ maxWidth: "100%" }}>
    //       <TableHead sx={{ backgroundColor: "secondary.light" }}>
    //         <TableRow>
    //           <TableCell
    //             sx={{
    //               fontSize: "1rem",
    //               fontWeight: "bold",
    //               textAlign: "center",
    //             }}
    //           >
    //             Service code
    //           </TableCell>
    //           <TableCell
    //             sx={{
    //               fontSize: "1rem",
    //               fontWeight: "bold",
    //               textAlign: "center",
    //             }}
    //           >
    //             Service Name
    //           </TableCell>
    //           <TableCell
    //             sx={{
    //               fontSize: "1rem",
    //               fontWeight: "bold",
    //               textAlign: "center",
    //             }}
    //           >
    //             Facility Name
    //           </TableCell>
    //           <TableCell
    //             sx={{
    //               fontSize: "1rem",
    //               fontWeight: "bold",
    //               textAlign: "center",
    //             }}
    //           >
    //             Facility NPI
    //           </TableCell>
    //           <TableCell
    //             sx={{
    //               fontSize: "1rem",
    //               fontWeight: "bold",
    //               textAlign: "center",
    //             }}
    //           >
    //             Organization Prices
    //           </TableCell>
    //           <TableCell
    //             sx={{
    //               fontSize: "1rem",
    //               fontWeight: "bold",
    //               textAlign: "center",
    //             }}
    //           >
    //             Facility Prices
    //           </TableCell>

    //         </TableRow>
    //       </TableHead>

    //       <TableBody>
    //         {(rowsPerPage > 0
    //           ? searchData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //           : searchData
    //         ).map((facility:any) => (
    //           <TableRow key={facility.facilityNPI}>
    //             <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
    //               {facility.ServiceCode}
    //             </TableCell>
    //             <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
    //               {facility.DiagnosisTestorServiceName}
    //             </TableCell>
    //             <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
    //               {facility.FacilityName}
    //             </TableCell>

    //             <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
    //               {facility.FacilityNPI}
    //             </TableCell>
    //             <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
    //               {facility.OrganisationPrices}
    //             </TableCell>
    //             <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
    //               {facility.FacilityPrices}
    //             </TableCell>

    //           </TableRow>
    //         ))}
    //       </TableBody>
    //       <TableFooter>
    //         <TableRow>
    //           <TablePagination
    //             rowsPerPageOptions={[5, 10, 25]}
    //             count={data.length}
    //             rowsPerPage={rowsPerPage}
    //             page={page}
    //             onPageChange={handleChangePage}
    //             onRowsPerPageChange={handleChangeRowsPerPage}
    //             labelDisplayedRows={({ from, to, count }) =>
    //               `${from}-${to} of ${count !== -1 ? count : ` ${to}}`}`
    //             }
    //             backIconButtonProps={{
    //               color: "secondary",
    //             }}
    //             nextIconButtonProps={{ color: "secondary" }}
    //             showFirstButton={true}
    //             showLastButton={true}
    //             labelRowsPerPage={<span>Rows:</span>}
    //             sx={{
    //               ".MuiTablePagination-toolbar": {
    //                 backgroundColor: "primary.light",
    //                 // "rgba(100,100,100,0.5)"
    //               },
    //               ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
    //                 {
    //                   fontWeight: "bold",
    //                   color: "#173A5E",
    //                 },
    //             }}
    //           />
    //         </TableRow>
    //       </TableFooter>
    //     </Table>
    //   </Grid>
    // </TableContainer>
    // </Grid>
    // </Paper>

    <Box>
      {searchData.map((dsearch: any, i: any) => (
        <div key={i}>
          <Card raised sx={{ padding: "10px" }}>
            <Card
              raised
              sx={{
                backgroundColor: "RGB(217 229 251)",
                padding: "20px",
                height: "10em",
                mb: "10px",
              }}
            >
              <Grid container direction="row">
                <Grid xs={9}>
                  <Typography
                    sx={{ fontSize: "2rem", color: "black", mb: "10px" }}
                  >
                    {dsearch.FacilityName + " - " + dsearch.FacilityNPI}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "1.25rem", color: "black", mb: "10px" }}
                  >
                    {dsearch.DiagnosisTestorServiceName +
                      " - " +
                      dsearch.ServiceCode}
                  </Typography>
                  {/* <Button variant="contained">Humana</Button>
           <Button variant="contained">Humana</Button>
           <Button variant="contained">Antenna</Button>
           <Button variant="contained">others</Button> */}
                </Grid>
                <Grid xs={3}>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        width: "100px",
                        fontSize: "1.75rem",
                        color: "white",
                        mb: "10px",
                        textAlign: "right",
                      }}
                    >
                      {dsearch.FacilityPrices}
                    </Button>
                    <Typography
                      sx={{
                        fontSize: "8px",
                        textAlign: "right",
                        width: "100px",
                      }}
                    >
                      Average price
                    </Typography>
                  </Grid>
                  <Grid container direction="row">
                    <Typography sx={{ fontSize: "1.25rem", color: "black" }}>
                      eCQMscore:
                    </Typography>
                    <Typography
                      sx={{ fontSize: "2rem", color: "black", mb: "15px" }}
                    >
                      {dsearch.eCQMscore}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        </div>
      ))}
    </Box>
  );
}
