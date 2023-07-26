import logo from "./logo.svg";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import WeatherCard from "./Components/WeatherCard";
import { useState, useEffect } from "react";
function App() {
  const [finalVal, setFinalVal] = useState("");

  const [city, setCity] = useState("");
  let val = "";
  // let search = document.getElementById("citySearch");
  let enterKey = () => {
    setFinalVal(val);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      val = city;
      enterKey();
      console.log("The Enter key has been pressed.");
    }
  };
  const click = () => {
    val = city;
    enterKey();
  };

  return (
    <>
      <div className="h-screen bg-image flex justify-center items-center ">
        <div className="card  w-[30%]  bg-bgTint/70 backdrop-blur-md flex justify-evenly items-center p-2.5 rounded-xl flex-col gap-8 max-h-[40rem] py-12 z-20 min-h-fit">
          <SearchBar
            setCity={setCity}
            handleKeyDown={handleKeyDown}
            click={click}
            enterKey={enterKey}
            finalVal={setFinalVal}
          />
          <WeatherCard city={finalVal} />
        </div>
      </div>
      <div className="overlay z-10 absolute top-0 left-0 h-screen w-screen bg-gray-900/40 overflow-hidden"></div>
    </>
  );
}

export default App;
