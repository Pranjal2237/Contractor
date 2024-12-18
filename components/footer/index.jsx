"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [logo, setLogo] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    async function allFooterData() {
      let aboutLogo = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/configs`,
        { range: "configs!A:A" }
      );
      aboutLogo = aboutLogo.data.slice(1)?.[0]?.[0];
      let aboutNumber = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/configs`,
        { range: "configs!F:F" }
      );
      aboutNumber = aboutNumber.data.slice(1)?.[0]?.[0];
      let aboutEmail = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/configs`,
        { range: "configs!E:E" }
      );
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
        </div>
      </div>
      <div className="padding-inline py-[1rem] bg-[--background-normal] text-white">
        <p className="w-[40%]">
          Copyright © Roofing Contractors Near By Kentucky Roofing Contractor
          Pros November, 2024.
        </p>
      </div>
    </>
  );
};

export default Footer;
