import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";

function App() {
  function checkAuthentication() {
    return sessionStorage.getItem("auth_token") ? true : false;
  }

  const [isAuth, setIsAuth] = useState(checkAuthentication());

  useEffect(() => {
    setIsAuth(checkAuthentication());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/sign-up" element={isAuth ? <Navigate to="/dashboard" /> : <SignUp />} />
        {isAuth && (
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
