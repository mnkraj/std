import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Newstudent from "./pages/Newstudent";
import Newsub from "./pages/Newsub";
import Consolidatedres from "./pages/Consolidatedres";
import Navbar from "./components/Navbar";
import Search from "./pages/Search"
import Uploadassign from "./pages/Uploadassign";
import Login from "./pages/Login"
import Unauthorised from "./pages/Unauthorized"
function App() {
  return (
    <>
      <Router>
        
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/newstudent" element={<Newstudent />} />
            <Route exact path="/newsub" element={<Newsub />} />
            <Route exact path="/resultmatrix" element={<Consolidatedres />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/assignments" element={<Uploadassign />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/unauthorised" element={<Unauthorised />} />
          </Routes>
        </div>
        
      </Router>
    </>
  );
}

export default App;
