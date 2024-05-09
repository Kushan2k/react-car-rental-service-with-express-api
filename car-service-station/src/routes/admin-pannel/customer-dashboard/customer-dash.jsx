import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CustomerDashboard from "../../../pages/customer/dasboard-outlayer";
import LandingPage from "../../../pages/customer/landing-page";
import OngoingService from "../../../pages/customer/ongoing";
import Services from "../../../pages/customer/new-services";
import NotFoundCustomer from "../../../components/404/notFoundCustomer";
import Vehiclas from "../../../pages/customer/vehiclas";

function CustomerRoute() {

  const navigate=useNavigate()


  useEffect(() => {

    if(localStorage.getItem("token")){
      const user = JSON.parse(localStorage.getItem("user"))
      
      if (user) {
        if (user.role === 'USER') {
          navigate("/customer-dashboard/")
        } else if (user.role === 'ADMIN') {
          navigate("/admin-dashboard/")
        }
      }
    }
    
  },[])

  return (
    <Routes>
      <Route path="/*" element={<CustomerDashboard />}>
        <Route index element={<LandingPage />} />
        <Route path="new-service" element={<Services />} />
        <Route path="services" element={<OngoingService />} />
        <Route path="vehicals" element={<Vehiclas />} />
        <Route element={<NotFoundCustomer />} path="*" />
      </Route>
    </Routes>
  );
}

export default CustomerRoute;
