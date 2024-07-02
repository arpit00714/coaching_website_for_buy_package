import "./App.css";
import Home from "./Home/Home";
import Login from "./Login/Login";
import ConsultancyMenu from "./consultancy-menu/ConsultancyMenu";
import SelectedConsultancy from "./selectedConsultancy/SelectedConsultancy";
import { Routes, Route } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Buynow from "./BUYNOW/Buynow";
import Pgfresherform from "./PGFRESHER/Pgfresherform";
function App() {

  const options = {
    timeout: 5000,
    position: positions.MIDDLE_RIGHT
  };  
  return (
    <Provider template={AlertTemplate} {...options}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/ConsultancyMenu" element={<ConsultancyMenu />}></Route>
        <Route
          path="/SelectedConsultancy/:id"
          element={<SelectedConsultancy />}
        ></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Buynow" element={<Buynow/>}></Route>
        <Route path="/Pgfresherform" element={<Pgfresherform/>}></Route>
        {/* <Route path="/ConsultancyMenu" element={<ConsultancyMenu />}></Route>
    <Route path="/SelectedConsultancy" element={<SelectedConsultancy />}></Route> */}
      </Routes>
    </Provider>
  );
}

export default App;
