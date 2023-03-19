import React, { useCallback, useEffect, useState } from "react";
import "./login.css";
import Slider from "../../components/slider/slider";
import banner from "../../../assets/Banner.png";
import logo from "../../../assets/Logo.png";
import WelcomeScreen from "../../components/welcome screen/welcome-screen";
import OtpScreen from "../../components/otp screen/otp-screen";
import axios from "axios";

export default function Login() {
  const [slider_width, setSlider_width] = useState(480);
  const [slider_height, setSlider_height] = useState(670);
  const [settings, setSettings] = useState({});
  const [step, setStep] = useState(1);

  const handleResize = useCallback(() => {
    if (window.screen.width <= 1190) {
      setSlider_width(400);
      setSlider_height(558);
    } else {
      setSlider_width(480);
      setSlider_height(670);
    }
  }, []);

  const fetch_settings = useCallback(() => {
    axios
      .get("http://localhost:5000/api/settings")
      .then((res) => {
        console.log(res.data);
        setSettings(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    handleResize();
    fetch_settings();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [fetch_settings, handleResize]);

  const renderScreen = () => {
    switch (step) {
      case 1:
        return (
          <WelcomeScreen
            nextStep={() => setStep(2)}
            heading={settings.heading}
          />
        );
      case 2:
        return (
          <OtpScreen
            prevStep={() => setStep(1)}
            email="hellouser@heads.design"
          />
        );
      default:
        break;
    }
  };

  if (!settings.logo) return "loading...";

  return (
    <div className="login">
      <div className="left">
        <img
          src={`data:${settings.image_type};base64,${settings.logo}`}
          alt="logo"
          className="logo"
        />
        {renderScreen()}
        <p>
          Not a member? <span>Create account</span>
        </p>
      </div>
      <div className="right">
        <div className="slider-stack">
          <div className="main-stack">
            <Slider
              items={[banner, banner, banner]}
              width={slider_width}
              height={slider_height}
            />
          </div>
          <div className="stack"></div>
          <div className="stack"></div>
        </div>
      </div>
    </div>
  );
}
