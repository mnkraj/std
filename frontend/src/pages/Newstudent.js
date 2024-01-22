import React , {useState , useEffect} from 'react'
import { ArrowRight } from 'lucide-react'
import Navbar from "../components/Navbar"
import Spinner from './Loading'
import Alert from "./Alert"
import Footer from "../components/Footer"
import {  useNavigate } from "react-router-dom";

export default function Newstudent() {
  const [details, setdetails] = useState({
    Batch : "",
    CurrentSem : "",
    Course : "",
    email : "",
    RegistrationNo : "",
    name : "" 
})
const Navigate = useNavigate()
const [loading, setLoading] = useState(false);
const handleChange = (e) => {
  setdetails({ ...details, [e.target.name]: e.target.value });
};
const handleSubmit = async (e) => {
  setLoading(true);
  e.preventDefault();
  const response = await fetch("http://localhost:4000/api/createstudent", {
    method: "POST",credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: details.name,
      email: details.email,
      RegistrationNo : details.RegistrationNo,
      Course : details.Course,
      CurrentSem : details.CurrentSem,
      Batch : details.Batch
    }),
  })
  const result = await response.json();

  if (result.message == "Unauthorized") {
    setLoading(false);
    console.log("sdy")
    Navigate("/unauthorised");
  }
  else 
  {
    if (!result.success) {
      alert("Enter valid credentials");
      setLoading(false)
    }
    else{
        alert("Student Registered Successfully")
        Navigate("/dashboard")
    }
  }

};
const authentication = async()=>{
  let auth = await fetch("http://localhost:4000/api/auth", {
    method: "POST",credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
   auth = await auth.json()
  if(auth.message == "Unauthorized")
  {
    window.location.href = "/unauthorised";
  }
}
useEffect(()=>{
  authentication()
} , [authentication])
  return (
    <>
    <Navbar />
    {loading ? <Spinner/> : ''}
    <section style={{ backgroundColor : "#D3D3D3"}}>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24" style={{marginTop : "50px"}} >
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border"  style={{padding : "2%" , borderRadius : "3%" , backgroundColor : "white"}}>
          
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Register Student
          </h2>
          
          <form onSubmit={handleSubmit} className="mt-8 " >
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  {' '}
                  Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1  focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name" name='name' onChange={handleChange} 
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="regn" className="text-base font-medium text-gray-900">
                  {' '}
                  Registration No{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="XXXUGXX20XX"
                    id="regn" name = "RegistrationNo" onChange={handleChange}
                  ></input>
                  <small style={{color : "#DC143C"}}>Registration number must be unique</small>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {' '}
                  Email{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="example@gmail.com"
                    id="email" name = "email" onChange={handleChange}
                  ></input>
                </div>
              </div> 
              <div>
                <label htmlFor="batch" className="text-base font-medium text-gray-900">
                  {' '}
                  Batch{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    placeholder="20XX"
                    id="batch" name = "Batch" onChange={handleChange}
                  ></input>
                </div>
              </div> 
              <div>
                <label htmlFor="course" className="text-base font-medium text-gray-900">
                  {' '}
                  Course{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter Course"
                    id="coure" name='Course' onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="sem" className="text-base font-medium text-gray-900">
                  {' '}
                  Semester{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    placeholder=""
                    id="sem" name='CurrentSem' onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit" onClick={handleSubmit}
                  className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Register <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
    
    </>
  )
  }
