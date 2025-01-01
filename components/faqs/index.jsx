"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const FAQS = ({ city, stateId,sheetId }) => {
  const [faqs, setFaqs] = useState([]);
  const [faqImage, setFaqImage] = useState("");
  const [position, setPosition] = useState(0);
  const [phone, setPhone] = useState();
  let location = `${city}, ${stateId}`;
  useEffect(() => {
    async function allFaqs() {
      let origin=window.location.origin;
      let values = await axios.post(
        `${origin}/api/faqs`,{
          sheetId:sheetId
        }
      );
      values = values.data;
      setFaqs(values);
      let aboutLogo = await axios.post(
        `${origin}/api/configs`,
        { range: "configs!D:D",
          sheetId:sheetId
         }
      );
      aboutLogo = aboutLogo.data.slice(1)?.[0]?.[0];
      setFaqImage(aboutLogo);
      let aboutNumber = await axios.post(
        `${origin}/api/configs`,
        { range: "configs!F:F",
          sheetId
         }
      );
      aboutNumber = aboutNumber.data.slice(1)?.[0]?.[0];
      setPhone(aboutNumber);
    }
    allFaqs();
  }, []);
  return (
    <div className="py-[3rem] flex justify-between flex-col gap-10 lg:flex-row">
      <div className="flex-1">
        <Image src={faqImage} alt="/" width={400} height={400} />
      </div>
      <div className="flex-1 text-[1.1rem] flex flex-col gap-[1rem]">
        {faqs.map(([question, answer], index) => {
          question = question.replaceAll("[location]", location);
          question = question.replaceAll("[phone]", phone);
          answer = answer.replaceAll("[location]", location);
          answer = answer.replaceAll("[phone]", phone);
          return (
            <div key={index}>
              <div
                onClick={() => {
                  setPosition(index);
                }}
                className="bg-[--background-normal] text-[white] py-4 px-8 rounded-md font-bold cursor-pointer"
              >
                <h3 className="font-bold mb-[0.5rem] text-l leading-[1.25em] sm:text-xl">
                  {question}
                </h3>
              </div>
              {index == position && (
                <p className="mt-[0.5rem] px-8">{answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQS;
