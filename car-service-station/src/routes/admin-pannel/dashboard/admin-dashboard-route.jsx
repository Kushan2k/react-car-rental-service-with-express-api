import React, { useContext, useEffect } from "react";
import Dashboard from "../../../pages/admin/dasboard-outlayer";
import LandingPage from "../../../pages/admin/landing-page";
import { Route, Routes, useNavigate } from "react-router-dom";
import OngoingService from "../../../pages/admin/ongoing";
import FinishedServices from "../../../pages/admin/finished";
import ManageCustomers from "../../../pages/admin/customers";
import NotFoundAdmin from "../../../components/404/notFoundAdmin";
import { AdminContext } from "../../../context/admin-details";

function AdminRoute() {

  const { currentUser } = useContext(AdminContext)
  
  const navigate=useNavigate()

  useEffect(() => {
    
    if (!currentUser) {
      navigate('/')
    }
  },[])
  return (
    <Routes>
      <Route path="/*" element={<Dashboard />}>
        <Route index element={<LandingPage />} />
        <Route path="ongoing-services" element={<OngoingService />} />
        <Route path="finished-services" element={<FinishedServices />} />
        <Route path="manage-customers" element={<ManageCustomers />} />
        <Route element={<NotFoundAdmin />} path="*" />
      </Route>
    </Routes>
  );
}

export default AdminRoute;
