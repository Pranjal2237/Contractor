"use client";

import { Phone, shape } from "@/public";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";



const Display = ({ heading ="",sheetId ,isNumber=false,isSubHeading=false }) => {
  const { service } = useParams();
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [subHeading,setSubHeading]=useState("");
  const [mainHeading,setMainHeading]=useState("");
  useEffect(() => {
    let hostUrl = window.location.hostname;
    hostUrl = hostUrl.split(".");
    setLocation(hostUrl[0].replace("-", ","));
      async function allServices() {
        let origin = window.location.origin;
        let aboutCompany = await axios.post(`${origin}/api/configs`, {
          range: "Snapshot - configs!G:G",
          sheetId,
        });
        aboutCompany = aboutCompany.data.slice(1)?.[0]?.[0];
        if(isNumber==true)
        {
          let aboutNumber = await axios.post(`${origin}/api/configs`, {
            range: "Snapshot - configs!F:F",
            sheetId,
          });
          aboutNumber = aboutNumber.data.slice(1)?.[0]?.[0];
          setPhone(aboutNumber);
        }
        if(isSubHeading==true)
        {
          let aboutData = await axios.post(`${origin}/api/services/${service}`, {
                  sheetId: sheetId,
                });
                aboutData=aboutData.data;
                let [main,meta,about]=aboutData;
                meta=meta.replaceAll("[location]",hostUrl[0].replace("-", ","))
                setSubHeading(meta);
                setMainHeading(main);
        }
        setCompany(aboutCompany);
      }
      allServices();
  }, []);
  if(heading.length==0 && isSubHeading==false)
  {
    heading=`${company} Services in ${location}`
  }

  if(isSubHeading)
  {
    heading=<h1 className="mb-7 font-extrabold text-4xl text-white leading-[5rem] sm:text-7xl">
  {mainHeading} in <span className='text-[#ff7033]'>{location}</span></h1>;
  }

  return (
    <div className="padding-inline bg-[--background-normal] min-h-[60dvh] flex flex-col gap-[1rem]">
      {
        isSubHeading ? <div className="relative mb-9">
                    <p className="leading-[2rem] text-white tracking-wide text-md sm:text-lg">
                      {location} {company} Pros
                    </p>
                    <Image src={shape} className="absolute top-[-1rem] left-[3%]" />
                  </div> :<div className="w-[5%] h-[6px] bg-[yellow] mt-[5rem]"></div>
      }
      {
        isSubHeading ? <>
        {heading}
      </> : <h1 className="font-bold mb-[0.75rem] text-[white] text-4xl leading-[1.25em] sm:text-5xl">
        {heading}
      </h1>
      }
      {
        isSubHeading ? <h2 className="font-[600] mb-[0.5rem] text-[white] text-l leading-[1.25em] sm:text-[1.1rem]">
        {subHeading}
      </h2> : <h2 className="font-[600] mb-[0.5rem] text-[white] text-l leading-[1.25em] sm:text-[1.1rem]">
        {`${location} ${company}.`}
      </h2>
      }
      {phone && (
          <Link href={`tel:${phone}`} className="w-[max-content] bg-[--btn-color] text-[white] py-4 px-8 rounded-md font-bold flex gap-[1rem]">
          <Image src={Phone} width={20} height={20} />
            <button >
              {phone}
            </button>
          </Link>
        )}
    </div>
  );
};

export default Display;
