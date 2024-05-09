import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CustomerContext } from "../../context/customer-details";



function OngoingService() {
  const [data, setData] = useState([]);
  const { currentUser } = useContext(CustomerContext);
  useEffect(() => {
    const getDetails = async () => {
      try {
        const temp = await axios.get(`http://localhost:8080/api/services/${currentUser.id}`, {
           headers: {
          'Authorization':'Bearer '+ JSON.parse(localStorage.getItem('token'))
          },
        });
        setData(temp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getDetails();
    console.log(data[0])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
          Services
        </h1>
        <h2 className="text-gray-400 text-md">
          Services that have taken in AutoPro Care.
        </h2>

        <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 lg:grid-cols-2">
          {data.map((index) => {
            return (
              <div key={index.id}>
                <div className="w-full">
                  <div className="relative w-full px-4 py-6 bg-white shadow-xl rounded-xl dark:bg-gray-700">
                    <p className="text-md font-semibold text-gray-700 border-b border-gray-200 w-max dark:text-white">
                      {index.type}
                    </p>
                    <div className="flex items-end my-6 space-x-2">
                      <p className="text-2xl font-bold text-black dark:text-white">
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
                          {index.user.first_name +' '+ index.user.last_name}
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
                      <div className="flex  my-5 space-x-2 items-center">
                        <span className="flex items-center text-md  text-gray-700">
                          Status
                        </span>
                        <p
                          className={`text-lg font-bold ${
                            index.status==='ONGOING'
                              ? "bg-red-100  text-red-900 "
                              : "bg-green-100  text-green-900 "
                          }p-1 rounded-xl dark:text-white`}
                        >
                          {index.status }
                        </p>
                      </div>

                      <div className="flex items-end my-5 space-x-2">
                        <span className="flex items-center text-md  text-gray-700">
                          Sub-Total
                        </span>
                        <p className="text-xl font-bold text-black dark:text-white">
                          Rs. {
                            parseFloat(index.total).toFixed(2)
                          }
                        </p>
                      </div>
                      {/* {!index.status && (
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              const temp = await axios.delete(
                                API_URL + `/${index.id}`
                              );
                              setData((prevData) =>
                                prevData.filter((item) => item.id !== index.id)
                              );
                            } catch (error) {
                              console.error("Error deleting data:", error);
                            }
                          }}
                          class="py-1 my-3   bg-red-600 hover:bg-red-700  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                          Delete
                        </button>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default OngoingService;
