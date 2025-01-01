"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { contact, location, mail } from "@/public";
import Image from "next/image";

const Contact = ({ sheetId }) => {
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [stateId, setStateId] = useState("");
  useEffect(() => {
    let hostUrl = window.location.hostname;
    hostUrl = hostUrl.split(".");
    hostUrl = hostUrl[0].split("-");
    setCity(hostUrl[0]);
    setStateId(hostUrl[1]);
    async function allData() {
      let origin = window.location.origin;
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
      setNumber(aboutNumber);
      setEmail(aboutEmail);
    }
    allData();
  }, []);
  return (
    <div className="padding-inline py-[5rem] flex justify-between flex-col gap-8 lg:flex-row">
      <div className="flex flex-col justify-between gap-[1.5rem]">
        <h2 className="font-bold mb-[0.5rem] text-xl leading-[1.25em] text-[#01539F] sm:text-xl">
          Contact Us
        </h2>
        <h1 className="font-bold mb-[0.5rem] text-3xl leading-[1.25em] sm:text-4xl">
          Get In Touch
        </h1>
        <div className="flex gap-[1rem]">
          <div className="rounded-[50%] w-[60px] h-[60px] bg-[#01539F] flex justify-center items-center">
            <Image src={location} alt="/" className="w-[50%]" />
          </div>
          <div>
            <h2 className="font-[600] mb-[0.5rem] text-xl leading-[1.25em] sm:text-l">
              Visit Us:
            </h2>
            <p className="mb-[0.5rem] text-xl leading-[1.25em] text-[#666666] text-[16px] sm:text-[18px]">
              {`${city}, ${stateId} Roofing Contractor, ${stateId}, USA`}
            </p>
          </div>
        </div>
        <div className="flex gap-[1rem]">
          <div className="rounded-[50%] w-[60px] h-[60px] bg-[#01539F] flex justify-center items-center">
            <Image src={mail} alt="/" className="w-[50%]" />
          </div>
          <div>
            <h2 className="font-[600] mb-[0.5rem] text-xl leading-[1.25em] sm:text-l">
              Mail Us:
            </h2>
            <p className="mb-[0.5rem] text-xl leading-[1.25em] text-[#666666] text-[16px] sm:text-l">
              {email}
            </p>
          </div>
        </div>
        <div className="flex gap-[1rem]">
          <div className="rounded-[50%] w-[60px] h-[60px] bg-[#01539F] flex justify-center items-center">
            <Image src={contact} alt="/" className="w-[50%]" />
          </div>
          <div>
            <h2 className="font-[600] mb-[0.5rem] text-xl leading-[1.25em] sm:text-l">
              Phone:
            </h2>
            <p className="mb-[0.5rem] text-xl leading-[1.25em] text-[#666666] text-[16px] sm:text-l">
              {number}
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-hidden lg:min-w-[600px]">
        <iframe
          src={`https://maps.google.com/maps?q=${city}, ${stateId}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="450"
        />
      </div>
    </div>
  );
};

export default Contact;
