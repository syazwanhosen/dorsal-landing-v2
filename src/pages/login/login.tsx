import React from "react";
import Login from "../../components/login/login"; 
import { ScrollToTop } from "@/components/ScrollToTop";

const LoginPage: React.FC = () => {
  return (
    <>
      <Login />
    <ScrollToTop />
   </>
  );
};

export default LoginPage;
