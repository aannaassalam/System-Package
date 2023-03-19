import React, { useState } from "react";
import "./input.css";
import eye_close from "../../../assets/iconeye-close.svg";
import eye_open from "../../../assets/iconeye-open.svg";
import chevron from "../../../assets/download.svg";

export default function Input({
  state,
  setState,
  select,
  placeholder,
  errMsg,
  postFix,
  setPostFix,
}) {
  const [show_password, setShow_password] = useState(false);

  return (
    <>
      <div className={select ? "select_input input" : "input"}>
        {select ? (
          <>
            <input
              type="text"
              value={state}
              placeholder={placeholder}
              onChange={(e) => setState(e.target.value)}
            />
            <select
              value={postFix}
              onChange={(e) => setPostFix(e.target.value)}
            >
              <option value="@heads.desgin">@heads.desgin</option>
              <option value="@gmail.com">@gmail.com</option>
              <option value="@yahoo.com">@yahoo.com</option>
            </select>
            <img src={chevron} alt="chevron-down" className="chevron" />
          </>
        ) : (
          <>
            <input
              type={show_password ? "text" : "password"}
              value={state}
              placeholder={placeholder}
              onChange={(e) => setState(e.target.value)}
            />
            {show_password ? (
              <span onClick={() => setShow_password(!show_password)}>
                <img src={eye_open} alt="" />
              </span>
            ) : (
              <span onClick={() => setShow_password(!show_password)}>
                <img src={eye_close} alt="" />
              </span>
            )}
          </>
        )}
        <span
          className={`${
            (errMsg.input === "email" && select) ||
            (errMsg.input === "password" && !select)
              ? "error"
              : ""
          } focus-border`}
        ></span>
      </div>
      <p className="error">
        {(errMsg.input === "email" && select) ||
        (errMsg.input === "password" && !select)
          ? errMsg.msg
          : ""}
      </p>
    </>
  );
}
