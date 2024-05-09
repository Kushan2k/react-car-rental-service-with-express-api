import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CustomerContext } from '../../context/customer-details'
import { toast } from 'react-toastify'

function Vehiclas() {
  const { currentUser, setCurrentUser } = useContext(CustomerContext)
  const [data, setData] = useState({
    type: '',
    model: '',
    year: '',
    number: '',
  })

  const [vehicals, setVehicals] = useState([])
  const [loading, setLoading] = useState(false)

  const [errorCheck, setErrorCheck] = useState({errorCheck:false,added:false,error:false})

  const navigate=useNavigate()

  async function handleChange(e) {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  async function getVehicals(id) { 

    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8080/api/vehicals?id='+id, {
        headers: {
          'Authorization':'Bearer '+ JSON.parse(localStorage.getItem('token'))
        },
        
      }) 
      setVehicals(response.data)
      
      setLoading(false)
    } catch (er) {
      
      setLoading(false)
    }
  
  }
  useEffect(() => { 

    const token = localStorage.getItem('token')
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'))
      setCurrentUser(user)
      getVehicals(user.id)
      
    } else {
      navigate('/login')
    } 

  }, [])

  async function handelSubmit(event) {

    event.preventDefault()

    if (!data.type || !data.model || !data.year || !data.number) { 
      setErrorCheck({ ...errorCheck, vehicle: true })
      return
    }

    try {
      const resp=await axios.post('http://localhost:8080/api/vehicals', { ...data, userid: currentUser.id }, {
        headers: {
          'Authorization':'Bearer '+ JSON.parse(localStorage.getItem('token'))
        }
      })

      if (resp.status === 400) {
        toast("Already registered!", {
          type: 'error',
          autoClose: true,
          delay: 2000,
          position:'top-right'
        })
        return
      }

      setErrorCheck({ ...errorCheck, added: true })
        setData({
          type: '',
          model: '',
          year: '',
          number: '',
        })

        getVehicals(currentUser.id)
        toast("Vehical Saved!", {
          type: 'success',
          autoClose: true,
          delay: 2000,
          position:'top-right'
        })
    } catch (er) {
        toast("saving failed!", {
          autoClose: true,
          position: 'top-right',
          delay: 2000,
          type:'error'
        
        
        })
      setErrorCheck({ ...errorCheck,error:true})
    }
  }

  useEffect(() => { 
    setTimeout(() => {
      setErrorCheck({...errorCheck,added:false,error:false})
    }, 2000);
    clearTimeout()
  }, [errorCheck.added,errorCheck.error])

  
  return (
    <>
      {
        errorCheck.added && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-3/4 text-center mx-auto" role="alert">
            Vehical Saved!
          </div>
        )
      }
      {
        errorCheck.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-3/4 text-center mx-auto" role="alert">
            Saving failed!
          </div>
        )
      }
      <div className=" px-4 pb-10 overflow-auto md:px-6">
        <form onSubmit={handelSubmit} className='w-full'>
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 mt-10 pb-10 border-b border-gray-300 ">
            
                <div className="text-gray-600">
                  <p className="font-medium text-lg text-black">
                    Vehicle Details
                  </p>
                  <p>Please fill out all the fields.</p>
                </div>

                
                  <div className="lg:col-span-2 mt-5">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-2">
                          <label>Vehicle Type</label>
                          <input
                            type="text"
                            name="type"
                            placeholder="BMW"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.type}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label>Vehicle Model</label>
                          <input
                            type="text"
                            name="model"
                            placeholder="X5"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.model}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label>Year of Manufacture</label>
                          <input
                            type="number"
                            name="year"
                            placeholder="2023"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.year}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label>Number</label>
                          <input
                            type="text"
                            name="number"
                            placeholder="Petrol"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={data.number}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          {errorCheck.vehicle && (
                            <p className="text-red-500 text-xs italic">
                              Feilds cannot be empty, Please check all the feilds.
                            </p>
                          )}
                        </div>
                  
                  <div className="md:col-span-2 mt-4">
                    
                        <button
                        type="submit"
                        className="rounded-md bg-blue-700 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        Save 
                      </button>
                            
                          </div>
                      </div>
                    </div>
                
          </div>
        </form>
      </div>

      <div className="w-full mt-2 mx-auto">
        <h2 className='text-xl text-center border-b-[3px]'>My Vehicals</h2>
        <div className="flex flex-col">
          <div clasNames="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table
                  className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                  <thead
                    className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr >
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">Type</th>
                      <th scope="col" className="px-6 py-4">Model</th>
                      <th scope="col" className="px-6 py-4">Year</th>
                      <th scope="col" className="px-6 py-4">Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      loading ? (
                        <tr>
                          <td colSpan='5' className='text-center text-yellow-600'>Loading...</td>
                        </tr>
                      
                      ) : (
                        vehicals.map((vehical, index) => (
                          <tr key={vehical.id} className='odd:bg-gray-200'>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{vehical.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{vehical.model}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{vehical.year}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{vehical.number}</td>
                          </tr>
                        ))
                      
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Vehiclas