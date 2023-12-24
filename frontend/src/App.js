import React from "react";
import './default.scss'
import Header from "./components/Header/index";
import Homepage from "./pages/Hompage";
function App() {
  return (
    <div className="App">
      <Header/>
      <div className="main">
      <Homepage/>
      </div>
      
    </div>
  );


}

export default App;