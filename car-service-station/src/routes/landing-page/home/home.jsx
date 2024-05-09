import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/navbar";
import { CustomerContext } from "../../../context/customer-details";
import { AdminContext } from "../../../context/admin-details";

function Home() {

  const { currentUser, setCurrentUser } = useContext(CustomerContext);
  const admin=useContext(AdminContext)

  const [logedin, setLogedin] = useState(false)

  const navigate=useNavigate()

  


  return (
    <>
      <Navbar logedin={logedin} />
      {/** First Part */}
      <div className="  z-20 flex items-center overflow-hidden bg-gray-200 dark:bg-gray-800">
        <div className="container   flex px-6 py-16 mx-auto">
          <div className="  z-20 flex flex-col sm:w-2/3 lg:w-3/5">
            <span className="w-20 h-2 mb-12 bg-gray-800 dark:bg-white"></span>
            <h1 className="flex flex-col text-6xl font-black leading-none text-gray-800 uppercase font-bebas-neue sm:text-8xl dark:text-white">
              Keep Your
              <span className="text-5xl sm:text-7xl">Ride Smooth</span>
            </h1>
            <p className="text-sm text-gray-700 sm:text-base dark:text-white mt-10">
              Ensuring your vehicle's optimal performance for a safe and smooth
              journey. Quality service you can trust.
            </p>
            <div className="flex mt-8">
              <Link
                className="group relative inline-block focus:outline-none focus:ring"
                to={"/"}
              >
                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-purple-400 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

                <span className="relative inline-block border-2 border-current px-5 py-2 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                  Get Your Service Now
                </span>
              </Link>
            </div>
          </div>
          <div className="  hidden sm:block sm:w-1/3 lg:w-3/5">
            <img
              src="https://www.ymfcarparts.co.uk/images/blog/full-car-service.jpg"
              className="max-w-sm m-auto md:max-w-lg mt-16 "
            />
          </div>
        </div>
      </div>
      {/** Second Part */}
      <div className="bg-slate-100 pt-10 pb-16 flex-wrap items-center justify-center gap-8 text-center sm:flex">
        <div className="text-center w-full mx-auto mt-10">
          <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">Our Services</span>
          </h2>
        </div>
        <div className="w-full px-4 py-4 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 mx-auto text-white bg-purple-500 rounded-md">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="w-6 h-6"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
              </svg>
            </div>
          </div>
          <h3 className="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
            Vehicle Maintenance
          </h3>
          <p className="py-4 text-gray-500 text-md dark:text-gray-300">
            Comprehensive vehicle maintenance solutions to keep your ride in
            top-notch condition.
          </p>
        </div>
        <div className="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 sm:mt-16 md:mt-20 lg:mt-24 dark:bg-gray-800">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 mx-auto text-white bg-purple-500 rounded-md">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="w-6 h-6"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
              </svg>
            </div>
          </div>
          <h3 className="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
            Branding and Repairs
          </h3>
          <p className="py-4 text-gray-500 text-md dark:text-gray-300">
            Enhance your vehicle's image with our branding services, including
            repairs and customization.
          </p>
        </div>
        <div className="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 mx-auto text-white bg-purple-500 rounded-md">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="w-6 h-6"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
              </svg>
            </div>
          </div>
          <h3 className="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
            SEO-Optimized Services
          </h3>
          <p className="py-4 text-gray-500 text-md dark:text-gray-300">
            Boost your vehicle's online presence with our SEO-optimized
            marketing strategies.
          </p>
        </div>
      </div>

      {/** Third Part */}
      <div className="bg-gray-50">
        <div className=" px-4 py-16 mx-auto max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="text-center w-full mx-auto  mb-20">
            <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
              <span className="block">Meet Our Team</span>
            </h2>
          </div>
          <div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
            <div>
              <img
                className="object-cover w-24 h-24 rounded-full shadow"
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
                alt="Person"
              />
              <div className="flex flex-col justify-center mt-2">
                <p className="text-lg font-bold">Oliver Aguilerra</p>
                <p className="mb-4 text-xs text-gray-800">Service Manager</p>
                <p className="text-sm tracking-wide text-gray-600">
                  Experienced in overseeing car service operations and ensuring
                  customer satisfaction. Skilled in managing a team and
                  optimizing service processes.
                </p>
              </div>
            </div>
            <div>
              <img
                className="object-cover w-24 h-24 rounded-full shadow"
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Person"
              />
              <div className="flex flex-col justify-center mt-2">
                <p className="text-lg font-bold">Henry Cavill</p>
                <p className="mb-4 text-xs text-gray-800">
                  Automotive Technician
                </p>
                <p className="text-sm tracking-wide text-gray-600">
                  Specialized in diagnosing and repairing vehicle issues.
                  Committed to delivering high-quality service and ensuring
                  vehicles are in optimal condition.
                </p>
              </div>
            </div>
            <div>
              <img
                className="object-cover w-24 h-24 rounded-full shadow"
                src="https://images.pexels.com/photos/3747435/pexels-photo-3747435.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt="Person"
              />
              <div className="flex flex-col justify-center mt-2">
                <p className="text-lg font-bold">Alice Melbourne</p>
                <p className="mb-4 text-xs text-gray-800">
                  Customer Service Specialist
                </p>
                <p className="text-sm tracking-wide text-gray-600">
                  Dedicated to providing excellent customer service in the
                  automotive industry. Proficient in addressing customer
                  inquiries and resolving issues promptly.
                </p>
              </div>
            </div>
            <div>
              <img
                className="object-cover w-24 h-24 rounded-full shadow"
                src="https://images.pexels.com/photos/3931603/pexels-photo-3931603.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt="Person"
              />
              <div className="flex flex-col justify-center mt-2">
                <p className="text-lg font-bold">Martin Garix Potter</p>
                <p className="mb-4 text-xs text-gray-800">
                  Marketing and Sales Specialist
                </p>
                <p className="text-sm tracking-wide text-gray-600">
                  Experienced in promoting car services and products. Skilled in
                  developing marketing strategies and increasing sales in the
                  automotive sector.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/** Fourth Part */}
      <div className="bg-gray-50 ">
        <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
          <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">Drive with Confidence!</span>
            <span className="block text-purple-500">
              Quality Service Every Mile.
            </span>
          </h2>
          <p className="text-xl mt-4 max-w-md mx-auto text-gray-400">
            We ensure your vehicle's performance at its best, providing
            top-notch service for every ride.
          </p>
        </div>
      </div>

      {/** Fourth Part */}
    </>
  );
}

export default Home;
