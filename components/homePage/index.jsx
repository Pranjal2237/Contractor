import React from "react";
import Banner from "../banner";
import Services from "../services";
import Details from "../details";
import Container from "../container";
import axios from "axios";

const HomePage = () => {
  return (
    <div>
      <Banner
        heading="Roofing Contractor near me in USA"
        subHeading="Looking for Roofing Contractor services near you? Find reliable and experienced Roofing Repair in the USA."
      />
      <Details range="configs!S:T" />
      <div className="padding-inline my-[5rem] bg-[#f7fbff] py-[3rem]">
        <h2 className="font-extrabold text-center text-4xl leading-[1.25em] sm:text-4xl">
          Professional Roofing Contractor services Near Me
        </h2>
        <Services />
      </div>
      <div className="padding-inline my-[5rem] bg-[#f7fbff] py-[3rem]">
        <h2 className="font-extrabold text-center text-4xl leading-[1.25em] sm:text-4xl">
          Serving Roofing Contractor services Nation Wide
        </h2>
        <Container sheetName="about" />
      </div>
      <Details range="configs!U:V" />
    </div>
  );
};

export default HomePage;

