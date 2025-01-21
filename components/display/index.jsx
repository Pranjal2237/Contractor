"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const Display = ({ heading ="",sheetId }) => {
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  useEffect(() => {
    let hostUrl = window.location.hostname;
    hostUrl = hostUrl.split(".");
    setLocation(hostUrl[0].replace("-", ","));
      async function allServices() {
        let origin = window.location.origin;
        let aboutCompany = await axios.post(`${origin}/api/configs`, {
          range: "configs!G:G",
          sheetId,
        });
        aboutCompany = aboutCompany.data.slice(1)?.[0]?.[0];
        setCompany(aboutCompany);
      }
      allServices();
  }, []);
  if(heading.length==0)
  {
    heading=`${company} Services in ${location}`
  }
  return (
    <div className="padding-inline bg-[--background-normal] min-h-[60dvh] flex flex-col gap-[1rem]">
      <div className="w-[5%] h-[6px] bg-[yellow] mt-[5rem]"></div>
      <h1 className="font-bold mb-[0.75rem] text-[white] text-4xl leading-[1.25em] sm:text-5xl">
        {heading}
      </h1>
      <h2 className="font-[600] mb-[0.5rem] text-[white] text-l leading-[1.25em] sm:text-[1.1rem]">
        {`${location} ${company}.`}
      </h2>
    </div>
  );
};

export default Display;
