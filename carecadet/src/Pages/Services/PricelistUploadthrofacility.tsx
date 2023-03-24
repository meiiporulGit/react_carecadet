import * as React from "react";
import { useState } from "react";
import { Grid, Typography, Button, Paper, Box, Container ,Collapse, IconButton,TablePagination,TextField, CircularProgress, Table, TableFooter, TableRow} from "@mui/material";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router";
import * as XLSX from "xlsx"

import {
  DataGrid,
  GridColTypeDef,
  GridValueFormatterParams,
  GridColumns,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { axiosPrivate, baseURL } from "../../axios/axios";

import { toast } from "react-toastify";
import { KeyboardArrowDown, KeyboardArrowUp ,Edit } from "@mui/icons-material";
type cvsItem = {
  id: string;
  SNo: string;
  value: string;
  GridAlignment: "left" | "right" | "center";
};

interface rowProps{
  fac:any
  onButtonEdit: any;
}

function TableRowRes({ fac, onButtonEdit }: rowProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // console.log(fac, "facilityRow");
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<any>(fac);
 

  const editOnchange = (e: any) => {
    console.log(e.target.name, e.target.value);
    var editData = { ...data, [e.target.name]: e.target.value };
    setData(editData);
  };

  const onButton = () => {
    setEdit(false);
    onButtonEdit(data);
  };

  return (
    <Box>
      <Paper sx={{backgroundColor:"primary.light",padding:"0.3rem"}}>
        <Grid container>
          <Grid item xs={10} >
            <Box sx={{display:"flex",flexWrap:"nowrap",alignItems:"center"}}>
            <IconButton
           
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open)
                setEdit(false)
              }}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            <Typography>{fac.DiagnosisTestorServiceName}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Edit
              onClick={() => {
                setEdit(true);
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper
          sx={{
            backgroundColor:"primary.light",
            display: "flex",
            flexDirection: "column",
            mt: "0.2rem",
            padding: "1rem",
          }}
        >
          <Grid container>
          {edit ?
            <Grid item justifyContent={"flex-end"}> <Button onClick={onButton}>save</Button></Grid> : null}
          </Grid>
          <Grid  container item xs={12}>
            <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>
              OrganizationID{" "}
            </Typography>
            </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
            <Typography >
            {fac.Organisationid}
            </Typography>
            </Grid>
          </Grid>

         
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
        
            <Typography sx={{ color: "blue" }}>FacilityNPI </Typography> </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
         <Typography >
            {fac.FacilityNPI}
          </Typography>
          </Grid>
          </Grid>
          
          <Grid  container item xs={12}>
        <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>FacilityName </Typography> </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography>
            {fac.FacilityName}
          </Typography>
          </Grid>
          </Grid>
          <Grid  container item xs={12}>
        <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>
              Organisation Prices{" "}
            </Typography>
            </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography>
          
            {!edit ? (
              fac.OrganisationPrices
            ) : (
              <TextField
                value={data.OrganisationPrices}
                name="OrganisationPrices"
                onChange={(e) => editOnchange(e)}
              />
            )}
          </Typography>
          </Grid>
          </Grid>


         <Grid  container item xs={12}>
        <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>
              FacilityPrices{" "}
            </Typography> </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography>
            {!edit ? (
              fac.FacilityPrices
            ) : (
              <TextField
                value={data.FacilityPrices}
                name="FacilityPrices"
                onChange={(e) => editOnchange(e)}
                type="number"
              />
            )}
          </Typography>
          </Grid></Grid>
        </Paper>
      </Collapse>
    </Box>
  );
}

