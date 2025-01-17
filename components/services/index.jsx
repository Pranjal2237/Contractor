"use client";

import { arrow } from "@/public";
import { states } from "@/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Services = ({ sheetId, isLink = false }) => {
  const [services, setServices] = useState([]);
  const [phone, setPhone] = useState();
  const [location, setLocation] = useState("");
  useEffect(() => {
    async function allServices() {
      let hostUrl = window.location.hostname;
      let origin = window.location.origin;
      hostUrl = hostUrl.split(".");
      let locationTemp = hostUrl[0];
      if (locationTemp.includes("-") == false) {
        locationTemp = states[locationTemp];
      }
      const regex = new RegExp(`-(?!.*-)`);
      locationTemp = locationTemp?.replace(regex, ",");
      locationTemp = locationTemp?.replaceAll("-", " ");
      if (hostUrl.length == 1) {
        locationTemp = "Near Me";
      }
      setLocation(locationTemp);
      let values = await axios.post(`${origin}/api/services`, {
        sheetId: sheetId,
      });
      values = values.data;
      values = values.slice(1);
      setServices(values);
      let aboutNumber = await axios.post(`${origin}/api/configs`, {
        range: "configs!F:F",
        sheetId: sheetId,
      });
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
            let link = service.replaceAll(" ", "-");
            service = service + " " + location;
            metaDescription = metaDescription?.replace("[location]", location);
            metaDescription = metaDescription?.replace("[phone]", phone);
            return (
              <div
                key={service}
                className="border-[#01539F21] bg-[white] border-solid border-[1px] rounded-lg overflow-hidden px-[3rem] py-[4rem] flex flex-col justify-center items-center"
              >
                {isLink ? (
                  <Link
                    href={`/services/${link}`}
                    className="text-[1.35rem] font-bold text-center my-[1.5rem] hover:text-[yellow]"
                  >
                    {service}
                  </Link>
                ) : (
                  <h2 className="text-[1.35rem] font-bold text-center my-[1.5rem]">
                    {service}
                  </h2>
                )}
                <p className="text-center text-[1.1rem]">{metaDescription}</p>
                <Link
                  href="tel:(607) 305-1964"
                  className="flex items-center gap-[1rem] mt-[1.5rem] border-[#01539F21] border-solid border-[2px]  py-4 px-8 rounded-md font-bold"
                >
                  <button>Get Quotes</button>
                  <div>
                    <Image src={arrow} width={15} height={15} />
                  </div>
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
