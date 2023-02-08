import * as React from "react";
import { useState,useEffect } from "react";
import { Grid, Typography, Button, Paper, Box, Container,TextField,Autocomplete ,createFilterOptions} from "@mui/material";
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
import { adminAxiosPrivate, axiosPrivate, baseURL } from "../../axios/axios";
// import { parse } from "csv-parse/browser/esm/sync";
import { orgid } from "../../Redux/ProviderRedux/orgSlice";
import { toast } from "react-toastify";
import { ContentPasteSearchOutlined } from "@mui/icons-material";
import FormTextField from "../../Components/Textfield";
type cvsItem = {
  id: string;
  SNo: string;
  value: string;
  GridAlignment: "left" | "right" | "center";
};

export default function Admin() {
  const [csvData, setCsvData] = useState<cvsItem[]>([]);
  const [filename, setFilename] = useState("");
  const [pageSize, setPagesize] = useState(5);
  const [columns, setColumns] = useState<any>([]);
  const [unknownHeader, setUnknownHeader] = useState<boolean>(false);
  const [textValue,setTextValue]=useState<any>({})
  const [option,setOption]=useState<any>([])
  const navigate = useNavigate();

useEffect(()=>{
  axiosPrivate.get("/pathPricelist/nonStandard").then(res=>{
    console.log(res.data.data,"res")
    setOption(res.data.data)
  })
},[])

  
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
      headerName: "Organisationid",
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


    for (var i = 1; i < lines.length - 1; i++) {
      var obj: any = {};
      var currentline = lines[i].split(",");

    
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
     
      result.push(obj);
    }
    setCsvData(result);

    var validateHeaders = knownObj.map((d) => d.headerName);
    const knownHeaders = validateHeaders.filter((element) =>
      headers.includes(element)
    );
    const isMatched =
      knownHeaders.length === validateHeaders.length 
      // &&
      // knownHeaders.every((value, index) => value === validateHeaders[index]);
    // console.log(validateHeaders,"validateHeaders")
    if (validateHeaders.length === headers.length && isMatched) {
      setUnknownHeader(false);
      setColumns(columnsFormat);
      return JSON.stringify(result);
    } else {
      setFilename("")
      toast.error("format not match");
      return { message: "error" };
      // setUnknownHeader(true);
      // headers.push("FacilityName", "FacilityNPI");
      // console.log(headers, "headers");
      // const unknownFormat = headers.map((da: any) => ({
      //   field: da,
      //   headerName: da,
      //   editable: false,
      //   width: 100,
      // }
      // ));

      // setColumns(unknownFormat);

      // return JSON.stringify(result);
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
    alert(JSON.stringify(textValue._id))
     let datacheck = {
      name: filename,
      csv: csvData,
      id:textValue._id,
      email:textValue.email
    
    };
    if(textValue._id===undefined||""||null){
      toast.error("select the org")
    }else{
      alert(JSON.stringify(textValue))
       adminAxiosPrivate
        .post(
          `${baseURL}/uploadAdminPricelist`,
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
    // if(output){
    //    let formData = new FormData();
    //  formData.append("screenshot", output);
    // let datacheck = {
    //   name: filename,
    //   csv: csvData,
    
    // };
    // if (unknownHeader) {
    //   setUnknownHeader(false);
    //   axiosPrivate
    //     .post("http://localhost:5200/unknownHeaderPricelist", datacheck)
    //     .then((res) => {
    //       setColumns([]);
    //       setCsvData([]);
    //       toast.success(res.data.message);
    //     })
    //     .catch((err) => {
    //       console.log(err, "cdfjdk");
    //       toast.error(err.message);
    //     });
    // } else {
                                    // axiosPrivate
      //   .post(
      //     "http://localhost:5200/uploadPricelist",
      //     datacheck
      //     // {
      //     //   headers: {
      //     //     "Content-Type": "multipart/form-data",
      //     //   },
      //     // }
      //   )
      //   .then((res) => {
      //     setColumns([]);
      //     setCsvData([]);
      //     toast.success(res.data.message);
      //   })
      //   .catch((err) => {
      //     console.log(err, "cdfjdk");
      //     toast.error(err.message);
      //   });
    // }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    // if(output){
    //    let formData = new FormData();
    //  formData.append("screenshot", output);
    let datacheck = { name: filename, csv: csvData };
    axiosPrivate
      .post(
        `${baseURL}/publishPricelist`,
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
    axiosPrivate.get("/download").then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "singleFileFormat.csv");
      document.body.appendChild(link);
      link.click();
    });
  };
  const onText=(value:any)=>{
   console.log(value,"vlau")
      setTextValue({_id:value._id,email:value.providerName}) 
  }
  const CustomPaper = (props:any) => {
    return <Paper elevation={8} sx={{backgroundColor:"#DCF0FA",color:"black"}}{...props} />;
  };

  const OPTIONS_LIMIT = 10;
const defaultFilterOptions = createFilterOptions();

const filterOptions = (options:any, state:any) => {
  return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
};

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "primary.light",
          padding: "1.5rem",
          borderRadius: "15px",
          height: "89vh",

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
         <Autocomplete
       
        freeSolo
        options={option}
        loading={option.length === 0}
        filterOptions = {filterOptions}
        onChange={(e:any,value:any)=>{onText(value)}}
        PaperComponent={CustomPaper}
        getOptionLabel={(opt: any) => opt.organizationID+" / "+opt.providerID+" / "+(opt.filePath).split("/")[2] || opt}
        renderInput={(params) => <TextField {...params}  label="OrgID-ProviderID-fileName" />}
      />
       {/* <TextField
       placeholder="OrgID"
       name="OrgID"
       onChange={(e)=>{onText(e)}}
       />
       <TextField
       placeholder="ProviderID"
       name="providerID"
       onChange={(e)=>{onText(e)}}
       />
          <TextField
       placeholder="File Name"
       name="filePath"
       onChange={(e)=>{onText(e)}}
       /> */}

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
            marginTop: "50px",
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
          <Box>{filename}</Box>
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
      </Paper>
    </>
  );
}
