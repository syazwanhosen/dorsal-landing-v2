import { RouteObject } from "react-router-dom";
import { lazy } from "react";

// Layout
import { SidebarLayout } from "./layouts/SidebarLayout";

// Lazy-loaded pages/components
const App = lazy(() => import("./App"));
const Data = lazy(() => import("./pages/data/Data"));
const Login = lazy(() => import("./pages/login/login"));
const Signup = lazy(() => import("./components/signup/signup"));
const Account = lazy(() => import("./pages/Account/Account"));
const AddBill = lazy(() => import("./pages/add_bill"));
const UploadDocumentPage = lazy(() => import("./pages/add_bill/upload_document"));
const EnterManualData = lazy(() => import("./pages/add_bill/EnterManualData"));
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
        ],
    },
    { path: "/hospitals", element: <Hospitals /> },
    { path: "/hospital_details", element: <HospitalDetails /> },
];