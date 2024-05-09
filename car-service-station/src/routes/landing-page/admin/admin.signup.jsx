import {
    KeyIcon,
    AtSymbolIcon,
    EyeIcon,
    EyeSlashIcon,
  } from "@heroicons/react/24/outline";
  
  import React, { useState } from "react";
  import Navbar from "../../../components/navbar/navbar";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";
import { toast } from "react-toastify";
  
  const formData = {
    username: "",
    password: "",
  };
  
  const check = {
    key: false,
    username: false,
    password: false,
  };
  function AdminSignUp() {
    const [key, setKey] = useState("");
  
    const [showPass, setShowPass] = useState(false);
    const [data, setData] = useState(formData);
    const [errorCheck, setErrorCheck] = useState(check);
    const navigate = useNavigate();
  
    const handleChange = (event) => {
      setData({ ...data, [event.target.name]: event.target.value });
    };
  
    const submitHandler = async (event) => {
      event.preventDefault();
  
      if (!key) {
        setErrorCheck({ ...errorCheck, key: true });
        return;
      }
      if (!data.username) {
        setErrorCheck({ ...errorCheck, username: true });
        return;
      }
      if (!data.password) {
        setErrorCheck({ ...errorCheck, password: true });
        return;
      }
  
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/register/admin",
          {
            secret: key,
            username: data.username,
            password: data.password,
          }
        );
        toast("Register successful", {
          autoClose: true,
          delay: 2000,
          type: 'success',
          position:'top-right'
        })
  
        if (response.status === 201) {
          navigate("/admin");
        }
      } catch (error) {
         toast("Register Failed!", {
          autoClose: true,
          delay: 2000,
          type: 'error',
          position:'top-right'
        })
        setData({
          username: "",
          password:"",
        })
      }
    };
  
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
                Create an Admin User Account
              </p>
              <div>
                <label className="text-gray-700 text-md m-3">Secret Key</label>
  
                <div className="relative">
                  <input
                    type="text"
                    name="key"
                    className="w-full rounded-lg mt-2 border-gray-200  border p-3 pe-8 text-sm shadow-sm"
                    placeholder="Enter key"
                    value={key}
                    onChange={(event) => {
                      setKey(event.target.value);
                    }}
                  />
  
                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <KeyIcon className="h-4 w-4 text-gray-400" />
                  </span>
                </div>
                {errorCheck.key && (
                  <p className="text-red-500 text-xs italic">Wrong Key.</p>
                )}
              </div>
  
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
                  Create A New Admin
                </span>
              </button>
              <p className="text-center text-sm text-gray-500">
                Have an account?{" "}
                <Link to={"/admin"} className="underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </>
    );
  }
  
  export default AdminSignUp;
  