import React,{useState} from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import Spinner from './L2'
import Footer from "../components/Footer"
export default function Login() {
  const Navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [details,setdetails] = useState({username : "",password : ""})
  const handleChange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
  
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username : details.username,
        password : details.password
      }),
    })
    const result = await response.json();
  
      if (result.message != "Login successful") {
        alert(result.message);
        
        setLoading(false)
      }
      else{
         setLoading(false)
         //console.log("login success")
          Navigate("/dashboard")
      }
  
  };
  return (
    <div >
    {loading ? <Spinner/> : ''}
    <section style={{ backgroundColor : "#D3D3D3" , height : "100vh"}}>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md" style={{padding : "2%" , borderRadius : "3%" , backgroundColor : "white"}}>
          <div className="mb-2 flex justify-center">
            
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            LOGIN TO PROCEED
          </h2>
          
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  USERNAME {' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="USERNAME" name='username' onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password" name='password' onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit" onSubmit={handleSubmit}
                  className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Login <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          
        </div>
      </div>
      <Footer />
    </section>
    </div>
  )
}
