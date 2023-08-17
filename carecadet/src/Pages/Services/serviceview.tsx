import { useEffect, useState } from "react";
import { Paper, Grid,TextField, Box, Typography,Pagination,Collapse,IconButton ,CircularProgress ,TablePagination, Table, TableHead, TableRow, TableCell, TableBody, TableFooter} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

import {
  DataGrid,
  GridColumns,
  GridRow,
  GridColTypeDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { serviceInfo} from "../../Redux/ProviderRedux/serviceSlice";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputAdornment } from "@mui/material";
import { margin } from "@mui/system";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import Avatar from "@mui/material/Avatar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { KeyboardArrowDown, KeyboardArrowUp ,Edit} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import clsx from "clsx";
import { axiosPrivate } from "../../axios/axios";

interface forminitialValues {
  _id: string;
  SNo: string;
  ServiceCode: string;
  DiagnosisTestorServiceName: string;
  Organisationid?: string;
  OrganisationPrices: string;
  FacilityNPI?: string;
  FacilityPrices: string;
  FacilityName?: string;
  GridAlignment: "left" | "right" | "center";
}

interface rowProps{
  fac:any
}
function Row({fac}:rowProps){
//  console.log(fac,"facilityRow")
  const [open,setOpen]=useState<boolean>(false)
return(
  <Box>
      <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown/>}
        </IconButton>{fac.FacilityName}
        <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper sx={{display:"flex",flexDirection:"column",mt:"0.2rem",padding:"1rem"}}>
        <Grid  container item xs={12}>
            <Grid item xs={6} >
            

            <Typography sx={{ color: "blue" }}>ServiceCode </Typography> 
            </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography>
            {fac.ServiceCode}
          </Typography>
        </Grid>
        </Grid>
        
        <Grid  container item xs={12}>
            <Grid item xs={6} >
            

            <Typography sx={{ color: "blue" }}>Organisation Prices </Typography> 
            </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography>$
            {fac.OrganisationPrices}
          </Typography>
        </Grid>
        </Grid>
        <Grid  container item xs={12}>
            <Grid item xs={6} >
            

            <Typography sx={{ color: "blue" }}>Facility Prices </Typography> 
            </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography>$
            {fac.FacilityPrices}
          </Typography>
        </Grid>
        </Grid>

        </Paper>
      </Collapse>
  </Box>
)
}

