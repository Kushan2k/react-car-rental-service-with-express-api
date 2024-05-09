import React from "react";
import {
  HomeIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  ArchiveBoxArrowDownIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
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
                  currentUrl === "/admin-dashboard/" ||
                  currentUrl === "/admin-dashboard"
                    ? "border-purple-500 dark:text-white text-black"
                    : "border-transparent hover:text-black text-gray-600"
                }`}
              >
                <span className="text-left">
                  <HomeIcon className="w-6 h-6" />
                </span>
                <span className="mx-2 text-sm font-normal">Home</span>
              </Link>

              <Link
                to={"ongoing-services"}
                className={`flex items-center justify-start w-full p-2 pl-6 my-2 transition-colors duration-200 border-l-4 ${
                  currentUrl === "/admin-dashboard/ongoing-services" ||
                  currentUrl === "/admin-dashboard/ongoing-services/"
                    ? "border-purple-500 dark:text-white text-black"
                    : "border-transparent hover:text-black  text-gray-600"
                }`}
              >
                <span className="text-left">
                  <WrenchScrewdriverIcon className="w-6 h-6" />
                </span>
                <span className="mx-4 text-sm font-normal">
                  Ongoing Services
                </span>
              </Link>
              <Link
                to={"finished-services"}
                className={`flex items-center justify-start w-full p-2 pl-6 my-2  transition-colors duration-200 border-l-4 ${
                  currentUrl === "/admin-dashboard/finished-services" ||
                  currentUrl === "/admin-dashboard/finished-services/"
                    ? "border-purple-500 dark:text-white text-black"
                    : "border-transparent hover:text-black  text-gray-600"
                }`}
              >
                <span className="text-left">
                  <ArchiveBoxArrowDownIcon className="w-6 h-6" />
                </span>
                <span className="mx-4 text-sm font-normal">
                  Finished Services
                </span>
              </Link>
              <Link
                to={"manage-customers"}
                className={`flex items-center justify-start w-full p-2 pl-6 my-2   transition-colors duration-200 border-l-4 ${
                  currentUrl === "/admin-dashboard/manage-customers" ||
                  currentUrl === "/admin-dashboard/manage-customers/"
                    ? "border-purple-500 dark:text-white text-black"
                    : "border-transparent hover:text-black text-gray-600"
                }`}
              >
                <span className="text-left">
                  <UsersIcon className="w-6 h-6" />
                </span>
                <span className="mx-4 text-sm font-normal">
                  Manage Customers
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
