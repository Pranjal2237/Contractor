"use client"

import React, { useEffect, useState } from "react";
import Banner from "../banner";
import Services from "../services";
import CityContainer from "../container/CityContainer";
import { states } from "@/utils";
import axios from "axios";
import Counter from "../counter";

const StatePage = ({ location, sheetId }) => {
  const [company,setCompany]=useState("");
    useEffect(()=>{
      async function allServices() {
            let origin = window.location.origin;
            let aboutCompany = await axios.post(`${origin}/api/configs`, {
              range: "Snapshot - configs!G:G",
              sheetId,
            });
            aboutCompany = aboutCompany.data.slice(1)?.[0]?.[0];
            setCompany(aboutCompany);
          }
          allServices();
    },[])
  let state_id = location;
  location = states[location];
  const heading=<h1 className="mb-7 font-extrabold text-4xl text-white leading-[5rem] sm:text-7xl">
  {company} in <span className='text-[#ff7033]'>{location} Near Me</span></h1>;
  return (
    <div>
      <Banner
        heading={heading}
        subHeading={`Your trusted and local ${company} in ${location}.`}
        sheetId={sheetId}
        prefix={`${company} Pros`}
      />
      <Counter />
      <div className="padding-inline my-[5rem]">
        <Services location={location} sheetId={sheetId} />
      </div>
      <div className="padding-inline my-[5rem] bg-[#f7fbff] py-[3rem]">
        <h2 className="font-extrabold text-center text-4xl leading-[1.25em] sm:text-4xl">
          Providing {company} Services in Whole State
        </h2>
        <div className="py-[3rem]">
          <iframe
            src={`https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="450"
          />
        </div>
        <CityContainer sheetName={state_id} />
      </div>
    </div>
  );
};

export default StatePage;
