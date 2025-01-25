"use client";

import { order, service, star } from "@/public";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Counter = () => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  return (
    <div
      ref={ref}
      className="padding-inline bg-[--background-normal] py-[3rem] flex flex-col gap-[2.5rem] sm:flex-row sm:justify-between"
    >
      {[
        {
          image: service,
          end: 8756,
          heading: "Services Provider",
        },
        {
          image: order,
          end: 9871,
          heading: "Order Served",
        },
        {
          image: star,
          end: 12953,
          heading: "5 Star Received",
        },
      ].map(({ image, end, heading }, index) => {
        return (
          <div className="flex gap-[1rem]" key={index}>
            <div>
              <Image src={image} alt="/" width={60} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[white] sm:text-4xl">
                {inView && <CountUp end={end} duration={5} />} +
              </h2>
              <h2 className="text-xl font-bold text-[white]">{heading}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Counter;
