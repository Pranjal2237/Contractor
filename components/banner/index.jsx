"use client"

import axios from 'axios';
import Link from "next/link";
import React,{useState,useEffect} from "react";

const Banner = ({ heading, subHeading }) => {
  const [phone, setPhone] = useState("");
  useEffect(() => {
      async function allServices() {
        let origin=window.location.origin;
        let aboutNumber = await axios.post(
          `${origin}/api/configs`,
          { range: "configs!F:F" }
        );
        aboutNumber = aboutNumber.data.slice(1)?.[0]?.[0];
        setPhone(aboutNumber);
      }
      allServices();
    }, []);
    subHeading=subHeading.replaceAll("[number]",phone);
  return (
    <div className="bg-[--background-normal] min-h-[115dvh] flex flex-col justify-center">
      <div className="padding-inline max-w-[100%] sm:max-w-[60%]">
        <h1 className="mb-7 font-extrabold text-4xl text-white leading-[5rem] sm:text-7xl">
          {heading}
        </h1>
        <p className="mb-7 leading-[2rem] text-white tracking-wide text-md sm:text-lg">
          {subHeading}
        </p>
        {
          phone && <Link href="/contact-us">
          <button className="bg-[--btn-color] text-[white] py-4 px-8 rounded-md font-bold">
            {phone}
          </button>
        </Link>
        }
      </div>
    </div>
  );
};

export default Banner;
