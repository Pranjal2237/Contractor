"use client"

import React, { useEffect, useState } from "react";

const Display = ({ heading }) => {
  const [location, setLocation] = useState("");
  useEffect(()=>{
    let hostUrl = window.location.hostname;
  hostUrl = hostUrl.split(".");
  setLocation(hostUrl[0].replace('-',','));
  },[])
  return (
    <div className="padding-inline bg-[--background-normal] min-h-[60dvh] flex flex-col gap-[1rem]">
      <div className="w-[5%] h-[6px] bg-[yellow] mt-[5rem]"></div>
      <h1 className="font-bold mb-[0.75rem] text-[white] text-4xl leading-[1.25em] sm:text-5xl">
        {heading +' '+ location}
      </h1>
      <h2 className="font-[600] mb-[0.5rem] text-[white] text-l leading-[1.25em] sm:text-[1.1rem]">
        {`${location} Roofing Contractor.`}
      </h2>
    </div>
  );
};

export default Display;
