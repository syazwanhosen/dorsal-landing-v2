import { RouteObject } from "react-router-dom";
import { lazy } from "react";

// Layout
import { SidebarLayout } from "./layouts/SidebarLayout";

// Lazy-loaded pages/components
const App = lazy(() => import("./App"));
const Data = lazy(() => import("./pages/data/Data"));
const Roadmap = lazy(() => import("./pages/roadmap/roadmap"));
const HospitalSearch = lazy(() => import("./pages/Hospital_search/HospitalSearch"));
const Login = lazy(() => import("./pages/auth/login/login"));
const Signup = lazy(() => import("./pages/auth/signup/signup"));
const Account = lazy(() => import("./pages/Account/Account"));
const AddBill = lazy(() => import("./pages/add_bill"));
const Authorized = lazy(() => import("./pages/authorized-account/authorized"));
const About = lazy(() => import("./pages/about/about"));
const UploadDocumentPage = lazy(() => import("./pages/add_bill/upload_document"));
const EnterManualData = lazy(() => import("./pages/add_bill/manual_data"));
const Hospitals = lazy(() => import("./pages/hospitals/Hospitals"));
const HospitalDetails = lazy(() => import("./pages/hospital_details/HospitalDetails"));

export const appRoutes: RouteObject[] = [
    { path: "/", element: <App /> },
    { path: "/data", element: <Data /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {
        path: "/account",
        element: <SidebarLayout />,
        children: [
            { index: true, element: <Account /> },
            { path: "add-bill", element: <AddBill /> },
            { path: "add-bill/upload-document", element: <UploadDocumentPage /> },
            { path: "add-bill/manual-entry", element: <EnterManualData /> },
            { path: "about", element: <About /> }, 
            { path: "authorized-account", element: <Authorized /> }, 
        ],
        

    },
    { path: "/hospitals", element: <Hospitals /> },
    { path: "/hospital_search", element: <HospitalSearch /> },
    { path: "/hospital_details", element: <HospitalDetails /> },
    { path: "/raodmap", element: <Roadmap /> }, 
];