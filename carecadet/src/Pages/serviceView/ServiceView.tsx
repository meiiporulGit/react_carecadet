import React, { useState, useEffect } from "react";
import { axiosPrivate } from "../../axios/axios";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";

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
  Typography,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import { ViewInfo } from "../../Redux/ProviderRedux/serviceViewSlice";
import { useNavigate } from "react-router-dom";
import { Buttoncomponent } from "../../Components/Buttoncomp";

const ServiceView = () => {
  const [pathData, setPathData] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const providerID = useAppSelector((state) => state.providerAuth.login.userID);
  const orgID = useAppSelector(
    (state) => state.providerOrganization.orgEditData
  );
  useEffect(() => {
    getData();
  }, []);
  // setInterval(() => {
  //   getData();
  // }, 60000);
  const getData = () => {
    axiosPrivate
      .get(
        `/pathPricelist/getPathByProvider?providerID=${providerID}&OrganizationID=${orgID[0].organizationID}`
      )
      .then((res) => {
        setPathData(res.data.data);
        console.log(res.data);
      });
  };
  const viewOnClick = (path: any) => {
    if (path.status === "Pending") {
      toast.error("not verified");
    } else {
      dispatch(ViewInfo(path));
      navigate("/provider/serviceView/publishservice");
    }
  };
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
    <Box sx={{ backgroundColor: "primary.light", padding: "1.8rem" }}>
      {/* {pathData.map((path: any, i: any) => (
        <Paper
          elevation={3}
          key={i}
       
          sx={{ backgroundColor: "primary.light", padding: "1.8rem" }}
          onClick={() => {viewOnClick(path)}}
        >
          <Typography>{path.providerID}</Typography>
          <Typography>{path.filePath.split("/")[2]}</Typography>
          <Typography>{path.status}</Typography>
        </Paper>
      ))} */}
      <Grid container item sx={{ justifyContent: "center" }}>
        <Table sx={{ maxWidth: "100%" }}>
          <TableHead sx={{ backgroundColor: "secondary.light" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                providerID
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                File Name
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? pathData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : pathData
            ).map((dataPath: any,i:any) => (
              <TableRow key={i}>
                <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                  {dataPath.providerID}
                </TableCell>
                <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                  {dataPath.filePath.split("/")[2]}
                </TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                  <Buttoncomponent
                    type="button"
                    disable={dataPath.status === "verified" ? false : true}
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor:
                        dataPath.status === "verified" ? "green" : "red",
                      width: "12vw",
                      color: "#fff",
                      "&:hover": {
                        color: "secondary.dark",
                        border: "1px solid blue",
                      },
                    }}
                    onClick={() => {
                      viewOnClick(dataPath);
                      // dispatch(facilityInfo(facility));
                      // dispatch(editButton())
                      // navigate("/provider/facility/update");
                    }}
                  >
                    {dataPath.status}
                  </Buttoncomponent>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={pathData.length}
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
      </Grid>
    </Box>
  );
};

export default ServiceView;
