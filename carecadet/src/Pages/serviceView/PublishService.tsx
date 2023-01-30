import React,{useState,useEffect} from 'react'
import { useAppSelector } from '../../Redux/Hook'
import { axiosPrivate } from '../../axios/axios'

import { Buttoncomponent } from '../../Components/Buttoncomp'
import {Box,Paper} from "@mui/material"
import {
    DataGrid,
    GridColTypeDef,
    GridValueFormatterParams,
    GridColumns,
  } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const PublishService = () => {

    const navigate=useNavigate()
    const orgID=useAppSelector(state=>state.providerOrganization.orgEditData)
    const viewData=useAppSelector(state=>state.providerServiceView.ViewData)
    const [csvData,setCsvData]=useState<any>([])
    const [pageSize, setPagesize] = useState(5);
   

    useEffect(()=>{
      axiosPrivate.get(`/pathPricelist/check?file=${viewData.filePath.split("/")[2]}`).then(res=>{
       const resData=res.data
       console.log(res.data[0],"check")
      //  const set=Object.keys(res.data[0])
       setCsvData(resData)
    //  const check= set.map((data)=>(
    //   {
    //     field:data,
    //     headerName: data,
    //     editable: false,
    //     width: 100,
    //   }
    //  ))
    //   console.log(check)
    //   setColumns(check)
     
    //    csvJSON(resData)
  
      })
    },[])

   

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
 
    const columns: GridColumns = [
      {
        field: "ServiceCode",
        headerName: "Service Code",
        editable: false,
        width: 100,
      },
      {
        field: "DiagnosisTestorServiceName",
        headerName: "Diagnosis Test/Service Name",
        editable: false,
        width: 350,
      },
      {
        field: "Organisationid",
        headerName: "Organisation ID",
        editable: false,
        width: 100,
      },
      {
        field: "FacilityName",
        headerName: "FacilityName",
        editable: false,
        width: 100,
      },
      {
        field: "OrganisationPrices",
        headerName: "Organisation Prices",
        editable: false,
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
        editable: false,
        width: 100,
        align: "right",
        ...usdPrice,
      },
    ];
   

      const onSubmit = (e: any) => {
        e.preventDefault();
       let datacheck = { csv: csvData,emailData:{orgID:orgID[0].organizationID,file:viewData} };
        axiosPrivate.post("http://localhost:5200/publishPricelist", datacheck)
          .then((res) => {
            toast.success(res.data.message)
            navigate("/provider/serviceView/serviceView");
          }).catch(err=>{
            toast.error(err.message)
          })
      };


  return (
    <Paper
    elevation={9}
    sx={{
      backgroundColor: "primary.light",
      padding: "1.5rem",
      borderRadius: "15px",
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
  
    
   {csvData.length!==0&& columns.length!==0?
   <>
   <DataGrid
      autoHeight
      rows={csvData}
      columns={columns}
      getRowId={(row: any) => row.SNo}
      pagination={true}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize: number) => setPagesize(newPageSize)}
      rowsPerPageOptions={[5, 10, 20]}
    //   onCellEditCommit={onCellEditCommit}
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
    </Box>
   </>:"loading"} 
    
  </Paper>
  )
}

export default PublishService