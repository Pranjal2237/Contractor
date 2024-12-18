"use client"

import { states } from "@/utils";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [phone, setPhone] = useState();
  const [location,setLocation]=useState("");
  useEffect(() => {
    async function allServices() {
  let hostUrl = window.location.hostname;
  hostUrl = hostUrl.split(".");
  let locationTemp = hostUrl[0];
  if (locationTemp.includes("-") == false) {
    locationTemp = states[locationTemp];
  }
  const regex = new RegExp(`-(?!.*-)`);
  locationTemp = locationTemp?.replace(regex, ",");
  locationTemp=locationTemp?.replaceAll("-"," ");
  if (hostUrl.length == 1) {
    locationTemp = "Near Me";
  }
  setLocation(locationTemp);
      let values = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/services`
      );
      values = values.data;
      values = values.slice(1);
      setServices(values);
      let aboutNumber = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/configs`,
        { range: "configs!F:F" }
      );
      aboutNumber = aboutNumber.data.slice(1)?.[0]?.[0];
      setPhone(aboutNumber);
    }
    allServices();
  }, []);
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 my-[3rem]">
      {services && (
        <>
          {services.map(([service, metaDescription]) => {
            service = service + " " + location;
            metaDescription = metaDescription?.replace("[location]", location);
            metaDescription = metaDescription?.replace("[phone]", phone);
            return (
              <div
                key={service}
                className="border-[#01539F21] bg-[white] border-solid border-[1px] rounded-lg overflow-hidden px-[3rem] py-[4rem] flex flex-col justify-center items-center"
              >
                <h2 className="text-[1.35rem] font-bold text-center my-[1.5rem]">
                  {service}
                </h2>
                <p className="text-center text-[1.1rem]">{metaDescription}</p>
                <Link href="tel:(607) 305-1964">
                  <button className="mt-[1.5rem] border-[#01539F21] border-solid border-[2px]  py-4 px-8 rounded-md font-bold">
                    Get Quotes
                  </button>
                </Link>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Services;
