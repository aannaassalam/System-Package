import React, { useEffect, useState } from "react";
import "./welcome-screen.css";
import Input from "../inputs/input";
import arrow from "../../../assets/iconarrow.svg";
import logo from "../../../assets/Logo.png";
import axios from "axios";

export default function WelcomeScreen({ nextStep, heading }) {
  const [email, setEmail] = useState("");
  const [postFix, setPostFix] = useState("@heads.design");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState({
    input: "",
    msg: "",
  });

  const baseUrl = "https://system-package-server.vercel.app/api";

  useEffect(() => {
    setErrMsg({
      input: "",
      msg: "",
    });
  }, [email, password]);

  const submitLogin = async () => {
    if (email.length === 0) {
      setErrMsg({
        input: "email",
        msg: "Please enter a valid email!",
      });
      return;
    }
    if (password.length < 6) {
      setErrMsg({
        input: "password",
        msg: "Password length must be greater than 6 letters!",
      });
      return;
    }

    axios.get(`${baseUrl}/login`).then((res) => {
      const { otp } = res.data;
      if (Notification.permission === "granted") {
        navigator.serviceWorker.getRegistration().then((reg) => {
          console.log(reg);
          const options = {
            body: `Your OTP for SystemPackage is - ${otp}`,
            icon: logo,
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
            },
          };

          reg.showNotification("OTP Recieved", options);
        });
      }
    });
    nextStep();
  };

  return (
    <div className="welcome-screen">
      <h1>{heading}</h1>
      <Input
        state={email}
        setState={setEmail}
        placeholder="Enter email"
        select
        postFix={postFix}
        setPostFix={setPostFix}
        errMsg={errMsg}
      />
      <Input
        state={password}
        setState={setPassword}
        placeholder="Enter password"
        errMsg={errMsg}
      />
      <button onClick={submitLogin}>
        <span>Next</span>
        <img src={arrow} alt="" />
      </button>
      <p>Forgot your password?</p>
    </div>
  );
}
