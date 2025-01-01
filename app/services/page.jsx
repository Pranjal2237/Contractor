import { Navigation } from '@/components';
import Display from '@/components/display';
import Services from '@/components/services'
import React from 'react'

const page = async({searchParams}) => {
  let tenantConfig = await searchParams;
  let sheetId=tenantConfig["sheetId"]
  return (
   <>
   <Navigation sheetId={sheetId} />
   <Display heading={`Roofing Contractor Services in `} />
     <div className='padding-inline my-[5rem] bg-[#f7fbff]'>
    <h2 className='font-extrabold text-center text-4xl leading-[1.25em] sm:text-4xl'>Professional Roofing Contractor services Near Me</h2>
    <Services sheetId={sheetId} />
    </div>
   </>
  )
}

export default page;

export function generateMetadata({params}){
  return{
    title:"Our Services"
  }
}