import React from "react";
import { useState, useEffect } from "react";
import List from "./List";
export default function SearchBar(props) {
  // const geonamesApiUrl = "http://api.geonames.org/searchJSON?q=";
  const geonamesApiUrl = "http://api.geonames.org/searchJSON?name_startsWith=";
  const geonamesUsername = "Animesh867"; // Replace this with your Geonames username
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        `${geonamesApiUrl}${input}&maxRows=5&username=${geonamesUsername}&featurecode=ppl&featureClass=p`
      );
      const data = await response.json();
      setSuggestions(data.geonames);
    } catch (error) {}
  };

  useEffect(() => {
    fetchSuggestions();
  }, [input]);

  useEffect(() => {
    props.finalVal(location);
  }, [location]);

  return (
    <>
      <div className="h-16 w-[90%] rounded-xl  flex flex-row items-center justify-center">
        <input
          type="search"
          name="search"
          id="citySearch"
          className="w-3/4 h-full overflow-hidden rounded-2xl px-8 text-2xl text-center caret-green-400 outline-none focus:outline focus:outline-green-400 focus:outline-4 focus:outline-offset-4  border-none"
          placeholder="Enter the city name:"
          onChange={(e) => {
            props.setCity(e.target.value);
            setInput(e.target.value);
          }}
          onKeyDown={props.handleKeyDown}
        />
        <div className="flex justify-center items-center h-full w-[20%] px-4">
          <button
            type="submit"
            className="rounded-full w-full h-full bg-green-400 text-center flex justify-center items-center"
            name="search"
            id="btnSearch"
            onClick={props.click}
          >
            <img src={require("./images/Search.png")} alt="" className="h-12" />
          </button>
        </div>
      </div>
      {input === "" ? (
        ""
      ) : (
        <>
          <div
            id={"suggestion"}
            className={` h-fit w-[80%] flex gap-2 flex-col text-white absolute top-[27%] p-6 rounded-xl left-[9%] backdrop-blur-2xl bg-black/50 ${
              suggestions.length > 0 ? "flex" : "hidden"
            } ${!props.pressed ? "flex" : "hidden"} ${
              location.length > 0 ? "hidden" && setLocation("") : "flex"
            }`}
          >
            {suggestions.map((element) => {
              return (
                <>
                  <List
                    cityName={element.name}
                    country={element.countryCode}
                    setLocation={setLocation}
                    setInput={setInput}
                    setCountry={props.setCountry}
                  />
                </>
              );
            })}
          </div>

          <span
            className={`absolute right-[1%] top-[27%] text-[2.6rem] bg-white rounded-xl w-[3rem] text-center cursor-pointer duration-500 ease-in-out select-none ${
              suggestions.length > 0 && !props.pressed ? "flex" : "hidden"
            }  ${location.length > 0 ? "hidden" && setLocation("") : "flex"}`}
            id="cross"
            onClick={() => {
              let suggestion = document.getElementById("suggestion");
              let cross = document.getElementById("cross");
              suggestion.style.display =
                cross.innerText === "↩" ? "flex" : "none";
              cross.innerText = cross.innerText === "↩" ? "X" : "↩";
            }}
          >
            X
          </span>
        </>
      )}
    </>
  );
}
