import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/navbar";
import { CustomerContext } from "../../../context/customer-details";
import { toast } from "react-toastify";
const formData = {
  email: "",
  password: "",
};
const check = {
  email: false,
  password: false,
  not_match: false,
  nouser:false,
};
const API_URL = "http://localhost:8080/api/auth/login";

function Login() {
  const { setCurrentUser } = useContext(CustomerContext);
  const [data, setData] = useState(formData);
  const [showPass, setShowPass] = useState(false);
  const [errorCheck, setErrorCheck] = useState(check);
  const navigate = useNavigate();
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!isEmailValid(data.email)) {
      setErrorCheck({ ...errorCheck, email: true });
      return;
    }

    if (!isPasswordValid(data.password)) {
      setErrorCheck({ ...errorCheck, password: true });
      return;
    }
    try {
        const userDetails = await axios.post(API_URL, data);
        setCurrentUser(userDetails.data.responseuser);

      localStorage.setItem("token", JSON.stringify(userDetails.data.token));
      localStorage.setItem('user', JSON.stringify(userDetails.data.responseuser))
      setErrorCheck(check);
      
      toast("Login successful", {
        type: 'success',
        autoClose: true,
        delay: 2000,
        position:'top-right'
      })
        navigate("/customer-dashboard/");
    } catch (err) {
      if (err.response.status === 404) {
        setErrorCheck({ ...errorCheck, nouser: true });
        
      } else if (err.response.status === 401) {
        
        setErrorCheck({ ...errorCheck, not_match: true });
       }
        
    }
    
  };



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
    <>
      <Navbar />
      <section className=" bg-slate-50  flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Your Car, Our Expert Care!
            </h1>

            <p className="mt-4 text-gray-500">
              Welcome to our AutoPro Care management portal 🏁.
            </p>
          </div>

          <form
            action=""
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
            onSubmit={submitHandler}
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-lg border-gray-100 border p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={data.email}
                  onChange={handleChange}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <AtSymbolIcon className="h-4 w-4 text-gray-400" />
                </span>
              </div>

              {errorCheck.email && (
                <p className="text-red-500 text-xs italic">
                  Incorrect E-mail format.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={`${!showPass ? "password" : "text"}`}
                  name="password"
                  className="w-full rounded-lg border-gray-100 border p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={data.password}
                  onChange={handleChange}
                />

                <span
                  className="absolute inset-y-0 end-0 grid place-content-center px-4"
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
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
              {errorCheck.not_match && (
                <p className="text-red-500 text-xs italic">
                  Password do not match
                </p>
              )}
              {errorCheck.nouser && (
                <p className="text-red-500 text-xs italic">
                  No userfound with this email
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-5">
              <p className="text-sm text-gray-500">
                No account?{"  "}
                <Link className="underline text-purple-800" to={"/signup"}>
                  Sign up
                </Link>
              </p>

              <button
                className="group relative inline-block focus:outline-none focus:ring"
                type="submit"
              >
                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-purple-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

                <span className="relative inline-block border-2 border-current px-5 py-2 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                  Log In
                </span>
              </button>
            </div>
          </form>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1621615578530-cbf3c443165f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VwZXIlMjBjYXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
    </>
  );
}

export default Login;
