import React from "react";

export default function List(props) {
  return (
    <>
      <div className="bg-gray-600/30 w-full h-16 rounded-xl  text-[1.6rem] flex items-center justify-between px-4 hover:bg-gray-600/90 hover:duration-300 ">
        <p
          className="w-full flex select-none"
          onClick={(e) => {
            // if(e.target)
            console.log(e.target.innerText);
            props.setLocation(e.target.innerText);
            props.setInput("");
          }}
        >
          {props.cityName}
        </p>
        <span className="self-end text-[1.2rem] px-4 pointer-events-none absolute right-[1%]">
          {props.country}
        </span>
      </div>
    </>
  );
}