export default function ServiceViewPage() {
  const [data, setData] = useState([] as forminitialValues[]);
  const [pageSize, setPagesize] = useState(5);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [tabValue, setTabValue] = useState("foi");
  const dispatch = useAppDispatch();
  const itemsPerPage = 5;
  const [page1, setPage1] = useState(1);
  // const facilityid=useAppSelector((state)=>state.editFacility.service);v
  // console.log("facilityid", facilityid);
  // const [totalPages, setTotalPages] = useState(10);
  const [dataCheck,setDataCheck]=useState(false)
  const orgid = useAppSelector((state) => state.providerOrganization.orgEditData);
  const serviceinput = useAppSelector(
    (state: { providerService: { serviceData: any } }) =>
      state.providerService.serviceData
  );
  const facilityinput = useAppSelector(    (state) => state.providerService.serviceData  );
  console.log(serviceinput, "serviceinput");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("start");
    getData();
  }, []);
  const getData = async () => {
    setDataCheck(true)
    const pricelistdetails = await axiosPrivate.get(
      `/service/getPriceListbyService?DiagnosisTestorServiceName=${serviceinput}&Organisationid=${orgid[0].organizationID}`
    );
    const data = pricelistdetails.data.data;
    // if (data.length == 0) {
    //   navigate("/pricelist");
    // } else {
      setDataCheck(false)
    setData(pricelistdetails.data.data);
    // }

    console.log(pricelistdetails.data, "pricelist");
  };
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const usdPrice: GridColTypeDef = {
    type: "number",
    width: 250,
    // valueFormatter: ({ value }) => currencyFormatter.format(value),
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return "";
      }

      const valueFormatted = Number(params.value).toLocaleString();
      return `$ ${valueFormatted} `;
    },
    cellClassName: "font-tabular-nums",
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
  const columns: GridColumns = [
    // {
    //   field: "SNo",
    //   headerName: "S.No",
    //   headerClassName: "super-app-theme--header",
    //   width: 90,
    // },
    {
      field: "ServiceCode",
      headerName: "Service Code",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    // {
    //   field: "DiagnosisTestorServiceName",
    //   headerName: "Diagnosis Test/Service Name",
    //   headerClassName: "super-app-theme--header",
    //   width: 440,
    // },
    {
      field: "FacilityName",
      headerName: "Facility Name",
      headerClassName: "super-app-theme--header",
      // width: 300,
      flex:2,
    },
    {
      field: "FacilityNPI",
      headerName: "FacilityNPI",
      headerClassName: "super-app-theme--header",
      // width: 290,
      flex:1,
    },
    {
      field: "OrganisationPrices",
      headerName: "Organisation Prices",
      headerClassName: "super-app-theme--header",
      // width: 200,
      flex:1,
      align: "right",
      ...usdPrice,
    },

    {
      field: "FacilityPrices",
      headerName: "Facility Prices",
      headerClassName: "super-app-theme--header",
      // width: 500,
      flex:1,
      align: "right",
      ...usdPrice,
    },
  ];

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage1(value);
  };
  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   page: number
  // ) => {
  //   setPage(page);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  const navigateToAdd = () => {
    // This will navigate to second component
    // dispatch(editButton());
    navigate("/provider/service/Pricelist");
  };
  const navigateToEdit = () => {
    // This will navigate to second component
    navigate("/provider/service/ServiceEditpage");
  };

  function CustomRow(props: any) {
    const { className, index, ...other } = props;

    return (
      <GridRow
        index={index}
        className={clsx(className, index % 2 === 0 ? "odd" : "even")}
        {...other}
      />
    );
  }

  return (
    <>
      <Paper
        // elevation={9}
        sx={{
          backgroundColor: "primary.light",
          padding: "0.2rem",
          // borderRadius: "15px",
          // height: "88.8vh",
        }}
      >
        <>
          {/* <TextField
              placeholder="Search"
              sx={{ letterSpacing: "0.2rem", ml: 10, mr: 110 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField> */}
          <Typography
            mb={"0.5rem"}
            sx={{
              backgroundColor: "#B4C8FC",
              padding: "0.7rem",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            {serviceinput} Pricelist
          </Typography>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{
              // gap: "40rem",
              mb: 2,
            }}
          >
            {/* <Buttoncomponent
              type="submit"
              variant="text"
              size="large"
              color="primary"
              // onClick={onSave}
              // onClick={(e) => upload(e)}
              sx={{
                // justifycontent: "right",
                // alignitems: "right",
                textalign: "left",
                // backgroundColor: "secondary.dark",
                width: "50vw",
                // mr: 2,
                color: "black",
                // "&:hover": {
                //   color: "secondary.dark",
                //   border: "1px solid blue",

                //   fontSize: "0.9rem",
                // },
              }}
              onClick={() => {
             
               
                navigate("/provider/service/listservice");
              }}
            >
              {serviceinput}
            </Buttoncomponent> */}

            {/* <Avatar
              sx={{
                // backgroundColor: "secondary.dark",

                borderRadius: "100 100 100 100",

                color: "#fff",
                "&:hover": {
                  color: "secondary.dark",
                  // border: "1px solid blue",
                  letterSpacing: "0.2rem",
                  fontSize: "1rem",
                },
              }}
              onClick={navigateToAdd}
            >
              <AddIcon />
            </Avatar> */}
            <Avatar
              sx={{
                // backgroundColor: "secondary.dark",

                borderRadius: "100 100 100 100",

                color: "#fff",
                "&:hover": {
                  color: "secondary.dark",
                  // border: "1px solid blue",
                  letterSpacing: "0.2rem",
                  fontSize: "1rem",
                },
              }}
              onClick={navigateToEdit}
            >
              <EditIcon />
            </Avatar>
          </Box>
          {!dataCheck?
          <Box>
          <Box
            sx={{
              "& .super-app-theme--header": {
                backgroundColor: "#4D77FF",
              },
              // height: 400,
              width: 1,
              "& .odd": {
                bgcolor: "white",
              },
              "& .even": {
                bgcolor: "secondary.light",
              },
            }}
          >
            <Table
              sx={{ maxWidth: "100%", display: { xs: "none", md: "table" } }}
            >
              <TableHead sx={{ backgroundColor: "#4D77FF" }}>
                <TableRow>
                  {/* <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                providerID
              </TableCell> */}
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                   Service Code
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                   Facility Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                   FacilityNPI
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                   Organization Prices
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                  Facility Prices
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                 ? data.slice((page1 - 1) * itemsPerPage, page1 * itemsPerPage)
                  : data
                ).map((dataPath: any, i: any) => (
                  <TableRow
                    key={i}
                    sx={{
                      backgroundColor: (i + 1) % 2 === 0 ? "#B4C8FC" : "white",
                    }}
                  >
                    {/* <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                  {dataPath.providerID}
                </TableCell> */}
                    <TableCell sx={{ fontSize: "1rem", textAlign: "left" }}>
                      {/* {dataPath.filePath.split("/")[2]} */}
                      {dataPath.ServiceCode}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1rem", textAlign: "left" }}>
                      {/* {dataPath.filePath.split("/")[2]} */}
                      {dataPath.FacilityName}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1rem", textAlign: "left" }}>
                      {/* {dataPath.filePath.split("/")[2]} */}
                      {dataPath.FacilityNPI}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1rem", textAlign: "right" }}>
                      {/* {dataPath.filePath.split("/")[2]} */}
                      
                      {dataPath.OrganisationPrices===null?"":"$"+Number(dataPath.OrganisationPrices).toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1rem", textAlign: "right" }}>
                      {/* {dataPath.filePath.split("/")[2]} */}
                      {dataPath.FacilityPrices===null?"":"$"+Number(dataPath.FacilityPrices).toLocaleString()}
                   
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
            {/* <DataGrid
              autoHeight
              autoPageSize
              getRowId={(row) => row._id}
              rows={data}
              columns={columns}
              pagination={true}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPagesize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              sx={{
                // maxWidth: "100%",
                display:{xs:"none",md:"block"},
                fontSize: "1rem",
                backgroundColor: "lightgray",
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "white",
                },
              }}
              
              components={{ Row: CustomRow }}
            /> */}
          </Box>
          <Box sx={{display:{xs:"flex",md:"none"},flexDirection:"column",gap:"1rem"}}>
          { (rowsPerPage > 0
              ? data.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : data
            ).map((fac:any,i:any)=>(
         
        <Row key={i} fac={fac}/>
    
        ))}
      
      <Box sx={{ mt: "2rem", }} component="span">
              <Pagination
                sx={{ display: "flex", justifyContent: "center"  }}
                //  count={data.length % 5 === 0 ? Math.ceil(data.length / 5) : Math.ceil(data.length / 5 + 1)}
        
                count={Math.ceil(data.length / itemsPerPage)}
                page={page1}
                onChange={handlePageChange}
                defaultPage={6}
                color="primary"
                // boundaryCount={3}
                siblingCount={0}
               
                showFirstButton
                showLastButton
              />
            </Box>
                  </Box> 
                  </Box>:
                  <Box
                  sx={{
                    backgroundColor:"primary.light",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "84vh",
                  }}
                >
                  <Box>
                    <CircularProgress color="inherit" size={50} />
                    <Typography>Loading</Typography>
                  </Box>
                </Box>}
        </>
      </Paper>
    </>
  );
}
