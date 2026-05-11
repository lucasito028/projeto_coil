import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Credential from "./pages/Credential";

function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Credential />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;