"use client";

import { call, clock, Email, facebook, instagram, linkedin, Loc, Phone, twitter } from "@/public";
import { states } from "@/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";


const Footer = () => {
  const [logo, setLogo] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [url,setUrl]=useState("");
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
      let locationTemp = domainUrl[0];
      if (domainUrl.length > 2) {
        domainUrl = domainUrl[1]+"."+domainUrl[2];
      } else if (domainUrl.length == 2) {
        domainUrl =domainUrl[0]+"."+domainUrl[1];
        locationTemp = "USA";
      } else {
        domainUrl = domainUrl[0];
      }
            if (locationTemp.includes("-") == false) {
              locationTemp = states[locationTemp];
            }
            const regex = new RegExp(`-(?!.*-)`);
            locationTemp = locationTemp?.replace(regex, ",");
            locationTemp = locationTemp?.replaceAll("-", " ");
            //for dev
            
            // for prod
            // if (hostUrl.length == 2) {
            //   locationTemp = "Near Me";
            // }
            setLocation(locationTemp);
      const response = await axios.post(`${origin}/api/getSheetId`, {
        domain: domainUrl,
      });
      let { sheetId } = response.data;
      let aboutLogo = await axios.post(`${origin}/api/configs`, {
        range: "Snapshot - configs!A:A",
        sheetId,
      });
      aboutLogo = aboutLogo.data.slice(1)?.[0]?.[0];
      let aboutNumber = await axios.post(`${origin}/api/configs`, {
        range: "Snapshot - configs!F:F",
        sheetId,
      });
      aboutNumber = aboutNumber.data.slice(1)?.[0]?.[0];
      let aboutEmail = await axios.post(`${origin}/api/configs`, {
        range: "Snapshot - configs!E:E",
        sheetId,
      });
      aboutEmail = aboutEmail.data.slice(1)?.[0]?.[0];
      let aboutCompany = await axios.post(`${origin}/api/configs`, {
              range: "Snapshot - configs!G:G",
              sheetId,
            });
            aboutCompany = aboutCompany.data.slice(1)?.[0]?.[0];
            setCompany(aboutCompany);
      setLogo(aboutLogo);
      setNumber(aboutNumber);
      setEmail(aboutEmail);
      setUrl(domainUrl);
    }
    allFooterData();
  }, []);
  return (
    <>
    {
      number && <Link href={`tel:${number}`} className="fixed bottom-[2rem] right-[1rem]">
      <div className="w-[50px] h-[50px] bg-[--btn-color] flex justify-center items-center rounded-[50%] ">
        <Image src={Phone} alt="/" width={20} height={20} />
      </div>
      </Link>
    }
      <div className="padding-inline text-white py-[4rem] bg-[--background-dark] grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-[1rem]">
          <div>
            <Image src={logo} width={150} height={150} alt="image" />
          </div>
          <p className="text-[1.1rem]">{location} {company}</p>
        </div>
        <div className="flex flex-col gap-[1rem]">
          <h3 className="font-bold mb-[0.5rem] text-4xl leading-[1.25em] sm:text-[24px]">
            Contact Info
          </h3>
          <div className="flex gap-[1rem]">
            <Image src={Loc} alt="/" width={15} height={15} />
            <p className="text-[1.1rem]">USA {company} Pros.</p>
          </div>
          <div className="flex gap-[1rem]">
            <Image src={call} alt="/" width={15} height={15} />
            <Link href={`tel:${number}`}>
          <p className="text-[1.1rem] hover:text-[#ff7033]">{number}</p>
          </Link>
          </div>
          <div className="flex gap-[1rem]">
            <Image src={Email} alt="/" width={15} height={15} />
            <Link href={`mailto:${email}`}>
          <p className="text-[1.1rem] hover:text-[#ff7033]">{email}</p>
          </Link>
          </div>
          <div className="flex gap-[1rem]">
            <Image src={clock} alt="/" width={15} height={15} />
            <p className="text-[1.1rem]">08:00am-6:00pm</p>
          </div>
          <div className="flex gap-[2rem]">
            <Link href="/#">
            <Image alt="/" src={facebook} width={10} height={10} />
            </Link>
            <Link href="/#">
            <Image alt="/" src={instagram} width={15} height={15} />
            </Link>
            <Link href="/#">
            <Image alt="/" src={twitter} width={15} height={15} />
            </Link>
            <Link href="/#">
            <Image alt="/" src={linkedin} width={15} height={15} />
            </Link>
          </div>
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
      </div>
      <div className="padding-inline py-[1rem] bg-[--background-normal] text-white">
        <p className="md:w-[40%]">
          Copyright © <Link href={`https://${url}`}><span className='text-[#ff7033]'>{company} Near Me</span></Link> By {location} {company} Pros {month}, {year}.
        </p>
      </div>
    </>
  );
};

export default Footer;
