import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthScreen from "./pages/AuthScreen";

function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;