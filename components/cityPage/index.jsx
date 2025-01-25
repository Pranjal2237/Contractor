"use client";

import React, { useEffect, useState } from "react";
import Banner from "../banner";
import About from "../about";
import Testimonials from "../testimonials";
import FAQS from "../faqs";
import Services from "../services";
import { Navigation } from "..";
import { states } from "@/utils";
import axios from "axios";
import Counter from "../counter";
import CityContainer from "../container/CityContainer";

const CityPage = ({ location, sheetId }) => {
  let places = location.split(",");
  let city = places[0];
  let stateId = places[1];
  let state = states[stateId];
  stateId = stateId?.toUpperCase();
  const [company, setCompany] = useState("");
  const [cityHeading, setCityHeading] = useState("");
  const [citySubHeading, setCitySubHeading] = useState("");
  useEffect(() => {
    async function allServices() {
      let origin = window.location.origin;
      let aboutCompany = await axios.post(`${origin}/api/configs`, {
        range: "Snapshot - configs!G:G",
        sheetId,
      });
      aboutCompany = aboutCompany.data.slice(1)?.[0]?.[0];
      let aboutHeading = await axios.post(`${origin}/api/configs`, {
        range: "Snapshot - configs!I:I",
        sheetId,
      });
      aboutHeading = aboutHeading.data.slice(1)?.[0]?.[0];
      let aboutSubHeading = await axios.post(`${origin}/api/configs`, {
        range: "Snapshot - configs!K:K",
        sheetId,
      });
      aboutSubHeading = aboutSubHeading.data.slice(1)?.[0]?.[0];
      aboutHeading = aboutHeading.replaceAll(
        "[location]",
        `${city}, ${stateId}`
      );
      aboutSubHeading = aboutSubHeading.replaceAll(
        "[location]",
        `${city}, ${stateId}`
      );
      setCompany(aboutCompany);
      setCityHeading(aboutHeading);
      setCitySubHeading(aboutSubHeading);
    }
    allServices();
  }, []);
  const heading = (
    <h1 className="mb-7 font-extrabold text-4xl text-white leading-[5rem] sm:text-7xl">
      {cityHeading}
    </h1>
  );
  return (
    <div>
      <Navigation sheetId={sheetId} />
      <Banner
        heading={heading}
        sheetId={sheetId}
        prefix={`${state} ${company} Pros`}
        subHeading={citySubHeading}
      />
      <About
        range="Snapshot - configs!B:B"
        link="about"
        subheading="Who We Are"
        sheetId={sheetId}
      />
      <div className="padding-inline my-[5rem] bg-[#f7fbff] py-[3rem]">
        <Services sheetId={sheetId} isLink={true} isLocation={false} />
      </div>
      <Counter />
      <About
        range="Snapshot - configs!C:C"
        link="why"
        subheading="Why Choose Us"
        sheetId={sheetId}
      />
      <div className="padding-inline">
        <h2 className="font-extrabold text-center text-4xl leading-[1.25em] sm:text-4xl">{`${company} in ${state} Cities`}</h2>
        <CityContainer sheetName={stateId?.toLowerCase()} isCity={true} />
      </div>
      <div className="padding-inline my-[5rem] py-[3rem]">
        <h2 className="font-extrabold text-center text-4xl leading-[1.25em] sm:text-4xl">{`Frequently Asked Questions About ${company} Services in ${city}, ${stateId} `}</h2>
        <FAQS city={city} stateId={stateId} sheetId={sheetId} />
      </div>
      <Testimonials stateId={stateId} sheetId={sheetId} city={city} />
    </div>
  );
};

export default CityPage;
