import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home";
import List from "./pages/list/List"
import Hotel from "./pages/hotel/Hotel";

function App() {


  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/hotels" element={<List/>} />
        <Route path="/hotels/:id" element={<Hotel/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
