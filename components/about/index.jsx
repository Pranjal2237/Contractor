"use client";

import { shape } from "@/public";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const About = ({ range, link, subheading, sheetId }) => {
  const [image, setImage] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState({ city: "", stateId: "" });

  const heading = `${location?.city}, ${location?.stateId} Roofing Repair`;
  useEffect(() => {
    async function allAbout() {
      let hostUrl = window.location.hostname;
      let origin = window.location.origin;
      hostUrl = hostUrl.split(".");
      let locationTemp = hostUrl[0];
      const regex = new RegExp(`-(?!.*-)`);
      locationTemp = locationTemp?.replace(regex, ",");
      locationTemp = locationTemp.replaceAll("-", " ");
      let [city, stateId] = locationTemp?.split(",");
      stateId = stateId?.toUpperCase();
      setLocation({ city, stateId });
      let aboutData = await axios.post(`${origin}/api/${link}/${stateId}`, {
        sheetId: sheetId,
      });
      let aboutImage = await axios.post(`${origin}/api/configs`, {
        range: range,
        sheetId: sheetId,
      });
      aboutImage = aboutImage.data.slice(1)?.[0]?.[0];
      aboutData = aboutData.data;
      aboutData = aboutData.replaceAll("[location]", "Near Me");
      setImage(aboutImage);
      setAbout(aboutData);
    }
    allAbout();
  }, []);
  return (
    <div className="padding-inline py-[3rem] flex justify-between flex-col gap-8 lg:flex-row">
      {about && (
        <div className="flex-1 text-[1.1rem]">
          <div className="relative mb-9">
            <h3 className="font-bold mb-[0.5rem] text-xl leading-[1.25em] sm:text-xl">
              {subheading}
            </h3>
            <Image src={shape} className="absolute top-[-1rem] left-[3%]" />
          </div>
          <h2 className="font-bold mb-[0.75rem] text-4xl leading-[1.25em] sm:text-4xl">
            {heading}
          </h2>
          <p className="sm:w-[75%]">{about}</p>
        </div>
      )}
      {image && (
        <div className="w-[400px] h-[400px]">
          <Image src={image} alt="/" width={400} height={400} />
        </div>
      )}
    </div>
  );
};

export default About;
