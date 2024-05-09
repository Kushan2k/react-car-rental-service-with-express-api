import {
    AtSymbolIcon,
    EyeIcon,
    EyeSlashIcon,
  } from "@heroicons/react/24/outline";
  import axios from "axios";
  import React, { useContext, useEffect, useState } from "react";
  import Navbar from "../../../components/navbar/navbar";
  import { Link, useNavigate } from "react-router-dom";
  import { AdminContext } from "../../../context/admin-details";
import { toast } from "react-toastify";
  const formData = {
    username: "",
    password: "",
  };
  
  
  const check = {
    username: false,
    password: false,
  };
  function Admin() {
    const [showPass, setShowPass] = useState(false);
    const { setCurrentUser } = useContext(AdminContext);
    const [data, setData] = useState(formData);
    const [errorCheck, setErrorCheck] = useState(check);
    const navigate = useNavigate();
  
    const handleChange = (event) => {
      setData({ ...data, [event.target.name]: event.target.value });
    };
  
    const submitHandler = async (event) => {
      event.preventDefault();
  
      if (!data.username) {
        setErrorCheck({ ...errorCheck, username: true });
        return;
      }
      if (!data.password) {
        setErrorCheck({ ...errorCheck, password: true });
        return;
      }
  
      try {
        const res = await axios.post("http://localhost:8080/api/auth/login/admin", {
          username: data.username,
          password: data.password,
        });

        const user = res.data.responseuser
        
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem('user', JSON.stringify(user))
        setErrorCheck({
          username: false,
          password: false,
        });
        
        navigate("/admin-dashboard");
      } catch (error) {

        toast("Invalid Credentials!", {
          type: 'error',
          autoClose: true,
          delay: 1000,
          position: 'top-right'
          
        })
        console.error("Error updating user details:", error);
      }
    };

    useEffect(() => {

      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (user && token) {
        setCurrentUser(user);
        navigate("/admin-dashboard");
      }
      
    },[])
  
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-purple-600 sm:text-3xl">
              Admin Users Only
            </h1>
  
            <form
              onSubmit={submitHandler}
              className="bg-gray-50 mb-0 py-10 mt-6 space-y-10 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            >
              <p className="text-center text-lg font-medium">
                Log in to your account
              </p>
  
              <div>
                <label className="text-gray-700 text-md m-3">Username</label>
  
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    className="w-full rounded-lg mt-2 border-gray-200  border p-3 pe-8 text-sm shadow-sm"
                    placeholder="Enter username"
                    value={data.username}
                    onChange={handleChange}
                  />
  
                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <AtSymbolIcon className="h-4 w-4 text-gray-400" />
                  </span>
                </div>
                {errorCheck.username && (
                  <p className="text-red-500 text-xs italic">Fill this feild.</p>
                )}
              </div>
  
              <div>
                <label className="text-gray-700 text-md m-3">Password</label>
  
                <div className="relative">
                  <input
                    type={`${!showPass ? "password" : "text"}`}
                    name="password"
                    className="w-full rounded-lg mt-2 border-gray-200 p-3 border  pe-8 text-sm shadow-sm"
                    placeholder="Enter password"
                    value={data.password}
                    onChange={handleChange}
                  />
  
                  <span
                    onClick={() => {
                      setShowPass(!showPass);
                    }}
                    className="absolute inset-y-0 end-0 grid place-content-center px-4"
                  >
                    {showPass ? (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </span>
                </div>
                {errorCheck.password && (
                  <p className="text-red-500 text-xs italic">
                    Password need to contain atleat 6 characters.
                  </p>
                )}
              </div>
  
              <button
                className="w-full group relative inline-block focus:outline-none focus:ring"
                type="submit"
              >
                <span className="absolute w-full inset-0 translate-x-1.5 translate-y-1.5 bg-purple-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
  
                <span className="relative  w-full inline-block border-2 border-current px-5 py-2 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                  Log In
                </span>
              </button>
              <p className="text-center text-sm text-gray-500">
                No account?{" "}
                <Link to={"/admin-signup"} className="underline">
                  Create An Admin Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </>
    );
  }
  
  export default Admin;
  