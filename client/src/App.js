import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./layout/pages/login/login";
import Success from "./layout/pages/success/success";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
