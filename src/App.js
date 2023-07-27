import "./App.css";
import SearchBar from "./Components/SearchBar";
import WeatherCard from "./Components/WeatherCard";
import { useState } from "react";
function App() {
  const apiKey = process.env.REACT_APP_API;
  console.log(apiKey);
  const [finalVal, setFinalVal] = useState("");

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pressed, setPressed] = useState(false);
  let val = "";
  // let search = document.getElementById("citySearch");
  let enterKey = () => {
    setFinalVal(val);
    document.querySelector("html").classList.toggle("dark");
    pressed ? setPressed(false) : setPressed(true);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      val = city;
      enterKey();
      // console.log("The Enter key has been pressed.");
    }
  };
  const click = () => {
    val = city;
    enterKey();
  };
  // console.log(country);

  return (
    <>
      <div className="h-screen w-screen bg-image flex justify-center items-center ">
        <div className="card  w-[75%]  lg:w-[30rem] bg-bgTint/70 backdrop-blur-md flex justify-evenly items-center p-2.5 rounded-xl flex-col gap-8 max-h-[80%] md:max-h-[40rem] py-12 z-20 min-h-fit ">
          <SearchBar
            setCity={setCity}
            handleKeyDown={handleKeyDown}
            click={click}
            enterKey={enterKey}
            finalVal={setFinalVal}
            setCountry={setCountry}
            pressed={pressed}
          />
          <WeatherCard city={finalVal} country={country} apiKey={apiKey} />
        </div>
      </div>
      <div className="overlay z-10 absolute top-0 left-0 h-screen w-screen bg-gray-900/40 overflow-hidden"></div>
    </>
  );
}

export default App;
