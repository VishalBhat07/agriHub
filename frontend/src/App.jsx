import './App.css'
import Home from './pages/Home/Home'
import About from "./pages/About/About";

import { Routes, Route, useNavigate } from "react-router-dom";


function App() {

  return (
    <>
{/* <Navbar farmer={farmer} /> */}
      <div className="h-100vh">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default App
