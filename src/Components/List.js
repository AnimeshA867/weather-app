import React from "react";

export default function List(props) {
  return (
    <>
      <div
        className="bg-gray-600/30 w-full h-16 rounded-xl  text-[1.6rem] flex items-center justify-between px-4 hover:bg-gray-600/90 hover:duration-300 "
        onClick={(e) => {
          // if(e.target)

          // props.setLocation(e.target.innerText);
          props.setInput("");
          let arr = e.target.innerText.split("\n");

          props.setLocation(arr[0]);
          props.setCountry(arr[2]);
        }}
      >
        <p className="w-full flex select-none pointer-events-none">
          {props.cityName}
        </p>
        <span className="self-end text-[1.2rem] px-4 pointer-events-none absolute right-[5%]">
          {props.country}
        </span>
      </div>
    </>
  );
}
