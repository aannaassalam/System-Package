import axios from "axios";
import "./otp-screen.css";
import logo from "../../../assets/Logo.png";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpScreen({ email, prevStep }) {
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });
  const otpInput = useRef([0, 0, 0, 0, 0, 0].map(() => createRef()));
  const [countdown, setCountdown] = useState(10);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const baseUrl = "https://system-package-6vcc.onrender.com/api";

  useEffect(() => {
    countdown > 0 &&
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
  }, [countdown]);

  const inputfocus = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        otpInput.current[next].current.focus();
        otpInput.current[next].current.setSelectionRange(0, 1, "backward");
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 6 && otp[`otp${e.target.tabIndex}`] !== "") {
        otpInput.current[next].current.focus();
      } else if (!Object.values(otp).includes("")) {
        const joined_otp = Object.values(otp).join("");
        otp_verify(joined_otp);
      }
    }
  };

  const otp_verify = (joined_otp) => {
    axios
      .post(`${baseUrl}/verifyLogin`, { otp: joined_otp })
      .then((res) => {
        if (res.data.status === 200)
          navigate("/success", { state: { loggedIn: true } });
        else setErrMsg("Invalid OTP");
      })
      .catch((err) => console.log(err));
  };

  const resend_otp = () => {
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
  };

  const prependZero = (number) => {
    if (number < 10) return "0" + number;
    else return number;
  };

  const handleChange = (e) => {
    setOtp((prev) => ({
      ...prev,
      [`otp${e.target.tabIndex}`]: e.target.value,
    }));
    setErrMsg("");
  };

  return (
    <div className="otp-screen">
      <h1>
        Enter the verification
        <br />
        code to continue
      </h1>
      <p>
        We sent to <span className="text-blue">{email}</span>. If you don't see
        it, check your spam.
      </p>
      <div className="otp-inputs">
        <input
          type="text"
          autoComplete="one-time-code"
          inputMode="numeric"
          value={otp.otp1}
          onChange={handleChange}
          tabIndex="1"
          maxLength="1"
          className={errMsg.length > 0 ? "error-input" : ""}
          ref={otpInput.current[0]}
          onKeyUp={inputfocus}
        />
        <input
          type="text"
          autoComplete="one-time-code"
          inputMode="numeric"
          value={otp.otp2}
          onChange={handleChange}
          tabIndex="2"
          maxLength="1"
          className={errMsg.length > 0 ? "error-input" : ""}
          ref={otpInput.current[1]}
          onKeyUp={inputfocus}
        />
        <input
          type="text"
          autoComplete="one-time-code"
          inputMode="numeric"
          value={otp.otp3}
          onChange={handleChange}
          tabIndex="3"
          maxLength="1"
          className={errMsg.length > 0 ? "error-input" : ""}
          ref={otpInput.current[2]}
          onKeyUp={inputfocus}
        />
        <input
          type="text"
          autoComplete="one-time-code"
          inputMode="numeric"
          value={otp.otp4}
          onChange={handleChange}
          tabIndex="4"
          maxLength="1"
          className={errMsg.length > 0 ? "error-input" : ""}
          ref={otpInput.current[3]}
          onKeyUp={inputfocus}
        />
        <input
          type="text"
          autoComplete="one-time-code"
          inputMode="numeric"
          value={otp.otp5}
          onChange={handleChange}
          tabIndex="5"
          maxLength="1"
          className={errMsg.length > 0 ? "error-input" : ""}
          ref={otpInput.current[4]}
          onKeyUp={inputfocus}
        />
        <input
          type="text"
          autoComplete="one-time-code"
          inputMode="numeric"
          value={otp.otp6}
          onChange={handleChange}
          tabIndex="6"
          maxLength="1"
          className={errMsg.length > 0 ? "error-input" : ""}
          ref={otpInput.current[5]}
          onKeyUp={inputfocus}
        />
      </div>
      <p className="error">{errMsg}</p>
      <div className="actions">
        <p onClick={prevStep}>Back</p>
        <p
          className={countdown === 0 ? "text-blue" : ""}
          onClick={() => countdown === 0 && resend_otp()}
        >
          {countdown > 0
            ? `Resend 00:${prependZero(countdown)}`
            : "Resend code"}
        </p>
      </div>
    </div>
  );
}
