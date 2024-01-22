import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Unauthorised() {
  const navigate = useNavigate();
  const contact_us = "mayankraj7100@gmail.com";
  const [time, settime] = useState(6);

  const changetime = () => {
    setInterval(() => {
      settime(time - 1);
      changetime();
    }, 1000);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/login");
    }, 7000);
    return () => clearTimeout(timeoutId);
  }, [navigate]);
  useEffect(() => {
    changetime();
  }, [time]);
  return (
    <div
      className="py-10"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="text-center">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
          UNAUTHORIZED
        </h1>
        <p className="mt-4 fs-4 text-base leading-7 text-gray-600">
          <strong>YOU NEED TO LOGIN FIRST !!!!</strong>
        </p>
        <p className="mt-4 fs-4 text-base leading-7 text-gray-600">
          <strong>REDIRECTING TO LOGIN PAGE IN {time} seconds...</strong>
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-3">
          <Link
            to="/login"
            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            LOGIN
          </Link>
          <a
            href={`mailto:${contact_us}`}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}
