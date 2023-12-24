import React from "react";
import './default.scss'
import Homepage from "./pages/Hompage";
import { Route, Routes} from "react-router-dom";
import Registration from "./pages/Registration/index";
import MainLayout from "./layouts/mainLayout";
import HomePageLayout from "./layouts/homePagelayout";
function App() {
  console.log("App");
  return (
    <div className="App">
      <Routes>
      {/* <Route
    path="/"
    element={<MainLayout component={<Homepage/>} />}
  /> */}
    <Route
    path="/"
    element={<HomePageLayout  component={<Homepage/>} />}
  />
      <Route
    path="/registration"
    element={<MainLayout component={<Registration/>} />}
  />
      
    
      </Routes>
      
    </div>
  );


}

export default App;