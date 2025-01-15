import React from "react";
import Banner from "../banner";
import Services from "../services";
import Details from "../details";
import Container from "../container";

const HomePage = ({ sheetId }) => {
  const heading=<h1 className="mb-7 font-extrabold text-4xl text-white leading-[5rem] sm:text-7xl">
  Roofing Contractor near me in <span className='text-[#ff7033]'>USA</span></h1>;
  return (
    <div>
      <Banner
        heading={heading}
        subHeading="Looking for Roofing Contractor services near you? Find reliable and experienced Roofing Repair in the USA."
        sheetId={sheetId}
      />
      <Details range="configs!S:T" sheetId={sheetId} />
      <div className="padding-inline my-[5rem] bg-[#f7fbff] py-[3rem]">
        <h2 className="font-extrabold text-center text-4xl leading-[1.25em] sm:text-4xl">
          Professional Roofing Contractor services Near Me
        </h2>
        <Services sheetId={sheetId} />
      </div>
      <div className="padding-inline my-[5rem] bg-[#f7fbff] py-[3rem]">
        <h2 className="font-extrabold text-center text-4xl leading-[1.25em] sm:text-4xl">
          Serving Roofing Contractor services Nation Wide
        </h2>
        <Container sheetName="about" sheetId={sheetId} />
      </div>
      <Details range="configs!U:V" sheetId={sheetId} />
    </div>
  );
};

export default HomePage;
