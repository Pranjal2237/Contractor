"use client";

import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AboutService = ({ sheetId, range }) => {
  const { service } = useParams();
  const [aboutService, setAboutService] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState({ city: "", stateId: "" });
  const heading = `Best ${service.replaceAll("-", " ")} in ${location.city}, ${
    location.stateId
  }`;
  useEffect(() => {
    async function getService() {
      let hostUrl = window.location.hostname;
      hostUrl = hostUrl.split(".");
      let locationTemp = hostUrl[0];
      const regex = new RegExp(`-(?!.*-)`);
      locationTemp = locationTemp?.replace(regex, ",");
      locationTemp = locationTemp.replaceAll("-", " ");
      let [city, stateId] = locationTemp?.split(",");
      stateId = stateId?.toUpperCase();
      setLocation({ city, stateId });
      let origin = window.location.origin;
      let aboutData = await axios.post(`${origin}/api/services/${service}`, {
        sheetId: sheetId,
      });
      let aboutImage = await axios.post(`${origin}/api/configs`, {
        range: range,
        sheetId: sheetId,
      });
      let aboutNumber = await axios.post(`${origin}/api/configs`, {
        range: "configs!F:F",
        sheetId,
      });
      aboutNumber = aboutNumber.data.slice(1)?.[0]?.[0];
      aboutImage = aboutImage.data.slice(1)?.[0]?.[0];
      aboutData = aboutData.data;
      aboutData = aboutData.replaceAll("[location]", "Near Me");
      aboutData = aboutData.replaceAll("[phone]", aboutNumber);
      setImage(aboutImage);
      setAboutService(aboutData);
    }
    getService();
  }, [service]);
  console.log("ser", aboutService);
  return (
    <div className="padding-inline pt-[6rem] flex justify-between flex-col gap-8 lg:flex-row">
      <div className="w-[400px] h-[400px] flex-1">
        <Image src={image} alt="/" width={400} height={400} />
      </div>
      <div className="flex-1 text-[1.1rem]">
        <h2 className="font-bold mb-[0.75rem] text-4xl leading-[1.25em] sm:text-4xl">
          {heading}
        </h2>
        <p>{aboutService}</p>
      </div>
    </div>
  );
};

export default AboutService;
