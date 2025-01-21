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
   <Display sheetId={sheetId} />
     <div className='padding-inline my-[5rem] bg-[#f7fbff]'>
    <Services sheetId={sheetId} isLink={true} />
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