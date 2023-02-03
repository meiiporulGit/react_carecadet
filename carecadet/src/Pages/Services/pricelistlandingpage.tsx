import { useEffect, useState } from "react";
import { Paper, TextField, Box, Typography } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

import {
  DataGrid,
  GridColumns,
  GridRow,
  GridColTypeDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputAdornment } from "@mui/material";
import { margin } from "@mui/system";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import Avatar from "@mui/material/Avatar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";

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
  GridAlignment: "left" | "right" | "center";
}

export default function Pricelistlandingpage() {
  const [data, setData] = useState([] as forminitialValues[]);
  const [pageSize, setPagesize] = useState(5);
  const dispatch = useAppDispatch();
  // const facilityid=useAppSelector((state)=>state.editFacility.service);
  // console.log("facilityid", facilityid);
  // const [totalPages, setTotalPages] = useState(10);

  const orgid = useAppSelector(
    (state) => state.providerOrganization.orgEditData
  );
  const facilityinput = useAppSelector(
    (state) => state.providerService.serviceData
  );

  console.log(facilityinput, "facip");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("start");
    getData();
  }, []);
  const getData = async () => {
    const pricelistdetails = await axiosPrivate.get(
      `/getPriceListbyFacility?facilityNPI=${facilityinput.facilityNPI}&Organisationid=${orgid[0].organizationID}`
    );
    const data = pricelistdetails.data.data;
    if (data.length == 0) {
      navigate("/provider/facility/pricelistthrofacility");
    } else {
      setData(pricelistdetails.data.data);
    }

    console.log(pricelistdetails.data, "pricelist");
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const usdPrice: GridColTypeDef = {
    type: "number",
    width: 240,
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
    {
      field: "DiagnosisTestorServiceName",
      headerName: "Diagnosis Test/Service Name",
      headerClassName: "super-app-theme--header",
      width: 405,
    },
    // {
    //   field: "FacilityName",
    //   headerName: "Facility Name",
    //   headerClassName: "super-app-theme--header",
    //   width: 170,
    // },
    // {
    //   field: "Organisationid",
    //   headerName: "Organisation ID",
    //   headerClassName: "super-app-theme--header",
    //   width: 200,
    // },
    {
      field: "OrganisationPrices",
      headerName: "Organisation Prices",
      headerClassName: "super-app-theme--header",
      width: 200,
      type: "number",
      align: "right",
      ...usdPrice,
    },
    {
      field: "FacilityNPI",
      headerName: "FacilityNPI",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "FacilityPrices",
      headerName: "Facility Prices",
      headerClassName: "super-app-theme--header",
      width: 200,
      type: "number",
      align: "right",
      ...usdPrice,
    },
  ];

  const navigateToAdd = () => {
    // This will navigate to second component
    // dispatch(editButton());
    navigate("/provider/facility/Pricelistthrofacility");
  };
  const navigateToEdit = () => {
    // This will navigate to second component
    navigate("/provider/facility/PricelistEdit");
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
            {facilityinput.facilityName} Pricelist
          </Typography>
          {/* <Buttoncomponent
            type="submit"
            variant="text"
            size="large"
            // color="primary"
            // onClick={onSave}
            // onClick={(e) => upload(e)}
            sx={{
              justifycontent: "left",
              alignitems: "left",
              textalign: "left",
              // backgroundColor: "secondary.dark",
              width: "20vw",
              // mr: 2,
              color: "black",
              // "&:hover": {
              //   color: "secondary.dark",
              //   border: "1px solid blue",

              //   fontSize: "0.9rem",
              // },
            }}
            onClick={() => {
              // dispatch(editButton());
              // dispatch(tabValueNav(1));
              navigate("/provider/facility/viewfacility");
            }}
          >
            {facilityinput.facilityName}
          </Buttoncomponent> */}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{
              gap: "2rem",
              mb: 2,
            }}
          >
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
              onClick={navigateToAdd}
            >
              <AddIcon />
            </Avatar>
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
          <Box
            sx={{
              "& .super-app-theme--header": {
                backgroundColor: "#4D77FF",
              },
              height: 400,
              width: 1,
              "& .odd": {
                bgcolor: "white",
              },
              "& .even": {
                bgcolor: "secondary.light",
              },
            }}
          >
            <DataGrid
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
                fontSize: "1rem",
                backgroundColor: "lightgray",
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "white",
                },
              }}
              components={{ Row: CustomRow }}
            />
          </Box>
        </>
      </Paper>
    </>
  );
}
