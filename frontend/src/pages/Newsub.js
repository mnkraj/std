import React, { useState , useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Spinner from "./Loading";
import Alert from "./Alert";
import Footer from "../components/Footer";
import {  useNavigate } from "react-router-dom";
export default function Newsub() {
  const [details, setdetails] = useState({ subject: "", subjectcode: "" });
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate()
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/newsubject", {
      method: "POST",credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: details.subject,
        subjectcode: details.subjectcode,
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
        alert("Enter valid credentials");
      } else {
        console.log(result);
        setLoading(false);
        alert("Subject Added Successfully");
        Navigate("/dashboard")
      }
    }
  };
  const handleChange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
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
    <div>
      <Navbar />
      {loading ? <Spinner /> : ""}
      <section style={{ backgroundColor : "#D3D3D3"}}>
        <div
          className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
          style={{ marginTop: "50px" }}
        >
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md" style={{padding : "2%" , borderRadius : "3%" , backgroundColor : "white"}}>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Add a New Subject
            </h2>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Enter Subject Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Enter Subject Name"
                      name="subject"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Subject Code{" "}
                    </label>
                  </div>
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
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Add Subject <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </section>
      
    </div>
  );
}
