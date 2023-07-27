import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
export default function WeatherCard(props) {
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const [status, setStatus] = useState(false); //Status of response.
  const [loading, setLoading] = useState(true); //Loading status

  const [data, setData] = useState(""); //Json data

  //To fetch data

  let cityName = props.city.trim();

  let arr = cityName.split(" ");
  cityName = arr[0];
  for (let i = 1; i < arr.length; i++) {
    cityName = cityName.concat("+", arr[i]);
  }

  let fetchData = async () => {
    setLoading(true);
    let dataReceived;
    try {
      const response = await fetch(
        `${apiUrl}${cityName}${
          props.country === "" ? `` : `,${props.country}`
        }&appid=${props.apiKey}`
      );

      response.status !== 200 ? setStatus(false) : setStatus(true);

      if (response.status === 200) {
        dataReceived = await response.json();
        setData(dataReceived);
      } else {
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };
  //To update the weather icon.
  let iconUpdate = () => {
    let weatherIcon = document.getElementById("weatherIcon");
    if (status && !loading && data) {
      if (data.weather[0].main === `Clouds`) {
        weatherIcon.src = "https://i.ibb.co/QdQf4zD/clouds.png";
      } else if (data.weather[0].main === `Clear`) {
        weatherIcon.src = "https://i.ibb.co/HYfPTSX/clear.png";
      } else if (data.weather[0].main === `Rain`) {
        weatherIcon.src = "https://i.ibb.co/mzh0m5p/rain.png";
      } else if (data.weather[0].main === `Drizzle`) {
        weatherIcon.src = "https://i.ibb.co/RY0M1MB/Drizzle.png";
      } else if (data.weather[0].main === `Mist`) {
        weatherIcon.src = "https://i.ibb.co/n3F5CBx/mist.png";
      } else if (data.weather[0].main === `Snow`) {
        weatherIcon.src = "https://i.ibb.co/NpKkKKq/snow.png";
      } else if (data.weather[0].main === "Haze") {
        weatherIcon.src = "https://i.ibb.co/JxBXxq7/haze.png";
      }
      weatherIcon.alt = data.weather[0].main;
    }
  };

  useEffect(() => {}, [status]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    iconUpdate();
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [props.city]);

  return data !== "" ? (
    loading ? (
      <div class="loadingio-spinner-spinner-8spo57eywz5">
        <div class="ldio-w7f8112p16">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    ) : status ? (
      <div className="h-6/12 w-10/12  flex flex-row gap-4 justify-center items-center  rounded-xl flex-col">
        <div className=" h-36 w-48  ">
          {" "}
          <img
            // src={weatherSrc}
            // src={require("../images/clear.png")}
            // src="https://i.ibb.co/DpWtZsr/cloud.png"
            alt="Weather card"
            id="weatherIcon"
          />
        </div>
        <div className=" w-full h-full text-white flex flex-col items-center justify-center gap-4">
          <p className="text-[5rem] font-[600] leading-[73px]">
            {Math.round(data.main.temp)}
            <span>℃</span>
          </p>
          <span className="text-[1.8rem] font-[600]">{data.name}</span>
          <div className="flex justify-evenly w-full">
            <div className=" flex items-center justify-center gap-4">
              <img
                src="https://i.ibb.co/r7fnQFH/humidity.png"
                alt="Humidity"
                className="h-[40px]"
              />
              <div className="flex flex-col">
                <p className="font-semibold">
                  {data.main.humidity}
                  <span>%</span>
                </p>
                <p className="text-[1.65rem] font-semibold">Humidity</p>
              </div>
            </div>
            <div className="wind">
              <div className=" flex items-center justify-center gap-4">
                <img
                  src="https://i.ibb.co/vDMLThR/wind.png"
                  alt="Winds"
                  className="h-[40px]"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">
                    {" "}
                    {data.clouds.all}
                    <span>%</span>
                  </p>
                  <p className="text-[1.65rem] font-semibold">Clouds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div
        className="h-64 w-10/12 text-[2.9rem] font-semibold text-white text-center flex items-center
    justify-center"
      >
        Unable to load the data
      </div>
    )
  ) : (
    <>
      <div className="text-[2.9rem] text-white w-[80%] text-center font-semibold">
        Enter the name of the city to begin.
      </div>
    </>
  );
}
WeatherCard.propTypes = {
  city: PropTypes.string,
};

WeatherCard.defaultProps = {
  city: "Kathmandu",
};
