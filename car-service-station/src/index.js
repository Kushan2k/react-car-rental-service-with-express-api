import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { AdminProvider } from "./context/admin-details"
import { CustomerProvider } from "./context/customer-details"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <BrowserRouter>
    <AdminProvider>
      <CustomerProvider>
        <App />
        <ToastContainer />
      </CustomerProvider>
    </AdminProvider>
  </BrowserRouter>
)

reportWebVitals()
