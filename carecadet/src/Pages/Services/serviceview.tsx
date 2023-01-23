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
import { serviceInfo} from "../../Redux/ProviderRedux/serviceSlice";
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
  FacilityName?: string;
  GridAlignment: "left" | "right" | "center";
}

export default function ServiceViewPage() {
  const [data, setData] = useState([] as forminitialValues[]);
  const [pageSize, setPagesize] = useState(5);
  const [tabValue, setTabValue] = useState("foi");
  const dispatch = useAppDispatch();
  // const facilityid=useAppSelector((state)=>state.editFacility.service);v
  // console.log("facilityid", facilityid);
  // const [totalPages, setTotalPages] = useState(10);

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
    const pricelistdetails = await axiosPrivate.get(
      `/getPriceListbyService?DiagnosisTestorServiceName=${serviceinput}&Organisationid=${orgid[0].organizationID}`
    );
    const data = pricelistdetails.data.data;
    // if (data.length == 0) {
    //   navigate("/pricelist");
    // } else {
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
      width: 300,
    },
    {
      field: "FacilityNPI",
      headerName: "FacilityNPI",
      headerClassName: "super-app-theme--header",
      width: 290,
    },
    {
      field: "OrganisationPrices",
      headerName: "Organisation Prices",
      headerClassName: "super-app-theme--header",
      width: 200,
      align: "right",
      ...usdPrice,
    },

    {
      field: "FacilityPrices",
      headerName: "Facility Prices",
      headerClassName: "super-app-theme--header",
      width: 500,
      align: "right",
      ...usdPrice,
    },
  ];

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
              gap: "40rem",
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
