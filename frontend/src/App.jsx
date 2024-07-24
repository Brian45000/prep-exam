import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./pages/home.jsx";

function App() {
  return (
    <>
      <head>
        {/* <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self';
                  img-src 'self' data: https: http:;
                  object-src 'none';
                  script-src 'self';
                  style-src 'self';
                  require-trusted-types-for 'script'; "
        /> */}
      </head>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
