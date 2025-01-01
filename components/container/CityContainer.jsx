"use client"

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const CityContainer = ({sheetName}) => {
    const [places,setPlaces]=useState([]);
    useEffect(()=>{
        async function allPlaces() {
            let origin=window.location.origin;
            let values=await axios.get(`${origin}/api/about/cities/${sheetName}`)
            values=values.data;
            setPlaces(values);
        }
        allPlaces();
    },[])
  return (
    <div className="my-[3rem] grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {
            places.map((place)=>{
                let placeLink=place?.toLowerCase();
                placeLink=placeLink?.replaceAll(' ','-');
                let origin=window.location.origin;
                let domainUrl=origin.split("//");
                return(
                    <Link key={place} href={`${domainUrl[0]}//${placeLink}-${domainUrl[1]}`}>
                    <div className="flex justify-center items-center border-[#01539F21] border-solid border-[2px] shadow-md">
                        <p className="text-[1.35rem] font-bold text-center my-[1.5rem]">{place}</p>
                    </div>
                    </Link>
                )
            })
        }
    </div>
  )
}

export default CityContainer