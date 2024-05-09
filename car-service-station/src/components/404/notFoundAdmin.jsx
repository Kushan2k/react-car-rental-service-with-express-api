import React from "react";
import { Link } from "react-router-dom";

function NotFoundAdmin() {
  return (
    <>
      <main className="h-screen w-full flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
          404
        </h1>
        <div className="bg-purple-600 px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button className="mt-5">
          <Link
            className="relative inline-block text-sm font-medium text-white group active:text-purple-500 focus:outline-none focus:ring"
            to={"/admin-dashboard/"}
          >
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-purple-600 group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              Go Home
            </span>
          </Link>
        </button>
      </main>
    </>
  );
}

export default NotFoundAdmin;
