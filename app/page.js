import { tenants } from "@/constants";
import { states } from "@/utils";
import axios from "axios";


export default async function page({ searchParams }) {
  let tenantConfig = await searchParams;
  let sheetId=tenantConfig["sheetId"]
  let location = tenantConfig["subname"];
  tenantConfig = tenantConfig["sublength"];
  console.log(tenantConfig);
  console.log(sheetId);
  if(tenantConfig>=4){
    tenantConfig=4;
  }
  const regex = new RegExp(`-(?!.*-)`);
  location = location?.replace(regex, ",");
  location = location.replaceAll("-", " ");
  const MainComp = tenants[tenantConfig].PageComp;
  return (
    <div>
      <MainComp location={location} sheetId={sheetId} />
    </div>
  );
}


export async function generateMetadata({searchParams}) {
  let tenantConfig = await searchParams;
  let location = tenantConfig["subname"];
  let url=tenantConfig["url"];
  let sheetId=tenantConfig["sheetId"];
  tenantConfig = tenantConfig["sublength"];
  if(tenantConfig>=4){
    tenantConfig=4;
  }
  let title = await axios.post(
    `http://${url}/api/configs`,
    { range: "Snapshot - configs!H:H",
      sheetId
     }
  );
  title = title?.data?.slice(1)?.[0]?.[0];
  let logo = await axios.post(
    `http://${url}/api/configs`,
    { range: "Snapshot - configs!A:A",
      sheetId
     }
  );
  logo = logo?.data?.slice(1)?.[0]?.[0];
  title=title.replace("[zip]","");
  if(tenantConfig==1)
  {
    location="USA";
  }
  else if(tenantConfig==2){
    location=states[location]
  }
  title=title.replace("[location]",location);
  return {
    title: `${title}`,
    icons:{
      icon:logo
    }
  };
}