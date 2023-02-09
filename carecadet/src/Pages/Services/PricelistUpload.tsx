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
import { axiosPrivate, baseURL } from "../../axios/axios";
// import { parse } from "csv-parse/browser/esm/sync";
import { orgid } from "../../Redux/ProviderRedux/orgSlice";
import { facilitynameInfo } from "../../Redux/ProviderRedux/serviceSlice";
import { store } from "../../Redux/Store";
import { toast } from "react-toastify";
type cvsItem = {
  id: string;
  SNo: string;
  value: string;
  GridAlignment: "left" | "right" | "center";
};

export default function PricelistUpload() {
  const [csvData, setCsvData] = useState<cvsItem[]>([]);
  const [filename, setFilename] = useState("");
  const [pageSize, setPagesize] = useState(5);
  const [columns, setColumns] = useState<any>([]);
  const [unknownHeader, setUnknownHeader] = useState<boolean>(false);
  const navigate = useNavigate();

  const data = useAppSelector(
    (state: { providerAuth: { login: any } }) => state.providerAuth.login
  );
  console.log(data, "dat");
  console.log(csvData, "checkd");
  // organizationID: select.organizationID,

  const orgid = useAppSelector(
    (state) => state.providerOrganization.orgEditData
  );
  console.log("orgid", orgid[0].organizationID);
  const facilityinput = useAppSelector(
    (state) => state.providerService.facilityData
  );
  console.log("facilitydetail", facilityinput);

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
    {
      headerName: "FacilityName",
      headerType: "string",
      maxLength: 32,
    },
    {
      headerName: "FacilityNPI",
      headerType: "string",
      maxLength: 32,
    },
  ];
  const onCellEditCommit = (cellData: any) => {
    const { id, field, value } = cellData;
    console.log(cellData);
    let r = csvData.map((data) => {
      if (data.SNo === id) {
        return { ...data, [field]: value };
      }

      return data;
    });

    setCsvData(r);
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

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
      editable: true,
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
      headerName: "FacilityName",
      editable: true,
      width: 250,
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
      editable: true,
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

  function csvJSON(csv: any) {
    console.log("csvdata");
    var lines = csv.split("\r\n");
console.log(lines,"lines")
    var result = [];
// var mandatoryfield=["FacilityNPI"]
    var headers = lines[0].split(",");
    const mandatoryfield=headers.includes("FacilityNPI")&& headers.includes("FacilityName");
    console.log("mandatoryfield",mandatoryfield)
if(mandatoryfield)
{
    console.log(headers, "headers");
    let index = headers.indexOf("FacilityNPI");
    console.log(index,"indexofnpi")
    const facilityNPI = facilityinput.facilityNPI;
    const facilityName = facilityinput.facilityName;
    for (var i = 1; i < lines.length - 1; i++) {
      var obj: any = {};


     var currentline = lines[i].split(",");
      console.log("currentline", currentline);
      let storefacility = facilityinput.filter(
        (data: any) => data.facilityNPI === currentline[index]
      );
      console.log(storefacility, "storefacility");
      // if(storefacility[0]===undefined)
      // {
      //   toast.error(`${currentline[4]} is Invalid NPI`)
      // }
      var finalfacility =
        storefacility[0] == undefined
          ? "Facility name unavailable"
          : storefacility[0].facilityName;
      

      obj["Organisationid"] = orgid[0].organizationID;
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      obj["FacilityName"] = finalfacility;
      result.push(obj);
      // data:{$push:[{result , facilityNPI}]}
    }
    // console.log(result,"res")
    setCsvData(result);
    // return JSON.stringify(result); 
    var validateHeaders = knownObj.map((d) => d.headerName);
    const knownHeaders = validateHeaders.filter((element) =>
      headers.includes(element)
    );
    const isMatched =
      knownHeaders.length === validateHeaders.length 
      // &&
      // knownHeaders.every((value, index) => value === validateHeaders[index]);
    // console.log(validateHeaders,"validateHeaders")

    if (
      knownHeaders.length <= validateHeaders.length - 2 ||
      headers.length > validateHeaders.length
    ) {
      toast.error(
        "Please check the header name or download the sample csv format"
      );
    }else{
    if (validateHeaders.length === headers.length && isMatched) {
      setUnknownHeader(false);
      setColumns(columnsFormat);
      return JSON.stringify(result);
    } else {
      // setFilename("")
      // toast.error("format not match");
      // return { message: "error" };
      setUnknownHeader(true);

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
}
else{
  toast.error("Please check your header name or download the sample format")
}
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
    console.log("emaildata", data);
    e.preventDefault();
    // if(output){
    //    let formData = new FormData();
    //  formData.append("screenshot", output);
    let datacheck = {
      name: filename,
      csv: csvData,
      fileType: "Multiple facility upload",
      emailData: data,
      organizationID: orgid[0].organizationID,
    };
    if (unknownHeader) {
      setUnknownHeader(false);
      axiosPrivate
        .post(
          `/service/unknownHeaderPricelist`,
          datacheck
          // {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
          // }
        )
        .then((res) => {
          console.log("Success ", res);
          setColumns([]);
          setCsvData([]);

          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err, "cdfjdk");
          toast.error(err.message);
        });
    }
    //  else {
    //   axiosPrivate
    //     .post(
    //       `${baseURL}/uploadPricelist`,
    //       datacheck
    //       // {
    //       //   headers: {
    //       //     "Content-Type": "multipart/form-data",
    //       //   },
    //       // }
    //     )
    //     .then((res) => {
    //       console.log("Success ", res);
    //       setColumns([]);
    //       setCsvData([]);
    //       toast.success(res.data.message);
    //     })
    //     .catch((err) => {
    //       console.log(err, "cdfjdk");
    //       toast.error(err.message);
    //     });
    // }
  };


  const onSubmit = (e: any) => {
    e.preventDefault();
    // if(output){
    //    let formData = new FormData();
    //  formData.append("screenshot", output);
    let datacheck = {    name: filename,
      csv: csvData,
      fileType: "Multiple facility upload",
      emailData: data,
      organizationID: orgid[0].organizationID};
    axiosPrivate
      .post(`/service/publishPricelistCorrectformat`, datacheck)
      .then((res) => {
        console.log("Success ", res);
        // alert("success");
        navigate("/provider/service/listService");
      })
      .catch((err) => {
        console.log(err, "checkerror");
        toast.error(err.data.message);
      });
  };

  const Download = () => {
    axiosPrivate.get("/service/download?format=multipleFacility").then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "multipleFileFormat.csv");
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <>
      <Box
       
        sx={{
          backgroundColor: "primary.light",
          // padding: "1.5rem",
          borderRadius: "15px",
          height: "88.8vh",

        

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
              // mt: 2,
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
              navigate("/servicelanding");
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
            {unknownHeader == true  ? (
         
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
            
            ) :

          
              <Buttoncomponent
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
          </Buttoncomponent>
            }
            
</Box>


          </>
        ) : null}
      </Box>
    </>
  );
}
