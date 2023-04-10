import { useEffect, useState } from "react";
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
  Button,
  Card,
  Typography,
  Container,
  ListItemButton,
  ListItemIcon,
  Collapse,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
  MenuItem,
  Menu,
  Paper,
  Grid,
  TextField,
  Slider,
} from "@mui/material";

import { Formik, Form, ErrorMessage, Field } from "formik";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
//comp
import { Buttoncomponent } from "../../Components/Buttoncomp";
//redux store
import { useAppSelector, useAppDispatch } from "../../Redux/Hook";
import MenuIcon from "@mui/icons-material/Menu";
import * as Yup from "yup";

import { axiosPrivate } from "../../axios/axios";
// import {editButton} from "../../Redux/LoginSlice";
import FormTextField from "../../Components/Textfield";
import SelectField from "../../Components/Select";
import SearchIcon from "@mui/icons-material/Search";
import {
  dataSearch,
  dataSearchTenMiles,
  dataSearchTwentyMiles,
  dataSearchThirtyMiles,
} from "../../Redux/ProviderRedux/HomeSlice";
import {
  ArrowDropDown,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { values } from "lodash";
import SearchNav from "../../ProtectedRoutes/SearchNav";

export default function ViewFacility() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [open3, setOpen3] = useState<boolean>(false);
  const [open4, setOpen4] = useState<boolean>(false);
  // const [checked, setChecked] = useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [distance, setDistance] = useState(30);
  const [facType, setFacType] = useState("");
  const [checkText, setCheckText] = useState<boolean>(false);
  const [checkFacText, setCheckFacText] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([] as forminitialValues[]);
  const [service, setService] = useState(false);

  const [search, setSearch] = useState<any>([]);
  const [maxPrice, setMaxPrice] = useState<any>(100);
  const [minPrice, setMinPrice] = useState<any>(1);

  const searchData = useAppSelector((state) => state.homeReducer.searchData);

  // const serviceValue = useAppSelector((state) => state.homeReducer);

  // const [searchqueryData, setSearchqueryData] = useState(searchData);

  // const [search, setSearch] = useState();
  const [facilityType, setFacilityType] = useState<any>([]);
  const [facilityCheck, setFacilityCheck] = useState<any>("");
  const [value, setValue] = useState<number[]>([0, 0]);
  const [scoreValue, setScoreValue] = useState<number[]>([1, 5]);
  const dispatch = useAppDispatch();

  const q = searchParams.get("q");
  const locationQ = searchParams.get("location");

  useEffect(() => {
    const postData = { q: q, location: locationQ };
    axiosPrivate
      .post(`/search`, postData)
      .then((res) => {
        dispatch(dataSearch(res.data.data));
        setSearch(res.data.data);
        const maxFilter = Math.max(
          ...res.data.data.map((fprice: any) => {
            if (fprice.priceType === "facilityPrice") {
              return fprice.FacilityPrices;
            } else {
              return fprice.cashPrice;
            }
          })
        );
        console.log(maxFilter, "....maxPrice");
        

        const minFilter = Math.min(
          ...res.data.data.map((fprice: any) => {
            if (fprice.priceType === "facilityPrice") {
              return fprice.FacilityPrices;
            } else {
              return fprice.cashPrice;
            }
          })
        );
        console.log(minFilter, "....minPrice");
        if(res.data.data.length!==0){
          setMaxPrice(maxFilter);
          setMinPrice(minFilter);
        }
      })
      .catch((e) => console.log(e));
    const getFacilityType = async () => {
      await axiosPrivate
        .get(`/FacilityType/findfacilityType`)
        .then((res) => {
          console.log(res.data, "facilityType");
          setFacilityType(res.data);
          // dispatch(facilityTypeInfo(res.data))
        })
        .catch((e) => console.log(e));
    };
    getFacilityType();
  }, []);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  interface forminitialValues {
    Service: any;
    Location: any;
  }

  const initialValues: forminitialValues = {
    Service: q,
    Location: locationQ,
  };

  const validationSchema = Yup.object().shape({
    Service: Yup.string().required("Required"),
    Location: Yup.string().required("Required"),
  });
  const onSubmit = (values: forminitialValues, actions: any) => {
    const postData = { q: values.Service, location: values.Location };
    axiosPrivate
      .post(`/search`, postData)
      .then((res) => {
        console.log(res.data);
        // setSearchqueryData(res.data.data)
        dispatch(dataSearch(res.data.data));

        setSearch(res.data.data);
        const serviceQuery=encodeURIComponent(values.Service)
        setSearchParams({ q: serviceQuery, location: values.Location });
        const maxFilter = Math.max(
          ...res.data.data.map((fprice: any) => {
            if (fprice.priceType === "facilityPrice") {
              return fprice.FacilityPrices;
            } else {
              return fprice.cashPrice;
            }
          })
        );
        console.log(maxFilter, "....maxPrice");
        

        const minFilter = Math.min(
          ...res.data.data.map((fprice: any) => {
            if (fprice.priceType === "facilityPrice") {
              return fprice.FacilityPrices;
            } else {
              return fprice.cashPrice;
            }
          })
        );
        console.log(minFilter, "....minPrice");
       
        if(res.data.data.length!==0){
          setMaxPrice(maxFilter);
          setMinPrice(minFilter);
        }
        // navigate("/patient/search");
        console.log("searchi", res);
      })
      .catch((e) => console.log(e));
  };

  //Table Pagination
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

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
  const filterFacilityType = (
    filter: any,
    dis?: any,
    type?: any,
    details?: any,
    range?: any,
    score?:any
  ) => {
    console.log(filter, dis, type, details, range,score, "axiosCheck");
 
    const noFacilityType = {
      q: details.Service,
      location: details.Location,
      distance: dis,
      
      // ratingRange:score
    };
    const withFacilityType = {
      q: details.Service,
      location: details.Location,
      distance: dis,
      facilityType: type,
      
      // ratingRange:score
    };
    const noFacAndDistance = { q: details.Service, location: details.Location };
    const noFacilityTypeAndRangeAndDistanceAndScore = {
      q: details.Service,
      location: details.Location,
      distance: dis,
      range: range,
      ratingRange:score
    };

    const withFacilityTypeAndDistanceAndRangeAndScore = {
      q: details.Service,
      location: details.Location,
      distance: dis,
      facilityType: type,
      range: range,
      ratingRange:score
    };

    // const noFacilityTypeAndDistanceAndScore = {
    //   q: details.Service,
    //   location: details.Location,
    //   distance: dis,
    //   // range: range,
    //   ratingRange:score
    // };
    // const withFacilityTypeAndDistanceAndScore = {
    //   q: details.Service,
    //   location: details.Location,
    //   distance: dis,
    //   // range: range,
    //   ratingRange:score,
    //   facilityType:type
    // };

    switch (filter) {
     
      case "noFacilityType":
        return axiosPrivate.post(`/search`, noFacilityType);
      case "withFacilityType":
        return axiosPrivate.post(`/search`, withFacilityType);
      case "withFacilityTypeAndDistanceAndRangeAndScore":
        return axiosPrivate.post(`/search`, withFacilityTypeAndDistanceAndRangeAndScore);
      case "noFacilityTypeAndRangeAndDistanceAndScore":
        return axiosPrivate.post(`/search`,noFacilityTypeAndRangeAndDistanceAndScore);
        // case "noFacilityTypeAndDistanceAndScore":
        //   return axiosPrivate.post(`/search`, noFacilityTypeAndDistanceAndScore);
        //   case "withFacilityTypeAndDistanceAndRangeAndScore":
        //     return axiosPrivate.post(`/search`, withFacilityTypeAndDistanceAndScore);
      default:
        return axiosPrivate.post(`/search`, noFacAndDistance);
    }
  };

  // function handleInputChange(event: any, searchValue: any) {
  //   let radioDistance = false;
  //   if (event.target.value === distance) {
  //     setCheckText(false);
  //     setDistance("");
  //     radioDistance = false;
  //   } else {
  //     setCheckText(true);
  //     setDistance(event.target.value);
  //     radioDistance = true;
  //   }
  //   if (radioDistance) {
  //     if (facilityCheck === "") {
  //       filterFacilityType(
  //         "noFacilityType",
  //         event.target.value,
  //         facilityCheck,
  //         searchValue
  //       )
  //         .then((res) => {
  //           // dispatch(dataSearch(res.data.data));
  //           setSearch(res.data.data);
  //         })
  //         .catch((e) => console.log(e));
  //     } else {
  //       filterFacilityType(
  //         "facAndDistance",
  //         event.target.value,
  //         facilityCheck,
  //         searchValue
  //       )
  //         .then((res) => {
  //           // dispatch(dataSearch(res.data.data));
  //           setSearch(res.data.data);
  //         })
  //         .catch((e) => console.log(e));
  //     }
  //   } else {
  //     if (facilityCheck === "") {
  //       filterFacilityType(
  //         "default",
  //         event.target.value,
  //         facilityCheck,
  //         searchValue
  //       )
  //         .then((res) => {
  //           // dispatch(dataSearch(res.data.data));
  //           setSearch(res.data.data);
  //         })
  //         .catch((e) => console.log(e));
  //     } else {
  //       filterFacilityType(
  //         "noDistance",
  //         event.target.value,
  //         facilityCheck,
  //         searchValue
  //       )
  //         .then((res) => {
  //           // dispatch(dataSearch(res.data.data));
  //           setSearch(res.data.data);
  //         })
  //         .catch((e) => console.log(e));
  //     }
  //   }
  // }

  function handleTypeInputChange(event: any, searchValue: any) {
    var checkFacility = false;
    if (event.target.value === facilityCheck) {
      setCheckFacText(false);
      setFacilityCheck("");
      checkFacility = false;
    } else {
      setCheckFacText(true);
      setFacilityCheck(event.target.value);
      checkFacility = true;
    }
    if (checkFacility) {
      filterFacilityType(
        "withFacilityType",
        `${distance}mi`,
        event.target.value,
        searchValue,
        value,
        scoreValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(maxFilter, "....maxPrice");

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(minFilter, "....minPrice");
          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(0);
          } else {
            setValue([minFilter, minFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    } else {
      filterFacilityType(
        "noFacilityType",
        `${distance}mi`,
        event.target.value,
        searchValue,
        value,
        scoreValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(maxFilter, "....maxPrice");

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(minFilter, "....minPrice");
          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(0);
          } else {
            setValue([minFilter, minFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    }
  }
  function sliderChange(event: any, newValue: any, searchValues: any) {
    setService(true);
    setValue(newValue as number[]);
    console.log("newValue", newValue);
    // const pricefilter = searchData.filter((item: any) => {

    //   // Math.min(
    //   //   ...res.data.data.map((fprice: any) =>  {
    //   //     if(fprice.priceType==="facilityPrice"){
    //   //       return fprice.FacilityPrices
    //   //     }
    //   //     else{
    //   //       return fprice.cashPrice
    //   //     }
    //   //   })
    //   // );
    //   if(item.priceType==="facilityPrice"){
    //   return item.FacilityPrices >= newValue[0] && item.FacilityPrices <= newValue[1]
    //   }
    //   else{
    //     console.log(".....",item.cashPrice)
    //     return item.cashPrice >= newValue[0] && item.cashPrice <= newValue[1]

    //   }
    //   // return item.some((dataItem:any)=> (dataItem.FacilityPrices >= newValue[0] && dataItem.FacilityPrices <= newValue[1]));
    // });
    // console.log("pricefilter", pricefilter);
    // setSearch(pricefilter);
    // dispatch(dataSearch(pricefilter))

    // const checkData = {
    //   q: searchValues.Service,
    //   location: searchValues.Location,
    //   range: newValue,
    // };
    // axiosPrivate
    //   .post("/search", checkData)
    //   .then((res) => {
    //     setSearch(res.data.data);
    //     console.log(res.data.data, "checkConsole");
    //     // const maxFilter = Math.max(
    //     //   ...res.data.data.map((fprice: any) => {
    //     //     if(fprice.priceType==="facilityPrice"){
    //     //       return fprice.FacilityPrices
    //     //     }
    //     //     else{
    //     //       return fprice.cashPrice
    //     //     }
    //     //   })
    //     // );
    //     // console.log(maxFilter, "....maxPrice");
    //     // setMaxPrice(maxFilter);

    //     // const minFilter = Math.min(
    //     //   ...res.data.data.map((fprice: any) =>  {
    //     //     if(fprice.priceType==="facilityPrice"){
    //     //       return fprice.FacilityPrices
    //     //     }
    //     //     else{
    //     //       return fprice.cashPrice
    //     //     }
    //     //   })
    //     // );
    //     // console.log(minFilter, "....minPrice");
    //     // setMinPrice(minFilter);
    //   })
    //   .catch((e) => console.log(e));

    if (facilityCheck === "") {
      filterFacilityType(
        "noFacilityTypeAndRangeAndDistanceAndScore",
        `${distance}mi`,
        facilityCheck,
        searchValues,
        newValue,
        scoreValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
        })
        .catch((e) => console.log(e));
    } else {
      filterFacilityType(
        "withFacilityTypeAndDistanceAndRangeAndScore",
        `${distance}mi`,
        facilityCheck,
        searchValues,
        newValue,
        scoreValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
        })
        .catch((e) => console.log(e));
    }
  }
  function sliderScoreChange(event: any, newValue: any, searchValues: any) {
    setService(true);
    // setScoreValue(newValue as number[]);
    console.log("newValue", newValue);
    // const pricefilter = searchData.filter((item: any) => {

    //   // Math.min(
    //   //   ...res.data.data.map((fprice: any) =>  {
    //   //     if(fprice.priceType==="facilityPrice"){
    //   //       return fprice.FacilityPrices
    //   //     }
    //   //     else{
    //   //       return fprice.cashPrice
    //   //     }
    //   //   })
    //   // );
    //   if(item.priceType==="facilityPrice"){
    //   return item.FacilityPrices >= newValue[0] && item.FacilityPrices <= newValue[1]
    //   }
    //   else{
    //     console.log(".....",item.cashPrice)
    //     return item.cashPrice >= newValue[0] && item.cashPrice <= newValue[1]

    //   }
    //   // return item.some((dataItem:any)=> (dataItem.FacilityPrices >= newValue[0] && dataItem.FacilityPrices <= newValue[1]));
    // });
    // console.log("pricefilter", pricefilter);
    // setSearch(pricefilter);
    // dispatch(dataSearch(pricefilter))

    // const checkData = {
    //   q: searchValues.Service,
    //   location: searchValues.Location,
    //   range: newValue,
    // };
    // axiosPrivate
    //   .post("/search", checkData)
    //   .then((res) => {
    //     setSearch(res.data.data);
    //     console.log(res.data.data, "checkConsole");
    //     // const maxFilter = Math.max(
    //     //   ...res.data.data.map((fprice: any) => {
    //     //     if(fprice.priceType==="facilityPrice"){
    //     //       return fprice.FacilityPrices
    //     //     }
    //     //     else{
    //     //       return fprice.cashPrice
    //     //     }
    //     //   })
    //     // );
    //     // console.log(maxFilter, "....maxPrice");
    //     // setMaxPrice(maxFilter);

    //     // const minFilter = Math.min(
    //     //   ...res.data.data.map((fprice: any) =>  {
    //     //     if(fprice.priceType==="facilityPrice"){
    //     //       return fprice.FacilityPrices
    //     //     }
    //     //     else{
    //     //       return fprice.cashPrice
    //     //     }
    //     //   })
    //     // );
    //     // console.log(minFilter, "....minPrice");
    //     // setMinPrice(minFilter);
    //   })
    //   .catch((e) => console.log(e));

    if (facilityCheck === "") {
      filterFacilityType(
        "noFacilityType",
        `${distance}mi`,
        facilityCheck,
        searchValues,
        value,
        newValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(maxFilter, "....maxPrice");
          
  
          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(minFilter, "....minPrice");
          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(1);
          } else {
            setValue([minFilter, minFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    } else {
      filterFacilityType(
        "withFacilityType",
        `${distance}mi`,
        facilityCheck,
        searchValues,
        value,
        newValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(maxFilter, "....maxPrice");
          
  
          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(minFilter, "....minPrice");
          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(1);
          } else {
            setValue([minFilter, minFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    }
  }

  function valuetext(userValue: number) {
    return `${userValue}$`;
  }

  const followersMarks = [
    {
      value: 10,

      label: "10mi",
    },

    {
      value: 50,

      label: "50mi",
    },

    {
      value: 100,

      label: "100mi",
    },
    //   {
    //     value:distance,
    //     label:`${distance}mi`
    //   }
  ];

  const distanceSliderChange = (v: any, searchValue: any) => {
    setDistance(v);
    if (facilityCheck === "") {
      filterFacilityType("noFacilityType", `${v}mi`, facilityCheck, searchValue,value,scoreValue)
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          console.log(res.data.data, "checkDistance");
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(maxFilter, "....maxPrice");

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(minFilter, "....minPrice");
          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(1);
          } else {
            setValue([minFilter, minFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    } else {
      filterFacilityType("withFacilityType", `${v}mi`, facilityCheck, searchValue,value,scoreValue)
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );

          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(1);
          } else {
            setValue([minFilter, minFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Box sx={{ backgroundColor: "primary.light", padding: "1.8rem" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, setFieldValue, values }) => (
          <Form>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Grid
                container
                columnSpacing={5}
                sx={{
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  background: "#6D90FE",
                  // height: "6em",
                  width: "80%",
                  // gap:"1rem",
                }}
              >
                <Grid item md={6} xs={12}>
                  <Field
                    as={TextField}
                    name="Service"
                    value={values.Service}
                    placeholder="Search Service"
                    type="text"
                    onChange={(e: any) => {
                      setCheckText(false);
                      setCheckFacText(false);
                      setFieldValue("Service", e.target.value);
                      setFacilityCheck("");
                      setDistance(30);
                    }}
                    fullWidth={true}
                    sx={{
                      borderRadius: 1,
                      "&::placeholder": {
                        fontSize: "1.1rem",
                        color: "black",
                      },
                      ".MuiInputBase-input": {
                        background: "white",
                      },
                      ".MuiFormLabel-root ": {
                        letterSpacing: "0.2rem",
                        fontSize: "0.8rem",
                      },
                      ".MuiInputLabel-shrink": {
                        letterSpacing: 0,
                      },
                    }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Field
                    as={TextField}
                    name="Location"
                    value={values.Location}
                    placeholder="Location"
                    type="text"
                    onChange={(e: any) => {
                      setCheckText(false);
                      setCheckFacText(false);
                      setFieldValue("Location", e.target.value);
                      setFacilityCheck("");
                      setDistance(30);
                    }}
                    fullWidth={true}
                    sx={{
                      borderRadius: 1,
                      "&::placeholder": {
                        fontSize: "1.1rem",
                        color: "black",
                      },
                      ".MuiInputBase-input": {
                        background: "white",
                      },
                      ".MuiFormLabel-root ": {
                        letterSpacing: "0.2rem",
                        fontSize: "0.8rem",
                      },
                      ".MuiInputLabel-shrink": {
                        letterSpacing: 0,
                      },
                    }}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <Button
                    type="submit"
                    size="large"
                    fullWidth={false}
                    variant="contained"
                    // onClick={() => { setSelect("searchdata") }}
                    sx={{
                      // marginTop: "-100px",
                      // ml: "350px",
                      backgroundColor: "#1C3988",

                      height: "7.3vh",
                      // width: "20vw",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      // gap:"1.2rem",

                      "&:hover": {
                        color: "secondary.dark",
                        border: "1px solid blue",
                        // letterSpacing: "0.2rem",
                        // fontSize: "1rem",
                      },
                    }}
                  >
                    <SearchIcon /> search
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {/* </Grid> */}

            {/* </Box> */}

            <Grid container xs={12} columnGap={5} mt="20px">
              <Grid
                item
                xs={2.5}
                sx={{
                  display: { xs: "none", md: "flex" },
                  padding: "1rem",
                  backgroundColor: "primary.dark",

                  flexDirection: "column",
                  rowGap: "14rem",
                }}
              >
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography
                    variant="h6"
                    sx={{ mb: "30px", fontSize: "2rem" }}
                  >
                    Filters
                  </Typography>

                  <Box>
                    <Paper
                      sx={{
                        fontSize: "1rem",
                        borderRadius: "20px",
                        backgroundColor: "#687B9E",
                        color: "white",
                        mb: "10px",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        padding: "0.2rem",
                      }}
                    >
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <KeyboardArrowUp sx={{ color: "white" }} />
                        ) : (
                          <KeyboardArrowDown sx={{ color: "white" }} />
                        )}
                      </IconButton>
                      Distance
                    </Paper>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      {/* <Grid item xs={12}>
                        <FormGroup
                        // name="distancefilter"
                        // value={distance}
                        >
                          <RadioGroup
                            name="length"
                            value={distance}
                            // onChange={handleInputChange}
                          >
                            <FormControlLabel
                              value="10mi"
                              control={
                                <Radio
                                  checked={distance === "10mi" && checkText}
                                  onClick={(e: any) => {
                                    handleInputChange(e, values);
                                  }}
                                />
                              }
                              label="10 miles"
                            />
                            <FormControlLabel
                              value="20mi"
                              control={
                                <Radio
                                  onClick={(e: any) => {
                                    handleInputChange(e, values);
                                  }}
                                  checked={distance === "20mi" && checkText}
                                />
                              }
                              label="20 miles"
                            />
                            <FormControlLabel
                              value="30mi"
                              control={
                                <Radio
                                  onClick={(e: any) => {
                                    handleInputChange(e, values);
                                  }}
                                  checked={distance === "30mi" && checkText}
                                />
                              }
                              label="30 miles"
                            />
                          </RadioGroup>
                        </FormGroup>
                      </Grid> */}
                      <Box sx={{ padding: "1rem 1rem 0 1rem" }}>
                        <Slider
                          value={distance}
                          valueLabelDisplay="on"
                          step={1}
                          marks={followersMarks}
                          min={10}
                          max={100}
                          onChange={(e, sliderValue: any) => {
                            setDistance(sliderValue);
                          }}
                          onChangeCommitted={(e, sliderValue) => {
                            distanceSliderChange(sliderValue, values);
                          }}
                        />
                      </Box>
                    </Collapse>
                  </Box>
                     <Box>
                    <Paper
                      sx={{
                        fontSize: "1rem",
                        borderRadius: "20px",
                        backgroundColor: "#687B9E",
                        color: "white",
                        mb: "10px",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        padding: "0.2rem",
                      }}
                    >
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen2(!open2)}
                      >
                        {open2 ? (
                          <KeyboardArrowUp sx={{ color: "white" }} />
                        ) : (
                          <KeyboardArrowDown sx={{ color: "white" }} />
                        )}
                      </IconButton>
                      Quality Score
                    </Paper>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                      <Box sx={{ padding: "0 1rem" }}>
                        {/* <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>Min</Typography>
                          <Typography>Max</Typography>
                        </Box> */}

                        <Slider
                          size="medium"
                          getAriaLabel={() => "Quality Score"}
                          value={scoreValue}
                          marks={[
                            { value: 1, label: 1 },
                            { value: 2, label: 2 },
                            { value: 3, label: 3 },
                            { value: 4, label: 4 },
                            { value: 5, label: 5 },
                          ]}
                          onChange={(e, sliderArray: any) => {
                            setScoreValue(sliderArray);
                          }}
                          onChangeCommitted={(event, v) =>
                            sliderScoreChange(event, v, values)
                          }
                          min={1}
                          max={5}
                          step={1}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetext}
                          sx={{
                            ".MuiSlider-thumb": {
                              height: 15,
                              width: 15,
                              backgroundColor: "#fff",
                              border: "2px solid #687B9E",
                              boxShadow: "0px 0px 5px  #687B9E",
                              "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible":
                                {
                                  boxShadow: "0px 0px 5px  #687B9E",
                                },
                              "&:before": {
                                display: "none",
                              },
                            },
                            color: "#687B9E",
                          }}
                        />
                      </Box>
                    </Collapse>
                  </Box>
                  <Box>
                    <Paper
                      sx={{
                        fontSize: "1rem",
                        borderRadius: "20px",
                        backgroundColor: "#687B9E",
                        color: "white",
                        mb: "10px",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        padding: "0.2rem",
                      }}
                    >
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen3(!open3)}
                      >
                        {open3 ? (
                          <KeyboardArrowUp sx={{ color: "white" }} />
                        ) : (
                          <KeyboardArrowDown sx={{ color: "white" }} />
                        )}
                      </IconButton>
                      Cash Rates
                    </Paper>
                    <Collapse in={open3} timeout="auto" unmountOnExit>
                      <Box sx={{ padding: "0 1rem" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>Min</Typography>
                          <Typography>Max</Typography>
                        </Box>

                        <Slider
                          size="medium"
                          getAriaLabel={() => "Price range"}
                          value={value}
                          marks={[
                            { value: value[0], label: value[0] },
                            { value: value[1], label: value[1] },
                          ]}
                          onChange={(e, sliderArray: any) => {
                            setValue(sliderArray);
                          }}
                          onChangeCommitted={(event, v) =>
                            sliderChange(event, v, values)
                          }
                          min={minPrice}
                          max={maxPrice}
                          step={1}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetext}
                          sx={{
                            ".MuiSlider-thumb": {
                              height: 15,
                              width: 15,
                              backgroundColor: "#fff",
                              border: "2px solid #687B9E",
                              boxShadow: "0px 0px 5px  #687B9E",
                              "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible":
                                {
                                  boxShadow: "0px 0px 5px  #687B9E",
                                },
                              "&:before": {
                                display: "none",
                              },
                            },
                            color: "#687B9E",
                          }}
                        />
                      </Box>
                    </Collapse>
                  </Box>

                  <Box>
                    <Paper
                      sx={{
                        fontSize: "1rem",
                        borderRadius: "20px",
                        backgroundColor: "#687B9E",
                        color: "white",
                        mb: "10px",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        padding: "0.2rem",
                      }}
                    >
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen4(!open4)}
                      >
                        {open4 ? (
                          <KeyboardArrowUp sx={{ color: "white" }} />
                        ) : (
                          <KeyboardArrowDown sx={{ color: "white" }} />
                        )}
                      </IconButton>
                      Facility Type
                    </Paper>
                    <Collapse in={open4} timeout="auto" unmountOnExit>
                      <Grid item xs={12}>
                        <FormGroup
                        // name="distancefilter"
                        // value={distance}
                        >
                          {/* {JSON.stringify(facilityType)} */}
                          <RadioGroup name="length" value={facilityCheck}>
                            {/* {JSON.stringify(facilityCheck)} */}
                            {facilityType.map((type: any, i: any) => (
                              <FormControlLabel
                                key={i}
                                value={type.facilityTypeId}
                                control={
                                  <Radio
                                    checked={
                                      facilityCheck === type.facilityTypeId &&
                                      checkFacText
                                    }
                                    onClick={(e: any) => {
                                      handleTypeInputChange(e, values);
                                    }}
                                    // onChange={(e:any)=>{
                                    //   console.log(e.target.value,e.target.checked)

                                    // }}
                                    // onChange={(e: any) => {
                                    //   setCheckFacText(true)
                                    //   console.log(e.target.value)
                                    //   console.log(e.target.checked)
                                    //   if (facilityCheck!=="") {

                                    //     if(distance===""){

                                    //       filterFacilityType("noDistance",distance,facilityCheck,values).then(res=>{
                                    //         dispatch(dataSearch(res.data.data))
                                    //       }).catch(e=>console.log(e))
                                    //     }else{
                                    //       filterFacilityType("facAndDistance",distance,facilityCheck,values).then(res=>{
                                    //         dispatch(dataSearch(res.data.data))
                                    //       }).catch(e=>console.log(e))
                                    //     }
                                    //     } else {

                                    //     if(distance ===""){

                                    //       filterFacilityType("default",distance,facilityCheck,values).then(res=>{
                                    //         dispatch(dataSearch(res.data.data))
                                    //       }).catch(e=>console.log(e))
                                    //     }else{
                                    //       filterFacilityType("noFacilityTy",distance,facilityCheck,values).then(res=>{
                                    //         dispatch(dataSearch(res.data.data))
                                    //       }).catch(e=>console.log(e))
                                    //   }
                                    //    }

                                    // }}
                                  />
                                }
                                label={type.item.split("-")[1]}
                                labelPlacement="end"
                              />
                            ))}
                          </RadioGroup>
                          {/* <FormControlLabel value="20mi"
                          control={<Checkbox
                            checked={distance === "20mi" && checkText}
                            onClick={handleInputChange}
                            onChange={() => {
                              distance != "20mi" ?
                              axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}&distance= 20mi`
                                )
                                .then((res) => {
                                  console.log(res.data, "20miles");
                                  dispatch(dataSearch(res.data.data))
                                  // setSearchqueryData(res.data.data)
                                })
                                .catch((e) => console.log(e))
                                :axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}`
                                )
                                .then((res) => {
                                  console.log(res.data);
                                  // setSearchqueryData(res.data.data)
                                   dispatch(dataSearch(res.data.data));
                                  // navigate("/patient/search");
                                  console.log("searchi", res);
                                })
                                .catch((e) => console.log(e))
                            }} />}
                          label="Hospital" labelPlacement="end"
                          />
                        <FormControlLabel value="30mi"
                          control={<Checkbox
                            checked={distance === "30mi" && checkText}
                            onClick={handleInputChange}
                            onChange={() => {
                              distance != "30mi" ?
                              axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}&distance= 30mi`
                                )
                                .then((res) => {
                                  console.log(res.data, "30miles");
                                  dispatch(dataSearch(res.data.data))
                                  // setSearchqueryData(res.data.data)
                                })
                                .catch((e) => console.log(e))
                                :axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}`
                                )
                                .then((res) => {
                                  console.log(res.data);
                                  // setSearchqueryData(res.data.data)
                                   dispatch(dataSearch(res.data.data));
                                  // navigate("/patient/search");
                                  console.log("searchi", res);
                                })
                                .catch((e) => console.log(e))
                            }} />}
                          label="Urgent care" 
                          labelPlacement="end" />
                           <FormControlLabel value="30mi"
                          control={<Checkbox
                            checked={distance === "30mi" && checkText}
                            onClick={handleInputChange}
                            onChange={() => {
                              distance != "30mi" ?
                              axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}&distance= 30mi`
                                )
                                .then((res) => {
                                  console.log(res.data, "30miles");
                                  dispatch(dataSearch(res.data.data))
                                  // setSearchqueryData(res.data.data)
                                })
                                .catch((e) => console.log(e))
                                :axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}`
                                )
                                .then((res) => {
                                  console.log(res.data);
                                  // setSearchqueryData(res.data.data)
                                   dispatch(dataSearch(res.data.data));
                                  // navigate("/patient/search");
                                  console.log("searchi", res);
                                })
                                .catch((e) => console.log(e))
                            }} />}
                          label="Anthem" 
                          labelPlacement="end" /> */}
                        </FormGroup>
                      </Grid>
                    </Collapse>
                  </Box>
                  {/* </Box> */}
                </Box>
                <Grid item sx={{ display: { xs: "none" } }}>
                  <Box
                    sx={{
                      backgroundColor: "#D9D9D9",
                      height: "35vh",
                      width: "250px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "2rem" }} textAlign={"center"}>
                      Map Place holder
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container sx={{ display: { xs: "block", md: "none" } }}>
                <Box>
                  <IconButton
                    size="large"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {/* <ClearIcon onClick={handleCloseNavMenu}/> */}

                    <MenuItem
                      // onClick={handleCloseNavMenu}
                      sx={{ width: 250, fontSize: "1.25rem" }}
                    >
                      <Box>
                        {/* <Paper sx={{
                    fontSize: "1rem",
                    borderRadius: "20px",
                    backgroundColor: "#CDDBF8",
                    mb: "10px"
                  }}> */}
                        <IconButton
                          sx={{ fontSize: "1rem" }}
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen(!open)}
                        >
                          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                        Distance
                        {/* </Paper> */}
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Box sx={{ padding: "1rem 1rem 0 1rem" }}>
                            <Slider
                              value={distance}
                              valueLabelDisplay="on"
                              step={1}
                              marks={followersMarks}
                              min={10}
                              max={100}
                              onChange={(e, sliderValue: any) => {
                                setDistance(sliderValue);
                                
                              }}
                              onChangeCommitted={(e, sliderValue) => {
                                distanceSliderChange(sliderValue, values);
                                handleCloseNavMenu()
                              }}
                            />
                          </Box>
                        </Collapse>
                      </Box>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNavMenu} sx={{ width: 250 }}>
                      <Typography
                        sx={{
                          // color: location === "facility" ? "#4D77FF" : "default",
                          fontSize: "1.1rem",
                          // borderBottom: location === "facility" ? "3px solid blue" : "none",
                          // padding: "0.3rem",

                          cursor: "pointer",
                        }}
                      >
                        Quality Score
                      </Typography>
                    </MenuItem>

                    <MenuItem >
                    <Box sx={{display:'flex',flexDirection:"column"}}>
                      <Box sx={{display:'flex'}}>
                      <IconButton
                        sx={{ fontSize: "1rem" }}
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen3(!open3)}
                      >
                        {open3 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                      <Typography sx={{ fontSize: "1.25rem" }}>Cash Rates</Typography>
                      
                      </Box>
                      <Collapse in={open3} timeout="auto" unmountOnExit>
                        <Box sx={{ padding: "0 1rem" }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography>Min</Typography>
                            <Typography>Max</Typography>
                          </Box>

                          <Slider
                            size="medium"
                            getAriaLabel={() => "Price range"}
                            value={value}
                            marks={[
                              { value: value[0], label: value[0] },
                              { value: value[1], label: value[1] },
                            ]}
                            onChange={(e, sliderArray: any) => {
                              setValue(sliderArray);
                            }}
                            onChangeCommitted={(event, v) =>{
                              sliderChange(event, v, values)
                              handleCloseNavMenu()
                            }
                            }
                            min={minPrice}
                            max={maxPrice}
                            step={1}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            sx={{
                              ".MuiSlider-thumb": {
                                height: 15,
                                width: 15,
                                backgroundColor: "#fff",
                                border: "2px solid #687B9E",
                                boxShadow: "0px 0px 5px  #687B9E",
                                "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible":
                                  {
                                    boxShadow: "0px 0px 5px  #687B9E",
                                  },
                                "&:before": {
                                  display: "none",
                                },
                              },
                              color: "#687B9E",
                            }}
                          />
                        </Box>
                      </Collapse>
                      </Box>
                    </MenuItem>

                    <MenuItem sx={{ width: 250, fontSize: "1.25rem" }}>
                      <Box>
                        {/* <Paper sx={{
                    fontSize: "1rem",
                    borderRadius: "20px",
                    backgroundColor: "#CDDBF8",
                    mb: "10px"
                  }}> */}
                        <IconButton
                          sx={{ fontSize: "1rem" }}
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen4(!open4)}
                        >
                          {open4 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                        Facility Type
                        {/* </Paper> */}
                        <Collapse in={open4} timeout="auto" unmountOnExit>
                          <Grid item xs={12}>
                            <FormGroup
                            // name="distancefilter"
                            // value={distance}
                            >
                              {/* {JSON.stringify(facilityType)} */}
                              <RadioGroup name="length" value={facilityCheck}>
                                {/* {JSON.stringify(facilityCheck)} */}
                                {facilityType.map((type: any, i: any) => (
                                  <FormControlLabel
                                    key={i}
                                    value={type.facilityTypeId}
                                    control={
                                      <Radio
                                        checked={
                                          facilityCheck ===
                                            type.facilityTypeId && checkFacText
                                        }
                                        onClick={(e: any) => {
                                          handleTypeInputChange(e, values);
                                          handleCloseNavMenu();
                                        }}
                                        // onChange={(e:any)=>{
                                        //   console.log(e.target.value,e.target.checked)

                                        // }}
                                        // onChange={(e: any) => {
                                        //   setCheckFacText(true)
                                        //   console.log(e.target.value)
                                        //   console.log(e.target.checked)
                                        //   if (facilityCheck!=="") {

                                        //     if(distance===""){

                                        //       filterFacilityType("noDistance",distance,facilityCheck,values).then(res=>{
                                        //         dispatch(dataSearch(res.data.data))
                                        //       }).catch(e=>console.log(e))
                                        //     }else{
                                        //       filterFacilityType("facAndDistance",distance,facilityCheck,values).then(res=>{
                                        //         dispatch(dataSearch(res.data.data))
                                        //       }).catch(e=>console.log(e))
                                        //     }
                                        //     } else {

                                        //     if(distance ===""){

                                        //       filterFacilityType("default",distance,facilityCheck,values).then(res=>{
                                        //         dispatch(dataSearch(res.data.data))
                                        //       }).catch(e=>console.log(e))
                                        //     }else{
                                        //       filterFacilityType("noFacilityTy",distance,facilityCheck,values).then(res=>{
                                        //         dispatch(dataSearch(res.data.data))
                                        //       }).catch(e=>console.log(e))
                                        //   }
                                        //    }

                                        // }}
                                      />
                                    }
                                    label={type.item.split("-")[1]}
                                    labelPlacement="end"
                                  />
                                ))}
                              </RadioGroup>
                              {/* <FormControlLabel value="20mi"
                          control={<Checkbox
                            checked={distance === "20mi" && checkText}
                            onClick={handleInputChange}
                            onChange={() => {
                              distance != "20mi" ?
                              axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}&distance= 20mi`
                                )
                                .then((res) => {
                                  console.log(res.data, "20miles");
                                  dispatch(dataSearch(res.data.data))
                                  // setSearchqueryData(res.data.data)
                                })
                                .catch((e) => console.log(e))
                                :axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}`
                                )
                                .then((res) => {
                                  console.log(res.data);
                                  // setSearchqueryData(res.data.data)
                                   dispatch(dataSearch(res.data.data));
                                  // navigate("/patient/search");
                                  console.log("searchi", res);
                                })
                                .catch((e) => console.log(e))
                            }} />}
                          label="Hospital" labelPlacement="end"
                          />
                        <FormControlLabel value="30mi"
                          control={<Checkbox
                            checked={distance === "30mi" && checkText}
                            onClick={handleInputChange}
                            onChange={() => {
                              distance != "30mi" ?
                              axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}&distance= 30mi`
                                )
                                .then((res) => {
                                  console.log(res.data, "30miles");
                                  dispatch(dataSearch(res.data.data))
                                  // setSearchqueryData(res.data.data)
                                })
                                .catch((e) => console.log(e))
                                :axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}`
                                )
                                .then((res) => {
                                  console.log(res.data);
                                  // setSearchqueryData(res.data.data)
                                   dispatch(dataSearch(res.data.data));
                                  // navigate("/patient/search");
                                  console.log("searchi", res);
                                })
                                .catch((e) => console.log(e))
                            }} />}
                          label="Urgent care" 
                          labelPlacement="end" />
                           <FormControlLabel value="30mi"
                          control={<Checkbox
                            checked={distance === "30mi" && checkText}
                            onClick={handleInputChange}
                            onChange={() => {
                              distance != "30mi" ?
                              axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}&distance= 30mi`
                                )
                                .then((res) => {
                                  console.log(res.data, "30miles");
                                  dispatch(dataSearch(res.data.data))
                                  // setSearchqueryData(res.data.data)
                                })
                                .catch((e) => console.log(e))
                                :axiosPrivate
                                .get(
                                  `http://210.18.155.251:5003/search/?q=${values.Service}&location=${values.Location}`
                                )
                                .then((res) => {
                                  console.log(res.data);
                                  // setSearchqueryData(res.data.data)
                                   dispatch(dataSearch(res.data.data));
                                  // navigate("/patient/search");
                                  console.log("searchi", res);
                                })
                                .catch((e) => console.log(e))
                            }} />}
                          label="Anthem" 
                          labelPlacement="end" /> */}
                            </FormGroup>
                          </Grid>
                        </Collapse>
                      </Box>
                    </MenuItem>
                  </Menu>
                  {/* <SearchNav/> */}
                </Box>
              </Grid>
              <Grid
                item
                md={9}
                sx={{
                  display: { xs: "none", md: "block" },
                  backgroundColor: "#E5EEF7",
                  padding: "4rem",
                }}
              >
                {/* {select === 'searchdata' ?    
                <            */}
                
                { search.length!==0?   search.map((dsearch: any, i: any) => (
                  <div key={i}>
                    <Paper elevation={3}>
                      <Card
                        raised
                        sx={{
                          backgroundColor: "#CDDBF8",
                          padding: "15px",

                          mb: "2rem",
                        }}
                      >
                        <Grid container direction="row">
                          <Grid xs={9}>
                            <Typography
                              sx={{
                                fontSize: "1.40rem",
                                color: "black",
                                mb: "20px",
                              }}
                            >
                              {dsearch?.facilityDetails?.facilityName}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                color: "black",
                                mb: "20px",
                              }}
                            >
                              {dsearch.priceType === "facilityPrice"
                                ? dsearch.facilityDetails?.address
                                    ?.addressLine1 +
                                  "," +
                                  dsearch.facilityDetails?.address?.city +
                                  "," +
                                  dsearch.facilityDetails?.address?.state +
                                  " - " +
                                  dsearch.facilityDetails?.address?.zipCode
                                : dsearch.facilityDetails?.addressLine1 +
                                  "," +
                                  dsearch.facilityDetails?.city +
                                  "," +
                                  dsearch.facilityDetails?.state +
                                  " - " +
                                  dsearch.facilityDetails?.zipCode}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                color: "black",
                                mb: "10px",
                              }}
                            >
                              {dsearch.priceType === "facilityPrice"
                                ? dsearch.DiagnosisTestorServiceName
                                : dsearch.serviceName}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                color: "blue",
                                mb: "10px",
                              }}
                            >
                              Distance: {dsearch.distance} miles
                            </Typography>
                          </Grid>
                          <Grid xs={3}>
                            <Grid
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                padding: "10px",
                              }}
                            >
                              <Box
                                sx={{
                                  borderRadius: "0.5rem",
                                  padding: "0.8rem",
                                  // width: "100px",
                                  fontSize: "1.35rem",
                                  backgroundColor: "#1C3988",
                                  color: "white",
                                  mb: "10px",
                                  textAlign: "center",
                                }}
                              >
                                $
                                {dsearch.priceType === "facilityPrice"
                                  ? dsearch.FacilityPrices
                                  : dsearch.cashPrice}
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: "15px",

                                  // width: "100px",
                                }}
                              >
                                {dsearch.priceType === "facilityPrice"
                                  ? "Average Price"
                                  : "Cash Price"}
                              </Typography>
                            </Grid>
                            <Grid
                              container
                              direction="row"
                              justifyContent="flex-end"
                              alignItems={"center"}
                              gap={"1rem"}
                            >
                              <Typography
                                sx={{
                                  fontSize: "1.25rem",
                                  color: "black",
                                  // mr: "60px",
                                }}
                              >
                                Rating :
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "1.5rem",
                                  color: "black",
                                  // mb: "15px",
                                }}
                              >
                                {dsearch?.facilityDetails?.rating}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Card>
                    </Paper>
                  </div>
                )): <Box sx={{display:"flex",justifyContent:'center',alignItems:"center",height:"10vh"}}><Typography>No result</Typography></Box>
              }
              </Grid>
            </Grid>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
              }}
            >
              {search.length!==0?  search.map((dsearch: any, i: any) => (
                <>
                  <Paper
                    sx={{ padding: "0.5rem", m: "0.2rem", fontSize: "0.9rem" }}
                  >
                    <IconButton onClick={() => setOpen(open === i ? -1 : i)}>
                      <ArrowDropDown
                        sx={{ transform: open === i ? "i" : "rotate(-90deg)" }}
                      />
                      {open === i ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                    {dsearch?.facilityDetails?.facilityName}
                  </Paper>

                  <Collapse in={open === i} timeout="auto" unmountOnExit>
                    <Paper
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mt: "0.2rem",
                        padding: "1rem",
                      }}
                    >
                      <Grid xs={8}>
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            color: "black",
                            mb: "10px",
                          }}
                        >
                                    {dsearch.priceType === "facilityPrice"
                                ? dsearch.facilityDetails?.address
                                    ?.addressLine1 +
                                  "," +
                                  dsearch.facilityDetails?.address?.city +
                                  "," +
                                  dsearch.facilityDetails?.address?.state +
                                  " - " +
                                  dsearch.facilityDetails?.address?.zipCode
                                : dsearch.facilityDetails?.addressLine1 +
                                  "," +
                                  dsearch.facilityDetails?.city +
                                  "," +
                                  dsearch.facilityDetails?.state +
                                  " - " +
                                  dsearch.facilityDetails?.zipCode}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            color: "black",
                            mb: "10px",
                          }}
                        >
                          {dsearch.priceType === "facilityPrice"
                                ? dsearch.DiagnosisTestorServiceName
                                : dsearch.serviceName}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.9rem", color: "blue", mb: "10px" }}
                        >
                          Distance: {dsearch.distance} miles
                        </Typography>
                      </Grid>
                      <Grid xs={4}>
                        <Grid
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            // padding: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "0.5rem",
                              padding: "0.5rem",
                              width: "100px",
                              fontSize: "0.8rem",
                              backgroundColor: "#1C3988",
                              color: "white",
                              // mb: "10px",
                              textAlign: "center",
                            }}
                          >
                            $ {dsearch.priceType === "facilityPrice"
                                  ? dsearch.FacilityPrices
                                  : dsearch.cashPrice}
                          </Box>
                          <Typography
                            sx={{
                              fontSize: "10px",

                              // width: "100px",
                            }}
                          >
                           {dsearch.priceType === "facilityPrice"
                                  ? "Average Price"
                                  : "Cash Price"}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-end"
                          alignItems={"center"}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              color: "black",
                              // mr: "60px",
                              // mt: "30px",
                            }}
                          >
                            Rating :
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "black",
                              // mb: "15px",
                            }}
                          >
                            {dsearch?.facilityDetails?.rating}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Collapse>
                </>
              )):<Box sx={{display:"flex",justifyContent:'center',alignItems:"center",height:"10vh"}}><Typography>No result</Typography></Box>
            }
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
