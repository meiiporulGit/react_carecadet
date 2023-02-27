import { useEffect, useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,

} from "@mui/material";
import { Grid, Paper } from "@mui/material";
import axios from "axios";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//comp
import { Buttoncomponent } from "../../Components/Buttoncomp";
//redux store
import { useAppSelector, useAppDispatch } from "../../Redux/Hook";
import { facilityInfo } from "../../Redux/ProviderRedux/facilitySlice";
import { serviceInfo, facilitynameInfo } from "../../Redux/ProviderRedux/serviceSlice";
import { axiosPrivate, baseURL } from "../../axios/axios";
import { ArrowDropDown, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
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
interface facilityProps {
  FacilityDetails: any;

}



export default function ViewFacility() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(-1)
  const [data, setData] = useState([] as forminitialValues[]);
  console.log(data, "datinfo");
  const dispatch = useAppDispatch();
  const getid = useAppSelector(
    (state: { providerAuth: { login: any } }) => state.providerAuth.login
  );

  const facilityinput = useAppSelector(
    (state: { providerFacility: { fData: any } }) => state.providerFacility.fData
  );
  console.log(facilityinput, "viewinput");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // const facilityDetails = await axios.get('http://localhost:5200/facility/getFacilityList')
    const facilityDetails = await axiosPrivate.get(
      `/facility/getFacilityByProvider?providerID=${getid.userID}`
    );
    setData(facilityDetails.data.data);
    dispatch(facilitynameInfo(facilityDetails.data.data))
  };

  const Pointer = { cursor: "hand" };

  // const deleteFacility = async (event: any, id: number) => {
  //   //event.persist();
  //   await axiosPrivate
  //     .delete(
  //       `/facility/deleteFacility?facilityID=${facilityinput.facilityID}`,

  //       facilityinput
  //     )
  //     .then((data) => {
  //       getData();
  //     });
  // };

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
  interface facilityProps {
    forminitialValues: any
  }


  return (
    // <Paper sx={{ backgroundColor: "primary.light" }}>
     <Grid container justifyContent='center' display='flex'>
    <TableContainer
      component={Box}
      // elevation={3}
      sx={{
        //  m:"-20px 0px 0 -20px",
        width: "100%",
        backgroundColor: "primary.light",
        //  borderRadius: '10px',
        //  m: '0em 0 1em 0em',
        //  padding:"1rem 2.5rem 0 2.5rem"
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              padding: { md: "1.2rem" },
              textAlign: "left",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Facility List
          </Typography>
        </Grid>
        <Grid container item xs={12} sm={6} justifyContent={{ xs: "right" }}>
          <Link to="/provider/facility/addFacility" style={{ textDecoration: "none" }}>
            <Buttoncomponent
              fullWidth={false}
              variant="contained"
              type="button"
              // size="large"
              sx={{
                backgroundColor: "secondary.dark",
                width: { xs: "35vw", sm: "12vw" },
                color: "#fff",
                "&:hover": {
                  color: "secondary.dark",
                  border: "1px solid blue",
                },
                m: "1.5rem",
                fontSize: { xs: "0.9rem", md: "1rem" }
                // ml: { xs: 0 }
              }}
            >
              Add Facility
            </Buttoncomponent>
          </Link>
        </Grid>
      </Grid>

      <Grid item sx={{ justifyContent: "center" }}>
        <Table sx={{ maxWidth: "100%", display: { xs: "none", md: "block" } }}>
          <TableHead sx={{ backgroundColor: "secondary.light" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Facility NPI
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  
                  width:{md:"250px"}
                }}
              >
                Facility Name
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  width:{md:"200px"}
                }}
              >
                Facility Type
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  width:{md:"250px"}
                }}
              >
                Address
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  
                }}
              >
                Contact
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  width:{md:"250px"}
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((facility, i) => (
              <TableRow key={facility.facilityNPI} sx={{ backgroundColor: (i + 1) % 2 === 0 ? "#B4C8FC" : "white" }}>
                <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                  {facility.facilityNPI}
                </TableCell>
                <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                  {facility.facilityName}
                </TableCell>
                <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                  {facility.facilityType}
                </TableCell>
                <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                  <p style={{ margin: "0px" }}>
                    {facility.address.addressLine1}
                    <span style={{ marginLeft: "10px" }}>
                      {facility.address.addressLine2}
                    </span>{" "}
                  </p>
                  <p style={{ margin: "0px" }}>
                    {facility.address.city}
                    <span style={{ marginLeft: "10px" }}>
                      {facility.address.state}
                    </span>{" "}
                  </p>
                  <p style={{ margin: "0px " }}>{facility.address.zipCode}</p>
                </TableCell>
                <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                  {facility.contact}
                </TableCell>
                <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                  {facility.email}
                </TableCell>
                <TableCell sx={{  display: "flex" ,marginLeft:"1rem"}}>
                  <IconButton
                    style={Pointer}
                    onClick={() => {
                      dispatch(facilityInfo(facility));
                      // dispatch(editButton())
                      navigate("/provider/facility/update");
                    }}
                  >
                    <EditIcon style={Pointer} />
                  </IconButton>
                  <IconButton
                    style={Pointer}
                    onClick={() => {
                      dispatch(facilityInfo({ facility }));
                      axiosPrivate
                        .delete(
                          `/facility/deleteFacility?facilityNPI=${facility.facilityNPI}`,
                          facilityinput
                        )
                        .then(() => {
                          toast.success("Successfully Deleted");
                          getData();
                        });
                    }}
                  >
                    <DeleteIcon style={Pointer} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      dispatch(serviceInfo(facility));
                      // dispatch(editButton())
                      navigate("/provider/facility/pricelistlanding");
                    }}
                  >
                    <MedicalServicesIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} of ${count !== -1 ? count : ` ${to}}`}`
                }
                backIconButtonProps={{
                  color: "secondary",
                }}
                nextIconButtonProps={{ color: "secondary" }}
                showFirstButton={true}
                showLastButton={true}
                labelRowsPerPage={<span>Rows:</span>}
                sx={{
                  ".MuiTablePagination-toolbar": {
                    backgroundColor: "primary.light",
                    // "rgba(100,100,100,0.5)"
                  },
                  ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
                  {
                    fontWeight: "bold",
                    color: "#173A5E",
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>

        <Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column" }}>
          {data.map((facility, index) => (
            <><Paper sx={{ padding: "0.5rem", m: "0.2rem", fontSize: "0.9rem" }}>

              <IconButton onClick={() => setOpen(open === index ? -1 : index)}>
                <ArrowDropDown sx={{ transform: open === index ? 'initial' : 'rotate(-90deg)' }} />
                {/* {open === index ? (<KeyboardArrowUp />) : (<KeyboardArrowDown />)} */}
              </IconButton>

              {facility.facilityName}

            </Paper>

              <Collapse in={open === index} timeout="auto" unmountOnExit >
                <Paper sx={{ display: "flex", flexDirection: "column", mt: "0.2rem", padding: "1rem" }}>
                  <Typography sx={{ display: "flex" }}> <Typography sx={{ color: "blue", fontSize: "1rem", }}>Facility NPI </Typography><Typography sx={{ ml: "0.2rem", fontSize: "0.9rem" }}>:  {facility.facilityNPI}</Typography></Typography>
                  <Typography sx={{ display: "flex", justifyContent: "flex-start", }}><Typography sx={{ color: "blue", fontSize: "1rem" }}>  Address </Typography><Typography sx={{ ml: "1.5rem", fontSize: "0.9rem" }}>: {facility.address.addressLine1},<br></br><Typography sx={{ ml: "0.5rem", fontSize: "0.9rem" }}>{facility.address.city},{facility.address.state}</Typography><Typography sx={{ ml: "0.5rem", fontSize: "0.9rem" }}>{facility.address.zipCode}</Typography></Typography></Typography>
                  <Typography sx={{ display: "flex" }}><Typography sx={{ color: "blue", fontSize: "1rem" }}>  Email </Typography><Typography sx={{ ml: "0.7rem", fontSize: "0.9rem" }}>:  {facility.email}</Typography></Typography>
                  <Typography sx={{ display: "flex" }}> <Typography sx={{ color: "blue", fontSize: "1rem" }}> Contact </Typography><Typography sx={{ ml: "0.5rem", fontSize: "0.9rem" }}>:  {facility.contact}</Typography></Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}><IconButton
                    style={Pointer}
                    onClick={() => {
                      dispatch(facilityInfo(facility))
                      navigate("/provider/facility/update");
                    }}
                  >
                    <EditIcon style={Pointer} />
                  </IconButton>
                    <IconButton
                      style={Pointer}
                      onClick={() => {
                        dispatch(facilityInfo({ facility }));
                        axiosPrivate
                          .delete(
                            `/facility/deleteFacility?facilityNPI=${facility.facilityNPI}`,
                            facilityinput
                          )
                          .then(() => {
                            toast.success("Successfully Deleted");
                            getData();
                          });
                      }}
                    >
                      <DeleteIcon style={Pointer} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(serviceInfo(facility));
                        navigate("/provider/facility/pricelistlanding");
                      }}
                    >
                      <MedicalServicesIcon />
                    </IconButton></Box>
                </Paper>
              </Collapse></>

          ))}

        </Box>
      </Grid>
    </TableContainer>
     </Grid>
    // </Paper>
  );
}