export default function PricelistUploadthroFacility() {
  const [csvData, setCsvData] = useState<cvsItem[]>([]);
  const [filename, setFilename] = useState("");
  const [pageSize, setPagesize] = useState(5);
  const [columns, setColumns] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [unknownHeader, setUnknownHeader] = useState<boolean>(false);
  const [publishButton, setPublishButton] = useState<boolean>(false);
  const [isLoading,setIsLoading]=useState<boolean>(false)
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
      flex:1,
      // width: 100,
    },
    {
      field: "DiagnosisTestorServiceName",
      headerName: "Diagnosis Test/Service Name",
      editable: true,
      flex:2
      // width: 350,
    },
    {
      field: "FacilityName",
      headerName: "Facility Name",
      editable: false,
      flex:2
      // width: 100,
    },
    {
      field: "OrganisationPrices",
      headerName: "Organisation Prices",
      editable: true,
      flex:1,
      // width: 100,
      align: "right",
      ...usdPrice,
    },
    {
      field: "FacilityNPI",
      headerName: "FacilityNPI",
      editable: false,
      flex:1
      // width: 100,
    },
    {
      field: "FacilityPrices",
      headerName: "Facility Prices",
      editable: true,
      flex:1,
      // width: 100,
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



  function csvJSON(csv:any,header:any) {
    console.log("check",csv)
    var result=[]
    var facilityNPI = facilityinput.facilityNPI;
    var facilityName = facilityinput.facilityName;
   
    for (var i = 0; i <csv.length; i++) {
      var obj: any = csv[i];
  

      obj["Organisationid"] = orgid[0].organizationID;
     
      obj["FacilityName"] = facilityName;
      obj["FacilityNPI"] = facilityNPI;
      
      result.push(obj);
    }
    
    console.log(result,"csvData")
    setCsvData(result);

    var validateHeaders = knownObj.map((d) => d.headerName);
   
    const knownHeaders = validateHeaders.filter((element) =>header.includes(element));
    
    const isMatched = knownHeaders.length === validateHeaders.length;
    //&&
    // knownHeaders.every((value, index) => value === validateHeaders[index]);
   

    if (
      knownHeaders.length <= validateHeaders.length - 2 ||
      header.length > validateHeaders.length
    ) {
    
      toast.error(
        "Please check the header name or download the sample csv format"
      
      );
      
    } else {
      if (validateHeaders.length === header.length && isMatched) {
        setPublishButton(false)
        setUnknownHeader(false);
        setColumns(columnsFormat);
        return JSON.stringify(result);
      } else {
        // setFilename("")
        // toast.error("format not match");
        // return { message: "error" };
        setPublishButton(true)
        setUnknownHeader(true);
        header.push("FacilityName", "FacilityNPI");
       
        const unknownFormat = header.map((da: any) => ({
          field: da,
          headerName: da,
          editable: false,
          flex:1,
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
    console.log(file.size,"fileCHeck")
    if (file.size >1000000){
      toast.warning("more than 10MB")
    }
    setFilename(name);
    console.log("name", name);
    const reader = new FileReader();
    let j: any = [];
    reader.readAsBinaryString(file);
    reader.onload =async (event:any) => {
      let binarydata =  event.target.result;
      let workbook  = XLSX.read (binarydata,{type:'binary'})
      let data:any=[]
    workbook.SheetNames.forEach(sheet=>{
      data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet],{defval:""});
        
        
      })
      
      const firstSheetName = workbook.SheetNames[0];
      const columnsArray = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { header: 1 })[0];
      console.log(columnsArray)
      csvJSON(data,columnsArray)
    };
  }

  const upload = (e: any) => {
    e.preventDefault();
    setIsLoading(true)
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
        .post(`/service/unknownHeaderPricelist`, datacheck)
        .then((res) => {
          setColumns([]);
          setCsvData([]);
          setPublishButton(false)
          setIsLoading(false)
          toast.success(res.data.message);
          navigate("/provider/facility/viewFacility");
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err, "cdfjdk");
          toast.error(err.message);
        });
    }
    //  else {
    //   axiosPrivate
    //     .post(
    //       `/service/uploadPricelist`,
    //       datacheck
    //       // {
    //       //   headers: {
    //       //     "Content-Type": "multipart/form-data",
    //       //   },
    //       // }
    //     )
    //     .then((res) => {
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

  const onButtonEdit = (e: any) => {
    var editData=csvData.map((d)=>{
      if(d.SNo===e.SNo){
        return e
      }else{
        return d
      }
    })
  
    console.log(editData,"checkEdit")
    setCsvData(editData)
      
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


  const onSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true)
    // if(output){
    //    let formData = new FormData();
    //  formData.append("screenshot", output);
    let datacheck = {  name: filename,
      csv: csvData,
      fileType: "Multiple facility upload",
      emailData: data,
      organizationID: orgid[0].organizationID};
    axiosPrivate
      .post(
        `/service/publishPricelistCorrectformat`,
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
        toast.success(res.data.message);
        navigate("/provider/facility/pricelistlanding");
        setIsLoading(false)
      })
      
      .catch((err) => {
        setIsLoading(false)
        console.log(err, "cdfjdk");
        toast.error(err.message);
      });
      
      //  }
  };

  const Download = () => {
    axiosPrivate.get("/service/download?format=singleFacility").then((res) => {
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
              width: {xs:"30vw",sm:"14vw"},
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
              width: {xs:"30vw",sm:"15vw"},
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
              // accept=".csv"
              hidden
              onChange={handleFileUpload}
            />
          </Button>

          {/* service pricelist.csv in <i>src dir</i> */}
          <Box sx={{mt:2,fontWeight:"bold"}}>{filename}</Box>
        </Box>
      
        {columns.length !== 0 ? (
          <Box >
          
           
      
            <DataGrid
              autoHeight
              rows={csvData}
              columns={columns}
              getRowId={(row: any) => row.SNo}
              pagination={true}
              pageSize={pageSize}
              loading={isLoading}
            
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
              sx={{ maxWidth: "100%",display:{xs:"none",md:"block"}, mt:1 }}
            />
             < Box
              sx={{
                
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              { (rowsPerPage > 0
              ? csvData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : csvData
            ).map((fac: any, i: any) => (
              
                <TableRowRes
                  key={i}
                  fac={fac}
                  onButtonEdit={(e: any) => onButtonEdit(e)}
                />
                
               
              ))}
             <Table><TableFooter><TableRow><TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={csvData.length}
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
                }}/></TableRow></TableFooter></Table> 
             
            </Box>
        <Box sx={{ display: "flex", gap: "1.5rem" }}>
            {publishButton  ? (
              <Buttoncomponent
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                disable={isLoading}
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
            disable={isLoading}
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
          </Box>
        ) : null}
      
    </Box>
  );
}
