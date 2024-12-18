import React from "react";
import Banner from "../banner";
import About from "../about";
import Testimonials from "../testimonials";
import FAQS from "../faqs";
import Services from "../services";
import { Navigation } from "..";

const CityPage = ({ location }) => {
  let places = location.split(",");
  let city = places[0];
  let stateId = places[1];
  stateId = stateId?.toUpperCase();
  return (
    <div>
      <Navigation />
      <Banner
        heading={`Trusted Local Roofing Contractor in ${city}, ${stateId} near me`}
        subHeading={`Are you looking for a reliable roofing contractor in ${city}, ${stateId} near me? Call (607) 305-1964. We offer expert roof repair, roof replacement, new roof installation, gutter repair, metal commercial roofing, hail damage roofing contractors​ and emergency roof services.`}
      />
      <About range="configs!B:B" link="about" subheading="Who We Are" />
      <div className="padding-inline my-[5rem] bg-[#f7fbff] py-[3rem]">
        <h2 className="font-extrabold text-center text-4xl leading-[1.25em] sm:text-4xl">{`Professional Roofing Contractor services in ${city}, ${stateId}`}</h2>
        <Services />
      </div>
      <About range="configs!C:C" link="why" subheading="Why Choose Us" />
      <div className="padding-inline my-[5rem] py-[3rem]">
        <h2 className="font-extrabold text-center text-4xl leading-[1.25em] sm:text-4xl">{`Frequently Asked Questions About Roofing Contractor Services in ${city}, ${stateId} `}</h2>
        <FAQS city={city} stateId={stateId} />
      </div>
      <Testimonials stateId={stateId} />
    </div>
  );
};

export default CityPage;
