import React from "react";
import "./success.css";
import logo from "../../../assets/Logo.png";
import { useLocation } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  if (!location.state?.loggedIn) return (window.location.href = "/");
  return (
    <div className="success">
      <img src={logo} alt="logo" />
      <h3>Success!</h3>
    </div>
  );
}
