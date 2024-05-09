import React, { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

function FinishedServices() {
  const [services, setSerives] = useState([]);

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
          Finished Services
        </h1>
        <h2 className="text-gray-400 text-md">
          Services done by AutoPro Care.
        </h2>

        {
            !services?.filter(s=>s.status!='ONGOING').length > 0 && (

                <p className="mx-auto mt-10 w-3/4 text-center text-yellow-500 p-3 border-2 border-yellow-600">No Finished Services Found!</p>
             
            )
          }

        <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 lg:grid-cols-2">
          {services?.map((index) => {
            return (
              index.status==='FINISHED' && (
                <div className="w-full" key={index.id}>
                  <div className="relative w-full px-4 py-6 bg-white shadow-xl rounded-xl dark:bg-gray-700">
                    <p className="text-md font-semibold text-gray-700 border-b border-gray-200 w-max dark:text-white">
                      {index.type}
                    </p>
                    <div className="flex items-end my-6 space-x-2">
                      <p className="text-xl font-bold text-black dark:text-white">
                        {index.vehical.type} |
                      </p>
                      <span className="flex items-center text-xl  text-gray-700">
                        {index.vehical.model}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-2 mb-2 text-sm border-b border-gray-200 sm:space-x-12">
                      <div className="flex items-end text-xs">
                        Year- {index.vehical.year}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pb-2 mb-2 text-sm border-b border-gray-200 sm:space-x-12">
                      <div className="flex items-end text-xs">
                        Number- {index.vehical.number}
                      </div>
                    </div>

                    <div className="">
                      <p className="text-sm font-semibold my-5 text-purple-950 ">
                        Customer Details
                      </p>
                      <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                        <p>Name</p>
                        <div className="flex items-end text-xs">
                          {index.user.first_name+' '+index.user.last_name}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                        <p>Phone Number</p>
                        <div className="flex items-end text-xs">
                          {index.user.contact_no}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                        <p>Email</p>
                        <div className="flex items-end text-xs ">
                          {index.user.email}
                        </div>
                      </div>
                      <div className="flex items-end my-5 space-x-2">
                        <span className="flex items-center text-md  text-gray-700">
                          Sub-Total
                        </span>
                        <p className="text-xl font-bold text-black dark:text-white">
                          Rs. { parseFloat(index.total).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-end my-5 space-x-2">
                         <button onClick={() => {
                          mark(index.id,"ONGOING")
                          }} className="bg-red-700 text-white rounded-full p-2">
                            Mark Uncompleted!
                        </button>
                      </div>
                     

                      
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FinishedServices;
