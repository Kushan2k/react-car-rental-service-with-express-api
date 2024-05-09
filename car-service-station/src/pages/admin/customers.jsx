import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../../context/admin-details";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import {toast} from 'react-toastify'

const API_URL = "http://localhost:8080/api/auth/users";

function ManageCustomers() {
  const [users, setUsers] = useState([]);

  const { currentUser } = useContext(AdminContext)
  const navigation=useNavigate()

  useEffect(() => {

    if (!currentUser) {
      navigation('/')
    }

    const getUsers = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          }
        });

        setUsers(response.data);

        
        
      } catch (error) {
        toast("error deleting user", {
          autoClose: true,
          position: 'top-right',
        delay: 2000,
          type:'error'
        
        
        })
      }
    };
    getUsers();

  }, []);


  async function delete_user(id) {

    if(window.confirm("Are you sure you want to delete this user?") === false) return
    try {
      await axios.delete(`http://localhost:8080/api/auth/users/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        },
      });

      setUsers(users.filter((user) => user.id !== id))
      toast("User deleted!", {
          autoClose: true,
          delay: 2000,
          type: 'success',
          position:'top-right'
        })
    } catch (error) {
      toast("error deleting user", {
          autoClose: true,
          position: 'top-right',
        delay: 2000,
          type:'error'
        
        
        })
    }
  }

  return (
    <>
      <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
          Our Clients
        </h1>
        <h2 className="text-gray-400 text-md">
          Building Futures, Serving Clients Today.
        </h2>

        <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 lg:grid-cols-2">
          {
            users.length === 0 && <div className="text-center text-2xl font-semibold text-gray-800 dark:text-white">No Users Found</div>
          }
          {users.map((res) => {
            return (
              <div key={res.id} className="relative">
                <div className="w-full">
                  <div className="relative w-full px-4 py-6 bg-white shadow-xl rounded-xl dark:bg-gray-700">
                    <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max dark:text-white text-wrap">
                      ID - {res.id}
                    </p>
                    <div className="flex items-end my-3 space-x-2">
                      <p className="text-2xl font-bold text-black dark:text-white flex items-center justify-between">
                        {res.first_name} {res.last_name} 

                        
                      </p>
                    </div>

                    <div className="">
                      <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b md:space-x-24">
                        <p>Account Status</p>
                        <div className="flex items-end text-xs">Active</div>
                      </div>
                      <p className="text-sm font-semibold my-5 text-purple-950 ">
                        Details
                      </p>
                      <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                        <p>Name</p>
                        <div className="flex items-end text-xs">
                          {res.first_name} {res.last_name}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                        <p>Phone Number</p>
                        <div className="flex items-end text-xs">
                          {res.contact_no}
                        </div>
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
                        <div className="flex items-end text-xs ">
                          {res.address.split(',')[0]}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                        <p>City</p>
                        <div className="flex items-end text-xs ">
                          {res.address.split(',')[1]}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                        <p>State</p>
                        <div className="flex items-end text-xs ">
                          {res.address.split(',')[2]}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                        <p>Country</p>
                        <div className="flex items-end text-xs ">
                          {res.address.split(',')[3]}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                        <p>ZIP</p>
                        <div className="flex items-end text-xs ">{res.address.split(',')[4]}</div>
                      </div>
                      <div className="flex items-center justify-end">
                        <div className="flex items-end ">
                          <button className="text-white bg-red-800 rounded-full px-2" onClick={_=> {
                            delete_user(res.id)
                          }}>Delete</button>
                        </div>
                      </div>
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

export default ManageCustomers;
