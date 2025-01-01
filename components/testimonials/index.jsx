"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const Testimonials = ({ stateId,sheetId }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function allReviews() {
      let origin=window.location.origin;
      let values = await axios.post(
        `${origin}/api/reviews/${stateId}`,{
          sheetId
        }
      );
      values = values.data;
      setReviews(values);
    }
    allReviews();
  }, []);
  return (
    <div className="padding-inline py-[5rem] bg-[--background-normal]">
      <h3 className="font-bold mb-[0.5rem] text-[white] text-center text-4xl leading-[1.25em] sm:text-xl">
        Testimonials
      </h3>
      <h2 className="font-bold mb-[0.75rem] text-4xl text-[white] text-center leading-[1.25em] sm:text-4xl">
        What Our Clients Say About Us
      </h2>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 my-[3rem]">
        {reviews.map((review) => {
          review = review.replaceAll("[location]", "Near Me");
          return (
            <div
              key={review}
              className="border-[#01539F21] text-white text-[1.1rem] bg-[--background-dark] border-solid border-[1px] rounded-lg overflow-hidden px-[3rem] py-[4rem] flex flex-col justify-center items-center"
            >
              {review}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
