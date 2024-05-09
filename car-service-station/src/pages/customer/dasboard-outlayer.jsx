import React, { Fragment, useContext, useEffect } from "react";
import {
  Bars3Icon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";
import CustomerSidebar from "../../components/customer-sidebar/customer-sidebar";
import { CustomerContext } from "../../context/customer-details";

const CustomerDashboard = () => {


  const navigate = useNavigate();
  const logout = () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem('token')
      navigate("/");
    } catch (er) {
      
    }
  };

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('user'))
    
    if(user.role==='ADMIN'){
      navigate('/admin-dashboard')
    }
    
  }, []);

  const { currentUser, setCurrentUser } = useContext(CustomerContext);

  return (
    <Fragment>
      <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <CustomerSidebar />
          <div className="flex flex-col w-full md:space-y-4">
            <header className="z-40 flex items-center justify-between w-full h-16">
              <div className="block ml-6 lg:hidden">
                <button className="flex items-center p-2 text-gray-500 bg-white rounded-full shadow text-md">
                  <Bars3Icon className="h-7 w-7" />
                </button>
              </div>
              <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
                <div className="relative flex items-center justify-end w-full p-1 space-x-4">
                  <div className="flex flex-col justify-end items-end">
                    <div className="group relative  flex justify-center">
                      <button
                        className="flex items-center p-2 text-red-500 bg-white rounded-full shadow hover:text-red-700 text-md"
                        onClick={logout}
                      >
                        <ArrowRightOnRectangleIcon className="w-7 h-7" />
                        <span className="absolute w-16  top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                          Log Out
                        </span>
                      </button>
                    </div>
                  </div>

                  <span className="w-1 h-8 bg-gray-200 rounded-lg "></span>
                  {currentUser && (
                    <div className="flex items-center text-gray-500 dark:text-white text-md">
                      {currentUser.first_name} {currentUser.last_name}
                    </div>
                  )}

                  <div className="relative block">
                    <img
                      alt='profile-pic'
                      src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                      className="mx-auto object-cover rounded-full h-10 w-10 border-2 p-1 border-gray-300 "
                    />
                  </div>
                </div>
              </div>
            </header>
            <Outlet />
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default CustomerDashboard;
