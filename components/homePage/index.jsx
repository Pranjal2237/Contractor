"use client"

import React, { useEffect,useState } from "react";
import Banner from "../banner";
import Services from "../services";
import Details from "../details";
import Container from "../container";
import axios from "axios";
import Counter from "../counter";

const HomePage = ({ sheetId }) => {
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
  const heading=<h1 className="mb-7 font-extrabold text-4xl text-white leading-[5rem] sm:text-7xl">
  {company} near me in <span className='text-[#ff7033]'>USA</span></h1>;
  return (
    <div>
      <Banner
        heading={heading}
        subHeading="Looking for [company] services near you? Find reliable and experienced Roofing Repair in the USA."
        sheetId={sheetId}
      />
      <Counter />
      <Details range="Snapshot - configs!S:T" sheetId={sheetId} />
      <div className="padding-inline my-[5rem] bg-[#f7fbff] py-[3rem]">
        <Services sheetId={sheetId} />
      </div>
      <div className="padding-inline my-[5rem] bg-[#f7fbff] py-[3rem]">
        <h2 className="font-extrabold text-center text-4xl leading-[1.25em] sm:text-4xl">
          Serving {company} services Nation Wide
        </h2>
        <Container sheetName="about" sheetId={sheetId} />
      </div>
      <Details range="Snapshot - configs!U:V" sheetId={sheetId} />
    </div>
  );
};

export default HomePage;
