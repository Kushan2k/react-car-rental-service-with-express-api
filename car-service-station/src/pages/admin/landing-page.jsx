import React, { useEffect, useState } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

import { Link, } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

function LandingPage() {


  const [users, setUsers] = useState([]);
  const [services, setSerives] = useState([])
  

  async function getSerives() {
    
    try {
      const service = await axios.get('http://localhost:8080/api/services', {
          headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          }
      })
      setSerives(service.data)
    } catch (error) {
      toast("Error fetching services!", {
          autoClose: true,
          position: 'top-right',
          delay: 2000,
        
        
        })
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/users', {
          headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          }
        });

        setUsers(response.data);
        
      } catch (error) {
        toast("Error fetching users!", {
          autoClose: true,
          position: 'top-right',
          delay: 2000,
        
        
        })
      }
    };
    getUsers();
    getSerives()
  }, []);


  async function mark(id,status) {
    
    try {

      await axios.patch(`http://localhost:8080/api/services/update`, {
        sid: id,
        status:status
      }, {
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          }
      })
      

      await getSerives()

      toast("Updated!", {
        type: 'success',
        position: 'top-right',
        autoClose: true,
        delay:1000
      })
      
    } catch (error) {
      toast("Could not mark as completed!", {
        type: 'error',
        position: 'top-right',
        autoClose: true,
        delay:1000
      })
    }

  }
  return (
    <>
      <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
          Welcome to Admin Dashboard
        </h1>
        <h2 className="text-gray-400 text-md">
          Here's what's happening with our company in summary.
        </h2>
        <div className="flex flex-col items-center w-full my-6 space-y-4 md:space-x-4 md:space-y-0 md:flex-row">
          <div className="w-full md:w-6/12">
            <div className="relative w-full overflow-hidden bg-white shadow-lg dark:bg-gray-700">
              <div className="block w-full h-full">
                <div className="flex items-center justify-between px-4 py-7 space-x-4">
                  <div className="flex items-center">
                    <span className="relative p-5 bg-yellow-100 rounded-full">
                      <CurrencyDollarIcon className="absolute h-7 text-yellow-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                    </span>
                    <p className="ml-2 text-sm font-semibold text-gray-700 border-b border-gray-200 dark:text-white">
                      Income within Ongoing Orders
                    </p>
                  </div>
                  <div className="mt-6 text-xl font-bold text-black border-b border-gray-200 md:mt-0 dark:text-white">
                    Rs. {
                      services && services.reduce((acc,service) => {
                        return  acc + service.total 
                      },0)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full space-x-4 md:w-1/2">
            <div className="w-1/2">
              <div className="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700">
                <p className="text-xl font-bold text-black dark:text-white">
                  {services && services.length}
                </p>
                <p className="text-sm text-gray-400">Active Services</p>
              </div>
            </div>
            <div className="w-1/2">
              <div className="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700">
                <p className="text-xl font-bold text-black dark:text-white">
                  Rs. {
                    services && services.reduce((acc,service) => {
                      return acc + service.total
                    },0)
                  }
                </p>
                <p className="text-sm text-gray-400">Revenue in total</p>
                <span className="absolute p-4 bg-purple-700 rounded-full top-2 right-4">
                  <CurrencyDollarIcon className="absolute h-6 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to={"/admin-dashboard/ongoing-services"}
            className="text-lg font-bold text-gray-600"
          >
            Recent Accepted Services
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 lg:grid-cols-2">
          {
            !services.length>0 && <p className="text-center font-bold text-yellow-600">No Services Found!</p>
          }
          {
            services?.map(service => (
              <div  key={service.id} className={
                service.status==='ONGOING'?'w-full border-b-4 border-red-700':'w-full border-b-4 border-green-600'
              }>
                <div className="relative w-full px-4 py-6 bg-white shadow-xl rounded-xl dark:bg-gray-700">
                  <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max dark:text-white">
                    {service.type}
                  </p>
                  <div className="flex items-end my-6 space-x-2">
                    <p className="text-2xl font-bold text-black dark:text-white">
                      {service.vehical.type}
                    </p>
                    <span className="flex items-center text-xl  text-gray-700">
                      {service.vehical.model}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-2 mb-2 text-sm border-b border-gray-200 sm:space-x-12">
                    <div className="flex items-end text-xs">Year- {service.vehical.year}</div>
                  </div>
                  <div className="flex items-center justify-between pb-2 mb-2 text-sm border-b border-gray-200 sm:space-x-12">
                    <div className="flex items-end text-xs">Number- {service.vehical.number}</div>
                  </div>

                  <div className="">
                    <p className="text-sm font-semibold my-5 text-purple-950 ">
                      Customer Details
                    </p>
                    <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                      <p>Name</p>
                      <div className="flex items-end text-xs">
                        {service.user.first_name + ' '+service.user.last_name}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                      <p>Phone Number</p>
                      <div className="flex items-end text-xs">{service.user.contact_no}</div>
                    </div>
                    <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                      <p>Email</p>
                      <div className="flex items-end text-xs ">
                       {service.user.email }
                      </div>
                    </div>
                    <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                      <div className="flex items-end text-xs ">
                        {
                          service.status === 'ONGOING' ? (
                            <button onClick={() => {
                                mark(service.id,"FINISHED")
                              }} className="bg-green-700 text-white rounded-full p-2">
                                Mark Completed!
                            </button>
                          ) : (
                              <button onClick={() => {
                                  mark(service.id,"ONGOING")
                                }} className="bg-red-700 text-white rounded-full p-2">
                                  Mark Uncompleted!
                              </button>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
          
        </div>
        
        <div className="flex items-center space-x-4 mt-10">
          <Link
            to={"/admin-dashboard/manage-customers"}
            className="text-lg font-bold text-gray-600"
          >
            Recent Customers
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 lg:grid-cols-2">
          {
            !users.length>0 && <div className="text-center">Loading...</div>
          }
          {
            users?.map(res => (
              <div className="w-full" key={res.id}> 
            <div className="relative w-full px-4 py-6 bg-white shadow-xl rounded-xl dark:bg-gray-700">
              <div className="flex items-end my-3 space-x-2">
                <p className="text-2xl font-bold text-black dark:text-white">
                  {res.first_name} {res.last_name}
                </p>
              </div>

              <div className="">
                <p className="text-sm font-semibold my-5 text-purple-950 ">
                  Details
                </p>
                <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                  <p>Name</p>
                  <div className="flex items-end text-xs">{res.first_name} {res.last_name}</div>
                </div>
                <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                  <p>Phone Number</p>
                  <div className="flex items-end text-xs">{res.contact_no}</div>
                </div>
                <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                  <p>Email</p>
                  <div className="flex items-end text-xs">
                    {res.email}
                  </div>
                </div>
                <p className="text-sm font-semibold my-5 text-purple-950 ">
                  Address
                </p>
                <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                  <p>Street</p>
                      <div className="flex items-end text-xs ">{ res.address.split(',')[0]}</div>
                </div>
                <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                  <p>City</p>
                  <div className="flex items-end text-xs ">{res.address.split(',')[1]}</div>
                </div>
                <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                  <p>State</p>
                      <div className="flex items-end text-xs ">{res.address.split(',')[2]}</div>
                </div>
                <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                  <p>Country</p>
                  <div className="flex items-end text-xs ">{res.address.split(',')[3]}</div>
                </div>
                <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                  <p>ZIP</p>
                  <div className="flex items-end text-xs ">{res.address.split(',')[4]}</div>
                </div>
              </div>
            </div>
          </div>
            ))
          }
          
        </div>
      </div>
    </>
  );
}

export default LandingPage;
