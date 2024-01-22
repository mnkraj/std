import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { Nav } from "react-bootstrap";
import Footer from "../components/Footer";
import Spinner from "./Loading";
import Unauthorised from "./Unauthorized";
import { useNavigate } from "react-router-dom";
export default function TableThree() {
  const [authorised, setauth] = useState();
  const Navigate = useNavigate();
  const [people, setpeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const loaddata = async () => {
    setLoading(true);
    let res1 = await fetch("http://localhost:4000/api/students", {
      method: "POST",
      credentials: "include",
    });
    if (res1.status === 401) {
      setauth(false);
      setLoading(false);
      console.log("sdy")
      window.location.href = "/unauthorised";
    } else if (res1.ok) {
      const data = await res1.json();
      console.log("sjh")
      setpeople(data);
      setLoading(false);
    } else {
      console.error("Unexpected error:", res1.statusText);
      setLoading(false);
    }
  };
  useEffect(() => {
    loaddata();
  }, []);
  return (
    <div>
      <Navbar />
      {loading ? <Spinner /> : ""}

      <section
        className="mx-auto   px-4 py-4"
        style={{ backgroundColor: " #D3D3D3	", width: "100%" }}
      >
        <div
          className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
          style={{ marginTop: "50px" }}
        >
          <h1 className="fs-3">
            <strong>Student Leaderboard</strong>
          </h1>
          <div>
            <a
              href="/newstudent"
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Register New Student
            </a>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200">
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        <span>
                          <strong>Students</strong>
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        <strong>Registration No</strong>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        <strong>Total Marks</strong>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        <strong>Aggregate Percentage</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr
                        key={person.name}
                        className="divide-x divide-gray-200"
                      >
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={
                                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiyHYtDJQ0t5jCs4j_PiD5ESMvPwnvHVa3w&usqp=CAU"
                                }
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {person.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {person.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">
                            {person.RegistrationNo}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-500">
                            {person.marks.reduce(
                              (total, mark) => total + mark.marksObtained,
                              0
                            )}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          {(
                            person.marks.reduce(
                              (total, mark) => total + mark.marksObtained,
                              0
                            ) / person.marks.length
                          )
                            .toString()
                            .slice(0, 5)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full border-gray-300">
          <div className="mt-2 flex items-center justify-end">
            <div className="space-x-2">
              <button
                type="button"
                className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                &larr; Previous
              </button>
              <button
                type="button"
                className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
