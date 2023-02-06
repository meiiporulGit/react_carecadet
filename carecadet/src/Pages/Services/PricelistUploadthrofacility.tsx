import * as React from "react";
import { useState } from "react";
import { Grid, Typography, Button, Paper, Box, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router";

import {
  DataGrid,
  GridColTypeDef,
  GridValueFormatterParams,
  GridColumns,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { axiosPrivate } from "../../axios/axios";
// import { parse } from "csv-parse/browser/esm/sync";
import { orgid } from "../../Redux/ProviderRedux/orgSlice";
import { toast } from "react-toastify";
import { ContentPasteSearchOutlined } from "@mui/icons-material";
type cvsItem = {
  id: string;
  SNo: string;
  value: string;
  GridAlignment: "left" | "right" | "center";
};

export default function PricelistUploadthroFacility() {
  const [csvData, setCsvData] = useState<cvsItem[]>([]);
  const [filename, setFilename] = useState("");
  const [pageSize, setPagesize] = useState(5);
  const [columns, setColumns] = useState<any>([]);
  const [unknownHeader, setUnknownHeader] = useState<boolean>(false);
  const navigate = useNavigate();

  const data = useAppSelector((state) => state.providerAuth.login);

  console.log(data, "dat");
  console.log(csvData, "checkd");
  // organizationID: select.organizationID,

  const orgid = useAppSelector(
    (state) => state.providerOrganization.orgEditData
  );
  console.log("orgid", orgid[0].organizationID);
  const facilityinput = useAppSelector(
    (state) => state.providerService.serviceData
  );
  const emailData = useAppSelector((state) => state.providerAuth.login);
  console.log(facilityinput, "facip");

  const knownObj = [
    {
      headerName: "ServiceCode",
      headerType: "string",
      maxLength: 32,
    },
    {
      headerName: "SNo",
      headerType: "string",
      maxLength: 32,
    },
    {
      headerName: "DiagnosisTestorServiceName",
      headerType: "string",
      maxLength: 32,
    },

    {
      headerName: "OrganisationPrices",
      headerType: "string",
      maxLength: 32,
    },
    {
      headerName: "FacilityPrices",
      headerType: "string",
      maxLength: 32,
    },
  ];

  const usdPrice: GridColTypeDef = {
    type: "number",
    width: 130,
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

  const columnsFormat: GridColumns = [
    {
      field: "SNo",
      headerName: "S.No",
      editable: false,
      width: 100,
    },
    {
      field: "ServiceCode",
      headerName: "Service Code",
      editable: true,
      width: 100,
    },
    {
      field: "DiagnosisTestorServiceName",
      headerName: "Diagnosis Test/Service Name",
      editable: true,
      width: 350,
    },
    {
      field: "FacilityName",
      headerName: "Facility Name",
      editable: false,
      width: 100,
    },
    {
      field: "OrganisationPrices",
      headerName: "Organisation Prices",
      editable: true,
      width: 100,
      align: "right",
      ...usdPrice,
    },
    {
      field: "FacilityNPI",
      headerName: "FacilityNPI",
      editable: false,
      width: 100,
    },
    {
      field: "FacilityPrices",
      headerName: "Facility Prices",
      editable: true,
      width: 100,
      align: "right",
      ...usdPrice,
    },
  ];

  const onCellEditCommit = (cellData: any) => {
    const { id, field, value } = cellData;
    console.log(cellData);
    let r = csvData.map((data) => {
      if (data.SNo === id) {
        // if (field === "Sno") {
        //   return { ...data, value: value };
        // }
        return { ...data, [field]: value };
        // if (field === "Service Code") {
        //   return { ...data, ["Service Code"]: value };
        // }
        // if (field === "Diagnosis Test/Service Name") {
        //   return { ...data, ["Diagnosis Test/Service Name"]: value };
        // }
        // if (field === "Organisation Prices") {
        //   return { ...data, ["Organisation Prices"]: value };
        // }
        // if (field === "Facility 1 Prices") {
        //   return { ...data, ["Facility 1 Prices"]: value };
        // }
        // if (field === "Facility 2 Prices") {
        //   return { ...data, ["Facility 2 Prices"]: value };
        // }
        // if (field === "Facility 3 Prices") {
        //   return { ...data, ["Facility 3 Prices"]: value };
        // }
      }

      return data;
    });

    setCsvData(r);
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function csvJSON(csv: any) {
    console.log("csvdata");
    var lines = csv.split("\r\n");

    var headers = lines[0].split(",");
    // console.log(headers, "headers");["sno","facilityPrices"]
    var result = [];
    console.log(facilityinput, "fi");
    var facilityNPI = facilityinput.facilityNPI;
    var facilityName = facilityinput.facilityName;
    console.log(facilityNPI, facilityName);
    for (var i = 1; i < lines.length - 1; i++) {
      var obj: any = {};
      var currentline = lines[i].split(",");

      obj["Organisationid"] = orgid[0].organizationID;
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      obj["FacilityName"] = facilityName;
      obj["FacilityNPI"] = facilityNPI;
      result.push(obj);
    }
    setCsvData(result);

    var validateHeaders = knownObj.map((d) => d.headerName);
    const knownHeaders = validateHeaders.filter((element) =>
      headers.includes(element)
    );
    const isMatched = knownHeaders.length === validateHeaders.length;
    //&&
    // knownHeaders.every((value, index) => value === validateHeaders[index]);
    console.log(
      validateHeaders.length,
      headers.length,
      knownHeaders.length,
      "validateHeaders"
    );

    if (
      knownHeaders.length <= validateHeaders.length - 2 ||
      headers.length > validateHeaders.length
    ) {
      toast.error(
        "Please check the header name or download the sample csv format"
      );
    } else {
      if (validateHeaders.length === headers.length && isMatched) {
        setUnknownHeader(false);
        setColumns(columnsFormat);
        return JSON.stringify(result);
      } else {
        // setFilename("")
        // toast.error("format not match");
        // return { message: "error" };
        setUnknownHeader(true);
        headers.push("FacilityName", "FacilityNPI");
        console.log(headers, "headers");
        const unknownFormat = headers.map((da: any) => ({
          field: da,
          headerName: da,
          editable: false,
          width: 100,
        }));

        setColumns(unknownFormat);

        return JSON.stringify(result);
      }
    }

    // console.log(result,"res")
  }

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);
    console.log("name", name);
    const reader = new FileReader();
    let j: any = [];
    reader.onload = () => {
      let text: any = reader.result;
      // alert(JSON.stringify(text))
      // console.log('CSV: ', text.substring(0, 100) + '...');

      //convert text to json here
      csvJSON(text);
    };
    // reader.onload = (evt) => {
    //   if (!evt?.target?.result) {
    //     return;
    //   }
    //   const { result } = evt.target;
    // alert(JSON.stringify(result))
    //   const records = parse(result as any, {
    //     columns: ["id", "value"],
    //     delimiter: ";",
    //     trim: true,
    //     skip_empty_lines: true
    //   });

    // };
    reader.readAsBinaryString(file);
    // reader.readAsText(file);

    console.log(csvData);
  };

  const upload = (e: any) => {
    e.preventDefault();
    // if(output){
    //    let formData = new FormData();
    //  formData.append("screenshot", output);
    let datacheck = {
      name: filename,
      csv: csvData,
      emailData: emailData,
      organizationID: orgid[0].organizationID,
    };
    if (unknownHeader) {
      setUnknownHeader(false);
      axiosPrivate
        .post("http://localhost:5200/unknownHeaderPricelist", datacheck)
        .then((res) => {
          setColumns([]);
          setCsvData([]);
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err, "cdfjdk");
          toast.error(err.message);
        });
    } else {
      axiosPrivate
        .post(
          "http://localhost:5200/uploadPricelist",
          datacheck
          // {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
          // }
        )
        .then((res) => {
          setColumns([]);
          setCsvData([]);
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err, "cdfjdk");
          toast.error(err.message);
        });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    // if(output){
    //    let formData = new FormData();
    //  formData.append("screenshot", output);
    let datacheck = { name: filename, csv: csvData };
    axiosPrivate
      .post(
        "http://localhost:5200/publishPricelist",
        datacheck
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      )
      .then((res) => {
        console.log("Success ", res);
        // alert("success");
        navigate("/provider/facility/pricelistlanding");
      }); //  }
  };

  const Download = () => {
    axiosPrivate.get("/download?format=singleFacility").then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "singleFileFormat.csv");
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
  
      <Box
        
        sx={{
          backgroundColor: "primary.light",
          
         
          // height: "88.8vh",

          "&::-webkit-scrollbar": {
            width: 20,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "grey",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "secondary.dark",
            borderRadius: 2,
          },
          overflowX: "hidden",

          // height: "88.8vh",
        }}
      >
        <Grid container item justifyContent={"flex-end"}>
          <Buttoncomponent
            variant="contained"
            type="button"
            size="large"
            color="primary"
            onClick={Download}
            sx={{
             
              backgroundColor: "secondary.dark",
              width: "14vw",
              color: "#fff",
              "&:hover": {
                color: "secondary.dark",
                border: "1px solid blue",
              },
            }}
          >
            Sample Format
          </Buttoncomponent>
        </Grid>
        <div
          style={{
            flex: 1,
            height: "3px",
            backgroundColor: "darkgray",
            marginTop: "1rem",
          }}
        />
        {/* <Grid container item xs={12} justifyContent="left">
          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              //dispatch(tabValueNav(1));
              navigate("/pricelistlanding");
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
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          Upload your facility's Pricelist
        </Typography>
        <br></br>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
            sx={{
              mt: 2,
              backgroundColor: "secondary.dark",
              width: "15vw",
              color: "#fff",
              fontSize: "1rem",
              "&:hover": {
                color: "secondary.dark",
                border: "1px solid blue",
                fontSize: "1rem",
              },
            }}
          >
            Upload CSV
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={handleFileUpload}
            />
          </Button>

          {/* service pricelist.csv in <i>src dir</i> */}
          <Box sx={{mt:2,fontWeight:"bold"}}>{filename}</Box>
        </Box>
        {columns.length !== 0 ? (
          <>
            <DataGrid
              autoHeight
              rows={csvData}
              columns={columns}
              getRowId={(row: any) => row.SNo}
              pagination={true}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize: number) =>
                setPagesize(newPageSize)
              }
              rowsPerPageOptions={[5, 10, 20]}
              onCellEditCommit={onCellEditCommit}
              // initialState={{
              //   pagination: {
              //     pageSize: 100
              //   }
              // }}
              // hideFooter
              sx={{ mt: 1 }}
            />
            <Box sx={{ display: "flex", gap: "1.5rem" }}>
              <Buttoncomponent
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                onClick={upload}
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
              {/* <Buttoncomponent
            type="submit"
            variant="contained"
            size="large"
            color="primary"
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
            onClick={onSubmit}
          >
            Publish
          </Buttoncomponent> */}
            </Box>
          </>
        ) : null}
      
    </Box>
  );
}
