"use client";

import { shape,Phone } from "@/public";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Banner = ({ heading, subHeading, sheetId, prefix }) => {
  const [phone, setPhone] = useState("");
  const [company,setCompany]=useState("");
  useEffect(() => {
    async function allServices() {
      let origin = window.location.origin;
      let aboutNumber = await axios.post(`${origin}/api/configs`, {
        range: "Snapshot - configs!F:F",
        sheetId,
      });
      aboutNumber = aboutNumber.data.slice(1)?.[0]?.[0];
      let aboutCompany = await axios.post(`${origin}/api/configs`, {
        range: "Snapshot - configs!G:G",
        sheetId,
      });
      aboutCompany = aboutCompany.data.slice(1)?.[0]?.[0];
      setCompany(aboutCompany);
      setPhone(aboutNumber);
    }
    allServices();
  }, []);
  subHeading=subHeading.replaceAll("[company]",company);
  subHeading=subHeading.replaceAll("[zip]","");
  subHeading=subHeading.replaceAll("[phone]",phone);
  return (
    <div className="bg-[--background-normal] min-h-[115dvh] flex flex-col justify-center">
      <div className="padding-inline max-w-[100%] sm:max-w-[60%]">
        {prefix && (
          <div className="relative mb-9">
            <p className="leading-[2rem] text-white tracking-wide text-md sm:text-lg">
              {prefix}
            </p>
            <Image src={shape} className="absolute top-[-1rem] left-[3%]" />
          </div>
        )}
        {heading}
        <p className="mb-7 leading-[2rem] text-white tracking-wide text-md sm:text-lg">
          {subHeading}
        </p>
        {phone && (
          <Link href={`tel:${phone}`} className="w-[max-content] bg-[--btn-color] text-[white] py-4 px-8 rounded-md font-bold flex gap-[1rem]">
          <Image src={Phone} width={20} height={20} />
            <button >
              {phone}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Banner;
