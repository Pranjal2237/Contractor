import { tenants } from "@/constants";
import { states } from "@/utils";
import axios from "axios";


export default async function page({ searchParams }) {
  let tenantConfig = await searchParams;
  let location = tenantConfig["subname"];
  tenantConfig = tenantConfig["sublength"];
  if(tenantConfig>=3){
    tenantConfig=3;
  }
  const regex = new RegExp(`-(?!.*-)`);
  location = location?.replace(regex, ",");
  location = location.replaceAll("-", " ");
  const MainComp = tenants[tenantConfig].PageComp;
  return (
    <div>
      <MainComp location={location} state="Alabama" />
    </div>
  );
}


export async function generateMetadata({searchParams}) {
  let tenantConfig = await searchParams;
  let location = tenantConfig["subname"];
  tenantConfig = tenantConfig["sublength"];
  if(tenantConfig>=3){
    tenantConfig=3;
  }
  let title = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/configs`,
    { range: "configs!I:I" }
  );
  title = title?.data?.slice(1)?.[0]?.[0];
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
    title: `${title}`
  };
}