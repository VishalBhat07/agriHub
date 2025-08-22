import './App.css'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from "react-router-dom";


function App() {

  return (
    <>
{/* <Navbar farmer={farmer} /> */}
      <div className="h-100vh">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default App
