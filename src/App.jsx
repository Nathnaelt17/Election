import { Routes, Route } from "react-router-dom"
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"
import Home from "./Home.jsx"
import PartyDetail from "./PartyDetail.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home/>}/>
      <Route path="/more_info/:partyId" element={<PartyDetail/>}/>
    </Routes>
  )
}

export default App
