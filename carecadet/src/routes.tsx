//pages
import Patient from "./Pages/testPages/Patient";
import Provider from "./Pages/testPages/Provider";
import Payer from "./Pages/testPages/Payer";
import Contact from "./Pages/Contact/Contact";

// other
import { FC } from "react";
import OrganizationInfo from "./Pages/Organization/OrganizationInfo";
import EditOrganization from "./Pages/Organization/EditOrganization";
import CreateFacility from "./Pages/Facility/CreateFacility";
import UpdateFacility from "./Pages/Facility/EditFacility";
import ViewFacility from "./Pages/Facility/ViewFacility";
import Pricelist from "./Pages/Services/pricelist";
import PricelistUpload from "./Pages/Services/PricelistUpload";
import PricelistEditpage from "./Pages/Services/pricelisteditpage";
import Pricelistlandingpage from "./Pages/Services/pricelistlandingpage";
import Servicelandingpage from "./Pages/Services/servicelandpage";
import ServiceViewPage from "./Pages/Services/serviceview";
import ServiceEditpage from "./Pages/Services/ServiceEditpage";
import PricelistthroFacility from "./Pages/Services/pricelistthrofacility";
import PricelistUploadthroFacility from "./Pages/Services/PricelistUploadthrofacility"

import Login from "./Pages/LoginSignup/Login";
import Home from "./Pages/testPages/Home";
import Signup from "./Pages/LoginSignup/Signup";
import ProviderLandingPage from "./Pages/testPages/Landingpage";

import Providerhomepage from "./Pages/Home/providerhomepage";
import Patienthomepage from "./Pages/Home/patienthomepage";
import Loginurgentcare from "./Pages/LoginSignup/Loginurgentcare";
import Logindentalcare from "./Pages/LoginSignup/Logindentalcare";
import Loginlabs from "./Pages/LoginSignup/Loginlabs";
import Loginothers from "./Pages/LoginSignup/Loginothers";
import LoginPatient from "./Pages/LoginSignup/LoginPatient";
import SignupPatient from "./Pages/LoginSignup/SignupPatient";
import ServiceView from "./Pages/serviceView/ServiceView";
import PublishService from "./Pages/serviceView/PublishService";

interface Route {
  key: string;
  title?: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
  color?: string;
}

export const navRoutes: Array<Route> = [
  // {
  //   key: "patient",
  //   title: "Patient",
  //   path: "/",
  //   color: "patient",
  //   enabled: true,
  //   component: Searchtwo,
  // },
  // {
  //   key: "provider",
  //   title: "Provider",
  //   color: "provider",
  //   path: "/provider/home",
  //   enabled: true,
  //   component: Searchone,
  // },
  // {
  //   key: "payer",
  //   title: "Payer",
  //   path: "/payer",
  //   color: "payer",
  //   enabled: true,
  //   component: Payer,
  // },
  {
    key: "contact",
    title: "Contact",
    path: "/contact",
    color: "contact",
    enabled: true,
    component: Contact,
  },
];

//**************************Provider Router***************************************************

export const providerLogin: Array<Route> = [
  // {
  //   key: "home",
  //   path: "/",
  //   enabled: true,
  //   component: Searchtwo,
  // },
  // {
  //   key: "providerHome",
  //   path: "/provider/home",
  //   enabled: true,
  //   component: Searchone,
  // },
  {
    key: "login",
    title: "login",
    path: "/provider/login",
    enabled: true,
    component: Login,
  },
  {
    key: "signup",
    title: "Signup",
    path: "/provider/signup",
    enabled: true,
    component: Signup,
  },
  {
    key: "login",
    path: "/provider/urgentcarelogin",
    enabled: true,
    component: Loginurgentcare,
  },
  {
    key: "login",
    path: "/provider/dentalcarelogin",
    enabled: true,
    component: Logindentalcare,
  },
  {
    key: "login",
    path: "/provider/labcarelogin",
    enabled: true,
    component: Loginlabs,
  },
  {
    key: "login",
    path: "/provider/otherslogin",
    enabled: true,
    component: Loginothers,
  },

  // {
  //   key: "home",
  //   title: "Org",
  //   path: "/provider/homeLogin",
  //   enabled: true,
  //   component: Home,
  // },
  

  // {
  //   key: "contact",
  //   title: "Contact",
  //   path: "/contact",
  //   enabled: true,
  //   component: Contact,
  // }
];

