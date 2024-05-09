import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL_AUTH = "http://localhost:8080/api/auth/register";

const vehicleForm = {
  
  fullName: "",
  email: "",
  phone: "",
  street: "",
  country: "",
  city: "",
  state: "",
  zip: "",
  password: "",
  confirmPassword: "",
};
const check = {
  vehicle: false,
  personal: false,
  password: false,
  passwordLength: false,
  exists:false,
};

function SignUp() {
  const [data, setData] = useState(vehicleForm);
  const [errorCheck, setErrorCheck] = useState(check);
  const navigate = useNavigate();

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (
      !data.fullName ||
      !data.email ||
      !data.phone ||
      !data.street ||
      !data.country ||
      !data.city ||
      !data.state ||
      !data.zip ||
      !data.password ||
      !data.confirmPassword
    ) {
      setErrorCheck({ ...errorCheck, personal: true });
      return;
    }
    if (data.password !== data.confirmPassword) {
      setErrorCheck({ ...errorCheck, password: true });
      return;
    }

    if (!isPasswordValid(data.password)) {
      setErrorCheck({ ...errorCheck, passwordLength: true });
      return;
    }

    try {
      const resp=await axios.post(API_URL_AUTH,{
        first_name: data.fullName.split(" ")[0],
        last_name: data.fullName.split(" ")[1],
        email: data.email,
        password: data.password,
        address: `${data.street}, ${data.city}, ${data.state}, ${data.country}, ${data.zip}`,
        contact_no: data.phone
      });

      toast("Register successful", {
          autoClose: true,
          delay: 2000,
          type: 'success',
          position:'top-right'
      })

      if (resp.status === 201) { 
        setErrorCheck(check);
        navigate("/login");
      } else {
        setData({...data,email:""})
        setErrorCheck({ ...errorCheck, exists: true })
      }


      
    } catch (error) {
      toast("Register Failed!", {
            autoClose: true,
            position: 'top-right',
        delay: 2000,
            type:'error',
          
          
          })
    }
  };

  useEffect(() => { 

    if(localStorage.getItem("token")){
      navigate("/customer-dashboard")
    }
  },[])

  return (
    <>
      <>
        <Navbar />
        <div className="bg-gray-100 rounded shadow-lg p-4 px-4 md:p-8 pb-24 ">
          <form onSubmit={submitHandler}>
            
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 mt-10">
              <div className="text-gray-600">
                <p className="font-medium text-lg text-black">
                  Personal Details
                </p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2 mt-5">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Graham Bell"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={data.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label>Email Address</label>
                    <input
                      type="text"
                      name="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="email@domain.com"
                      value={data.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="0771234567"
                      value={data.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label>Address / Street</label>
                    <input
                      type="text"
                      name="street"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="Street"
                      value={data.street}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="City"
                      value={data.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label>Country / region</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={data.country}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label>State / province</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={data.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label>Zipcode</label>
                    <input
                      type="number"
                      name="zip"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="ZIP"
                      value={data.zip}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label>Password</label>
                    <input
                      type="text"
                      name="password"
                      placeholder="*********"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={data.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label>Confirm Password</label>
                    <input
                      type="text"
                      name="confirmPassword"
                      placeholder="*********"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={data.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    {errorCheck.exists && (
                      <p className="text-red-500 text-xs italic">
                        User already exists.try differant email!
                      </p>
                    )}
                    {errorCheck.personal && (
                      <p className="text-red-500 text-xs italic">
                        Feilds cannot be empty, Please check all the feilds.
                      </p>
                    )}
                    {errorCheck.password && (
                      <p className="text-red-500 text-xs italic">
                        Password need to match with Confirm Password.
                      </p>
                    )}
                    {errorCheck.passwordLength && (
                      <p className="text-red-500 text-xs italic">
                        Password need to contain atleat 6 characters.
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-5  mt-8 ">
                    <button
                      className="group relative inline-block focus:outline-none focus:ring"
                      type="submit"
                    >
                      <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-purple-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

                      <span className="relative inline-block border-2 border-current px-5 py-2 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                        Sign Up
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    </>
  );
}

export default SignUp;
