import React ,{useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Nav } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

const Uploadassign = () => {
        const Navigate = useNavigate()

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#D3D3D3",
      }}
    >
      <Navbar />
      <div
        style={{
          marginTop: "50px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h3 style={{ fontWeight: "bolder" }}>Upload Assignments</h3>
          <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input type="file" name="upload" accept="application/pdf" />
            <small>Only .pdf are acceptable</small>
            <button
                  type="submit" 
                  className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Upload
                </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Uploadassign;
