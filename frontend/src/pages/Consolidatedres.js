import React, { useState , useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import { Nav } from "react-bootstrap";
import Spinner from "./Loading";
import Alert from "./Alert";
import Footer from "../components/Footer"
import {  useNavigate } from "react-router-dom";

export default function Consolidatedres() {
  const [loading, setLoading] = useState(false);
  const [details, setdetails] = useState({
    RegistrationNo: "",
    subjectcode: "",
    marks: "",
  });
  const Navigate = useNavigate()

  const handleChange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/marks", {
      method: "POST",credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        RegistrationNo: details.RegistrationNo,
        marks: [
          { subjectcode: details.subjectcode, marksObtained: details.marks },
        ],
      }),
    });
    const result = await response.json();

    if (result.message == "Unauthorized") {
      setLoading(false);
      console.log("sdy")
      Navigate("/unauthorised");
    }
    else 
    {
      if (!result.success) {
        await setLoading(false)
        alert("Enter valid credentials");
        
      } else {
        console.log(result);
        await setLoading(false);
        alert("Marks Added succesfully");
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
      {loading ? <Spinner /> : ""}
      <section style={{ backgroundColor : "#D3D3D3"}}>
        <div
          className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
          style={{ marginTop: "50px" }}
        >
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md" style={{padding : "2%" , borderRadius : "3%" , backgroundColor : "white"}}>
           <h1><strong>Add Marks</strong></h1>
           
            
            
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Registration No{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="20XXXugXXXX"
                      name="RegistrationNo"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent : "space-between" }}>
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Enter Subject code{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="CSXXXX"
                        name="subjectcode"
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Enter Marks{" "}
                      </label>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="number"
                          placeholder=""
                          name="marks"
                          onChange={handleChange}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Add Marks <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </section>
      
    </>
  );
}
