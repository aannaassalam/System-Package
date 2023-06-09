import "./App.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  const [settings, setSettings] = useState();
  const [heading, setHeading] = useState("");
  const [logo, setLogo] = useState();
  const [submitting, setSubmitting] = useState(false);

  const baseUrl = "https://system-package-server.vercel.app/api";

  const inputRef = useRef();

  const getBase64 = (file, cb) => {
    if (logo.length) cb(logo);
    else {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };

  const submit = () => {
    setSubmitting(true);
    if (heading.length === 0) {
      alert("Heading cannot be empty!");
      return;
    }
    if (logo === undefined || !logo) {
      alert("Please select an Image!");
      return;
    }
    getBase64(logo, (image_string) => {
      axios
        .post(`${baseUrl}/settings`, {
          logo: image_string,
          heading,
        })
        .then((res) => alert(res.data.msg))
        .catch((err) => console.log(err))
        .finally(() => setSubmitting(false));
    });
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/settings`)
      .then((res) => {
        setSettings(res.data);
        setHeading(res.data.heading);
        setLogo(res.data.logo);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!settings)
    return "          Please wait a while, seems like the server is in sleep mode. You will be able to access this site once the sever wakes...";

  return (
    <div className="App">
      <div className="container">
        <div className="image">
          <h2>Logo</h2>
          {logo ? (
            <div>
              <img
                src={logo.length ? logo : URL.createObjectURL(logo)}
                alt="logo"
              />
              <span onClick={() => setLogo()}>
                <i className="fa-solid fa-times"></i>
              </span>
            </div>
          ) : (
            <div
              className="select-img"
              onClick={() => inputRef.current.click()}
            >
              <i className="fa-solid fa-plus"></i>
            </div>
          )}
          <input
            type="file"
            ref={inputRef}
            onChange={(e) => setLogo(e.target.files[0])}
            accept="image/*"
          />
        </div>
        <div className="input">
          <h2>Heading</h2>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <button onClick={submit} disabled={submitting}>
          {submitting ? "Submitting, Please wait..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default App;
