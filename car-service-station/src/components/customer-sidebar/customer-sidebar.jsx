import React from "react";
import {
  HomeIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  ArchiveBoxArrowDownIcon,
  ArrowPathIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

function CustomerSidebar() {
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <>
      <div className="relative hidden h-screen shadow-lg lg:block w-80">
        <div className="h-full bg-white dark:bg-gray-700">
          <div className="flex items-center justify-start pt-6 ml-8">
            <Link to={""} className="text-xl font-bold dark:text-white">
              AutoPro Care
            </Link>
          </div>
          <nav className="mt-6">
            <div>
              <Link
                to={""}
                className={`flex items-center justify-start w-full p-2 pl-6 my-2  transition-colors duration-200 border-l-4 ${
                  currentUrl === "/customer-dashboard/" ||
                  currentUrl === "/customer-dashboard"
                    ? "border-purple-500 dark:text-white text-black"
                    : "border-transparent hover:text-black text-gray-600"
                }`}
              >
                <span className="text-left">
                  <HomeIcon className="w-6 h-6" />
                </span>
                <span className="mx-2 text-sm font-normal">My Profile</span>
              </Link>

              <Link
                to={"vehicals"}
                className={`flex items-center justify-start w-full p-2 pl-6 my-2  transition-colors duration-200 border-l-4 ${
                  currentUrl === "/customer-dashboard/vehicals" ||
                  currentUrl === "/customer-dashboard/vehicals/"
                    ? "border-purple-500 dark:text-white text-black"
                    : "border-transparent hover:text-black text-gray-600"
                }`}
              >
                <span className="text-left">
                  <ArrowPathIcon className="w-6 h-6" />
                </span>
                <span className="mx-2 text-sm font-normal">My Vehicals</span>
              </Link>
              <Link
                to={"new-service"}
                className={`flex items-center justify-start w-full p-2 pl-6 my-2  transition-colors duration-200 border-l-4 ${
                  currentUrl === "/customer-dashboard/new-service" ||
                  currentUrl === "/customer-dashboard/new-service/"
                    ? "border-purple-500 dark:text-white text-black"
                    : "border-transparent hover:text-black  text-gray-600"
                }`}
              >
                <span className="text-left">
                  <WrenchScrewdriverIcon className="w-6 h-6" />
                </span>
                <span className="mx-2 text-sm font-normal">Any Repairs</span>
              </Link>
              <Link
                to={"services"}
                className={`flex items-center justify-start w-full p-2 pl-6 my-2 transition-colors duration-200 border-l-4 ${
                  currentUrl === "/customer-dashboard/services" ||
                  currentUrl === "/customer-dashboard/services/"
                    ? "border-purple-500 dark:text-white text-black"
                    : "border-transparent hover:text-black  text-gray-600"
                }`}
              >
                <span className="text-left">
                  <AdjustmentsVerticalIcon className="w-6 h-6" />
                </span>
                <span className="mx-4 text-sm font-normal">Services</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default CustomerSidebar;
