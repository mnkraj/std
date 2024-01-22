import React, { useState , useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Spinner from "./Loading";
import Profile from "./Profile";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
 const Navigate = useNavigate()
  const handleChange = (e) => {
    setDetails(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/search", {
        method: "POST",credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          RegistrationNo: details,
        }),
      });

      const resultData = await response.json();
      //console.log(resultData);

      setResultData(resultData);

      if (resultData.message == "Unauthorized") {
        setLoading(false);
        console.log("sdy")
        Navigate("/unauthorised");
      }
      else{
        if (!resultData.message) {
          setLoading(false);
        } else {
          alert("Student Does Not Exist");
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
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
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#D3D3D3"
        }}
      >
        <section>
          <div
            className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
            style={{ marginTop: "50px" }}
          >
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-center text-2xl font-bold leading-tight text-black">
                Search Student
              </h2>

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="regn"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Registration No{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="20XXUGXXXX"
                        id="regn"
                        name="RegistrationNo"
                        value={details}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Search <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        {resultData && !resultData.message && <Profile student={resultData} />}
        <Footer />
      </div>
    </>
  );
};

export default Search;