export const providerRoutespages: Array<Route> = [
  // {
  //   key: "patient",
  //   title: "Patient",
  //   path: "/patient",
  //   enabled: true,
  //   component: Patient,
  // },
  // {
  //   key: "provider",
  //   title: "Provider",
  //   path: "/provider",
  //   enabled: true,
  //   component: Provider,
  // },
  // {
  //   key: "payer",
  //   title: "Payer",
  //   path: "/payer",
  //   enabled: true,
  //   component: Payer,
  // },
  // {
  //   key: "contact",
  //   title: "Contact",
  //   path: "/contact",
  //   enabled: true,
  //   component: Contact,
  // },
  // {
  //   key: "providerorg",
  //   title: "providerOrg",
  //   path: "/providerlanding",
  //   enabled: true,
  //   component: ProviderLandingPage,
  // },

  // {
  //   key: "login",
  //   path: "/provider/login",
  //   enabled: true,
  //   component: Login,
  // },
  {
    key: "org",
    title: "Org",
    path: "/provider/org",
    enabled: true,
    component: OrganizationInfo,
  },
  {
    key: "editOrg",
    title: "editOrg",
    path: "/provider/editOrg",
    enabled: true,
    component: EditOrganization,
  },
  {
    key: "serviceView",
    title: "serviceView",
    path: "/provider/serviceView/serviceView",
    enabled: true,
    component: ServiceView,
  },
  {
    key: "publishservice",
    title: "publishservice",
    path: "/provider/serviceView/publishservice",
    enabled: true,
    component: PublishService,
  },
  {
    key: "viewFacility",
    title: "Facility",
    path: "/provider/facility/viewFacility",
    enabled: true,
    component: ViewFacility,
  },
  {
    key: "createFacility",
    title: "Facility",
    path: "/provider/facility/addFacility",
    enabled: true,
    component: CreateFacility,
  },
  {
    key: "updateFacility",
    title: "Facility",
    path: "/provider/facility/update",
    enabled: true,
    component: UpdateFacility,
  },
  {
    key: "pricelist",
    title: "Pricelist",
    path: "/provider/service/pricelist",
    enabled: true,
    component: Pricelist,
  },
  // {
  //   key: "pricelist",
  //   title: "Pricelist",
  //   path: "/provider/facility/pricelist",
  //   enabled: true,
  //   component: Pricelist,
  // },
  {
    key: "pricelistupload",
    title: "PricelistUpload",
    path: "/provider/service/PricelistUpload",
    enabled: true,
    component: PricelistUpload,
  },
  {
    key: "pricelistedit",
    title: "Pricelistedit",
    path: "/provider/facility/pricelistedit",
    enabled: true,
    component: PricelistEditpage,
  },
  {
    key: "pricelistlanding",
    title: "Pricelistlanding",
    path: "/provider/facility/pricelistlanding",
    enabled: true,
    component: Pricelistlandingpage,
  },
  {
    key: "listSevices",
    title: "listSevices",
    path: "/provider/service/listService",
    enabled: true,
    component: Servicelandingpage,
  },
  {
    key: "servicelanding",
    title: "Servicelanding",
    path: "/provider/service/servicelanding",
    enabled: true,
    component: Servicelandingpage,
  },
  {
    key: "serviceview",
    title: "Serviceview",
    path: "/provider/service/serviceview",
    enabled: true,
    component: ServiceViewPage,
  },
  {
    key: "serviceedit",
    title: "ServiceEdit",
    path: "/provider/service/ServiceEditPage",
    enabled: true,
    component: ServiceEditpage,
  },
  {
    key: "pricelistthrofacility",
    title: "Pricelistthrofacility",
    path: "/provider/facility/pricelistthrofacility",
    enabled: true,
    component: PricelistthroFacility,
  },
  {
    key: "pricelistuploadthrofacility",
    title: "PricelistUploadthroFacility",
    path: "/provider/facility/PricelistUploadthrofacility",
    enabled: true,
    component: PricelistUploadthroFacility,
  },
  // {
  //   key: "searchone",
  //   title: "Searchone",
  //   path: "/searchone",
  //   enabled: true,
  //   component: Searchone,
  // },
  // {
  //   key: "searchtwo",
  //   title: "Searchtwo",
  //   path: "/searchtwo",
  //   enabled: true,
  //   component: Searchtwo,
  // },
];

//*******************************************Patient Router ****************************************/
export const patientLogin: Array<Route> = [
  // {
  //   key: "patientHome",
  //   path: "/",
  //   enabled: true,
  //   component: Searchtwo,
  // },
  {
    key: "patitentLogin",
    path: "/patient/login",
    enabled: true,
    component: LoginPatient,
  },
  {
    key: "patientSignup",
    path: "/patient/signup",
    enabled: true,
    component: SignupPatient,
  },

];

export const patientRoutes: Array<Route> = [
  {
    key: "patient",
    title: "Patient",
    path: "/patient/checkPage",
    enabled: true,
    component: Patient,
  },
];

// *****************************************Payer Router *******************************************/

export const payerLogin: Array<Route> = [
  {
    key: "payer",
    path: "/payer",
    enabled: true,
    component: Payer,
  },
];
// ******************************************CommonPages *****************************************************/
export const commonHome: Array<Route> = [
  // {
  //   key: "payer",
  //   path: "/payer",
  //   enabled: true,
  //   component: Payer,
  // },
  // {
  //   key: "patientHome",
  //   path: "/",
  //   enabled: true,
  //   component: Searchtwo,
  // },
  // {
  //   key: "providerHome",
  //   path: "/provider/home",
  //   enabled: true,
  //   component: Searchone,
  // },
  {
    key: "contact",
    path: "/contact",
    enabled: true,
    component: Contact,
  },
];

export const homePage:Array<Route>=[
  {
    key: "patientHome",
    path: "/",
    enabled: true,
    component: Patienthomepage,
  },
  {
    key: "providerHome",
    path: "/provider/home",
    enabled: true,
    component:Providerhomepage,
  },
]