import { Navigation } from "@/components";
import AboutService from "@/components/aboutService";
import Banner from "@/components/banner";
import Display from "@/components/display";
import Services from "@/components/services";
import axios from "axios";
import React from "react";

const page = async ({ searchParams }) => {
  let tenantConfig = await searchParams;
  let sheetId = tenantConfig["sheetId"];
  return (
    <>
      <Navigation sheetId={sheetId} />
      <Display sheetId={sheetId} isNumber={true} isSubHeading={true} />
      <AboutService sheetId={sheetId} range="Snapshot - configs!B:B" />
      <div className="padding-inline my-[5rem] bg-[#f7fbff]">
        <Services sheetId={sheetId} isLink={true} isLocation={false} />
      </div>
    </>
  );
};

export default page;


export async function generateMetadata({params,searchParams}) {
  let tenantConfig = await searchParams;
  let {service}=await params;
  let location = tenantConfig["subname"];
  let url=tenantConfig["url"];
  let sheetId=tenantConfig["sheetId"];
  tenantConfig = tenantConfig["sublength"];
  let heading = await axios.post(
    `http://${url}/api/services/${service}`,
    { range: "Snapshot - configs!I:I",
      sheetId
     }
  );
  heading = heading?.data[0];
  let logo = await axios.post(
    `http://${url}/api/configs`,
    { range: "Snapshot - configs!A:A",
      sheetId
     }
  );
  logo = logo?.data?.slice(1)?.[0]?.[0];
  let title=`Best ${heading} in ${location} Near Me`
  return {
    title: `${title}`,
    icons:{
      icon:logo
    }
  };
}