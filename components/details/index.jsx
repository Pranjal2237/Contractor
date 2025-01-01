"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Details = ({range,sheetId}) => {
    const[details,setDetails]=useState([]);
    useEffect(()=>{
        async function allDetails(){
            let origin=window.location.origin;
            let aboutNumber = await axios.post(
                `${origin}/api/configs`,
                { range: range,
                    sheetId:sheetId
                 }
              );
              aboutNumber = aboutNumber.data.slice(1)?.[0];
              setDetails(aboutNumber);
        }
        allDetails();
    },[]);
  return (
    <div className='padding-inline my-[5rem]'>
        {
            details && <>
                <h2 className='font-extrabold text-4xl leading-[1.25em] sm:text-4xl'>{details[0]}</h2>
                <p className='mt-[1rem] text-[1.1rem]'>{details[1]}</p>
            </>
        }
    </div>
  )
}

export default Details