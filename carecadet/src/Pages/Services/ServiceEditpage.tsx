import { useEffect, useState } from "react";
import { Paper, TextField, Box, Typography, Grid, Button } from "@mui/material";
import axios from "axios";
import {
  GridRowsProp,
  GridValueSetterParams,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridValueFormatterParams,
  GridColumns,
  GridColTypeDef,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRow,
} from "@mui/x-data-grid";
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomUpdatedDate,
//   randomId
// } from "@mui/x-data-grid-generator";
import {
  CheckBoxOutlineBlankSharp,
  ConstructionOutlined,
} from "@mui/icons-material";
import { Routes, Route, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { axiosPrivate } from "../../axios/axios";

interface forminitialValues {
  _id: string;
  SNo: string;
  ServiceCode: string;
  DiagnosisTestorServiceName: string;
  Organisationid?: string;
  OrganisationPrices: string;
  FacilityNPI?: string;
  FacilityName?: string,
  FacilityPrices: string;
  GridAlignment: "left" | "right" | "center";
}

export default function ServiceEditpage() {
  const [data, setData] = useState([] as any);
  const [pageSize, setPagesize] = useState(5);
  const [csvEdit, setcsvEdit] = useState([] as any);
  const [csvdel, setcsvDel] = useState([] as any);
  const [filename, setFilename] = useState("");

  const dispatch = useAppDispatch();
  // const facilityid=useAppSelector((state)=>state.editFacility.service);
  // console.log("facilityid", facilityid);
  // const [totalPages, setTotalPages] = useState(10);
  const orgid = useAppSelector((state) => state.providerOrganization.orgEditData);
  const serviceinput = useAppSelector(
    (state: { providerService: { serviceData: any } }) =>
      state.providerService.serviceData
  );
  console.log(serviceinput, "serviceinput");
  const facilityinput = useAppSelector(    (state) => state.providerService.serviceData  );
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

  const handleDeleteClick = (id: GridRowId) => () => {
    setData(data.filter((row: any) => row._id !== id));
    let store = data.filter((row: any) => row._id === id);
    console.log(store, "store");
    setcsvDel([...csvdel, store._id]);
  };

  const onCellEditCommit = async (cellData: any) => {
    const { id, field, value } = cellData;
    console.log(cellData);
    let d = data.filter((data1: any) => data1._id === id);

    let dd = csvEdit.filter((ddd: any) => ddd._id === id);

    if (dd.length !== 0) {
      let r = csvEdit.map((dd: any) => {
        if (dd._id === id) {
          return { ...dd, [field]: value };
        }

        return dd;
      });
      setcsvEdit(r);
    } else {
      setcsvEdit([...csvEdit, { ...d[0], [field]: value }]);
    }
  };

  function csvJSON(csv: any) {
    console.log("csvdata");
    var lines = csv.split("\r\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj: any = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    setData(result);
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
  const update = (e: any) => {
    e.preventDefault();
    // if(output){
    //    let formData = new FormData();
    //  formData.append("screenshot", output);
    let datacheck = { name: filename, PriceList: csvEdit };
    axiosPrivate
      .put("http://localhost:5200/bulkupdate", datacheck)
      //   let datacheck1 = { name: filename, PriceList: csvdel };
      //   axios

      // .delete(
      //   "http://localhost:5200/bulkdelete", datacheck1

      // )
      .then((res) => {
        alert("success");
        // dispatch(organizationEdit(orgdata))
        navigate("/provider/service/serviceview");
        // actions.resetForm({
        //   values: initialValues,
        // });
      });

    //  }
  };
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const usdPrice: GridColTypeDef = {
    type: "number",
    width: 300,
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
    //   editable: true,
    // },
    {
      field: "ServiceCode",
      headerName: "Service Code",
      headerClassName: "super-app-theme--header",
      width: 200,
      // editable: true,
    },
    // {
    //   field: "DiagnosisTestorServiceName",
    //   headerName: "Diagnosis Test/Service Name",
    //   headerClassName: "super-app-theme--header",
    //   width: 450,
    //   editable: true,
    // },
    {
      field: "FacilityName",
      headerName: "Facility Name",
      headerClassName: "super-app-theme--header",
      width: 220,
    },
    // {
    //   field: "Organisationid",
    //   headerName: "Organisation ID",
    //   headerClassName: "super-app-theme--header",
    //   width: 200,
    // },
    {
      field: "FacilityNPI",
      headerName: "FacilityNPI",
      headerClassName: "super-app-theme--header",
      width: 210,
    },
    {
      field: "OrganisationPrices",
      headerName: "Organisation Prices",
      headerClassName: "super-app-theme--header",
      width: 100,
      editable: true,
      align: "right",
      ...usdPrice,
    },
 
    {
      field: "FacilityPrices",
      headerName: "Facility Prices",
      headerClassName: "super-app-theme--header",
      width: 100,
      editable: true,
      align: "right",
      ...usdPrice,
    },
    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   headerClassName: "super-app-theme--header",
    //   width: 100,
    //   cellClassName: "actions",
    //   getActions: (data: any) => {
    //     let id = data.id;

    //     return [
    //       <GridActionsCellItem
    //         icon={<DeleteIcon />}
    //         label="Delete"
    //         onClick={handleDeleteClick(id)}
    //         color="inherit"
    //       />,
    //     ];
    //   },
    // },
  ];

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

  const navigate = useNavigate();

  const navigateToAdd = () => {
    // This will navigate to second component
    navigate("/provider/service/PricelistUpload");
  };

  return (
    <>
      <Paper
        elevation={9}
        sx={{
          backgroundColor: "primary.light",
          padding: "1.5rem",
          borderRadius: "15px",
          height: "88.8vh",
        }}
      >
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
        {/* <Typography sx={{ fontSize: "1.5rem" }}>
          {" "}
          <div>{serviceinput}</div>
        </Typography> */}
        {/* <Grid container item xs={12} justifyContent="left">
          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              // dispatch(tabValueNav(1));
              navigate("/providerlanding");
            }}
            sx={{
              backgroundColor: "secondary.dark",
              width: "8vw",

              marginBottom: "0.5rem",
              color: "#fff",
              "&:hover": {
                color: "secondary.dark",
                border: "1px solid blue",
              },
            }}
            startIcon={<ArrowBackIcon fontSize="large" />}
          >
            Service Info
          </Button>
        </Grid> */}
        <>
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
              onCellEditCommit={onCellEditCommit}
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
          <Buttoncomponent
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            // onClick={onSave}
            onClick={(e) => update(e)}
            sx={{
              mt: 2,
              backgroundColor: "secondary.dark",
              width: "10vw",
              color: "#fff",
              "&:hover": {
                color: "secondary.dark",
                border: "1px solid blue",
                letterSpacing: "0.2rem",
                fontSize: "1rem",
              },
            }}
          >
            Save
          </Buttoncomponent>
          {/* {JSON.stringify(csvEdit)}
          <br />

          {JSON.stringify(csvdel)} */}
        </>
      </Paper>
    </>
  );
}
