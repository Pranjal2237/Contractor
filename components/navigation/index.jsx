"use client"

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navigation = () => {
  const [logo, setLogo] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    async function allNav() {
      let value = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/configs`,
        { range: "configs!A:A" }
      );
      value = value.data.slice(1)?.[0]?.[0];
      setLogo(value);
    }
    allNav();
  }, []);
  return (
    <div className="padding-inline bg-[--background-normal] flex justify-between items-center py-[1rem]">
      <div>
        <Link href="/">
          <Image src={logo} width={150} height={150} alt="/" />
        </Link>
      </div>
      <ul className="hidden gap-[2rem] font-bold items-center text-white text-[1.1rem] lg:flex">
        {[
          { name: "Home", link: "/" },
          { name: "Our Services", link: "/services" },
          { name: "About Us", link: "/about-us" },
          { name: "Contact", link: "/contact-us" },
        ].map(({ name, link }) => {
          return (
            <Link href={link} key={name}>
              <li>{name}</li>
            </Link>
          );
        })}
        <Link href="/">
          <button className="bg-[--btn-color] text-[white] py-4 px-8 rounded-md font-bold hidden sm:block">
            (607) 305-1964
          </button>
        </Link>
      </ul>
      {open && (
        <ul className="gap-8 absolute w-[100%] bg-[white] inset-0 lg:hidden">
          {[
            { name: "Home", link: "/" },
            { name: "Our Services", link: "/services" },
            { name: "About Us", link: "/about-us" },
            { name: "Contact", link: "/contact-us" },
          ].map(({ name, link }) => {
            return (
              <Link href={link} key={name}>
                <li className="p-[1rem]">{name}</li>
              </Link>
            );
          })}
          <Link href="/">
            <button className="bg-[--btn-color] text-[white] py-4 px-8 rounded-md font-bold hidden lg:block">
              (607) 305-1964
            </button>
          </Link>
        </ul>
      )}
      <div
        className={`${open ? "nav_toggle active" : "nav_toggle"} lg:hidden`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="toggle"></div>
        <div className="toggle"></div>
        <div className="toggle"></div>
      </div>
    </div>
  );
};

export default Navigation;
