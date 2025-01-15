"use client";

import { facebook, instagram, linkedin, twitter } from "@/public";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [logo, setLogo] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const dateValue=new Date();
  const year=dateValue.getFullYear();
  let month=dateValue.getMonth();
  const getFullMonth={
    0:"January",
    1:"February",
    2:"March",
    3:"April",
    4:"May",
    5:"June",
    6:"July",
    7:"August",
    8:"September",
    9:"October",
    10:"November",
    11:"December"
  }
  month=getFullMonth[month];
  useEffect(() => {
    async function allFooterData() {
      let origin = window.location.origin;
      let domainUrl = origin.split("//");
      domainUrl = domainUrl[1];
      domainUrl = domainUrl.split(".");
      if (domainUrl.length > 2) {
        domainUrl = domainUrl[1] + domainUrl[2];
      } else if (domainUrl.length == 2) {
        domainUrl = domainUrl[1];
      } else {
        domainUrl = domainUrl[0];
      }
      const response = await axios.post(`${origin}/api/getSheetId`, {
        domain: domainUrl,
      });
      let { sheetId } = response.data;
      console.log("footer", sheetId);
      let aboutLogo = await axios.post(`${origin}/api/configs`, {
        range: "configs!A:A",
        sheetId,
      });
      aboutLogo = aboutLogo.data.slice(1)?.[0]?.[0];
      let aboutNumber = await axios.post(`${origin}/api/configs`, {
        range: "configs!F:F",
        sheetId,
      });
      aboutNumber = aboutNumber.data.slice(1)?.[0]?.[0];
      let aboutEmail = await axios.post(`${origin}/api/configs`, {
        range: "configs!E:E",
        sheetId,
      });
      aboutEmail = aboutEmail.data.slice(1)?.[0]?.[0];
      setLogo(aboutLogo);
      setNumber(aboutNumber);
      setEmail(aboutEmail);
    }
    allFooterData();
  }, []);
  return (
    <>
      <div className="padding-inline text-white py-[4rem] bg-[--background-dark] grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-[1rem]">
          <div>
            <Image src={logo} width={150} height={150} alt="image" />
          </div>
          <p className="text-[1.1rem]">Kentucky Roofing Contractor</p>
        </div>
        <div className="flex flex-col gap-[1rem]">
          <h3 className="font-bold mb-[0.5rem] text-4xl leading-[1.25em] sm:text-[24px]">
            Subscribe to Newsletter
          </h3>
          <p className="text-[1.1rem]">
            Join our subscribers list to get the latest news and special offers
          </p>
          <div className="bg-white p-[1rem] my-[1rem]">
            <input
              type="text"
              placeholder="Your email address"
              className="w-[100%] outline-none text-black"
            />
          </div>
          <button className="bg-[--btn-color] text-[white] py-4 px-8 rounded-md font-bold">
            Subscribe Now
          </button>
        </div>
        <div className="flex flex-col gap-[1rem] items-end">
          <h3 className="font-bold mb-[0.5rem] text-4xl leading-[1.25em] sm:text-[24px]">
            Contact Info
          </h3>
          <p className="text-[1.1rem]">Kentucky Roofing Contractor Pros.</p>
          <p className="text-[1.1rem]">{number}</p>
          <p className="text-[1.1rem]">{email}</p>
          <p className="text-[1.1rem]">08:00am-6:00pm</p>
          <div className="flex gap-[2rem]">
            <Image src={facebook} width={10} height={10} />
            <Image src={instagram} width={15} height={15} />
            <Image src={twitter} width={15} height={15} />
            <Image src={linkedin} width={15} height={15} />
          </div>
        </div>
      </div>
      <div className="padding-inline py-[1rem] bg-[--background-normal] text-white">
        <p className="md:w-[40%]">
          Copyright © <span className='text-[#ff7033]'>Roofing Contractors Near Me</span> By Kentucky Roofing Contractor
          Pros {month}, {year}.
        </p>
      </div>
    </>
  );
};

export default Footer;
