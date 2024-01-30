import React from "react";
import "./default.scss";
import Homepage from "./pages/Hompage";
import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration/index";
import MainLayout from "./layouts/mainLayout";
import HomePageLayout from "./layouts/homePagelayout";
import Login from "./pages/Login/index";
import Recovery from "./pages/Recovery/index";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePageLayout component={<Homepage />} />} />
        <Route
          path="/registration"
          element={<MainLayout component={<Registration />} />}
        />
        <Route path="/login" element={<MainLayout component={<Login />}/> }/>
        <Route path="/recovery" element={<MainLayout component={<Recovery/>}/>} />
      </Routes>
    </div>
  );
}

export default App;
