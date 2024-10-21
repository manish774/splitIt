import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/user/Login/Login";
import Register from "./components/user/Register/Register";
import { useDataStateContext } from "./components/context/DataStateContext";
import Body from "./components/Body/Body";

function App() {
  const { state } = useDataStateContext();

  // Private route component
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return state.loginDetails.email ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          {/* Private Routes */}
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
