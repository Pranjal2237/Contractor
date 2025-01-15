import { NextResponse } from "next/server";
import axios from "axios";

export async function middleware(req) {
  const host = req.headers.get("host");
  const domainarr = host.split(".");

  // for dev mode

  // let domainUrl = domainarr[0];
  // if (domainarr?.length > 1) {
  //   domainUrl = domainarr[1];
  // }

  // for prod mode

  let domainUrl=domainarr[0]+"."+domainarr[1];
  if(domainarr?.length>2){
    domainUrl=domainarr[1]+"."+domainarr[2];
  }
  let domainLength = domainarr.length;
  const d = domainarr[0].split("-").length;
  domainLength = domainLength + d - 1;
  const subdomain = domainarr[0];
  const url = req.nextUrl.clone();
  let origin=url?.origin;
  origin=origin.split("//");
  origin=origin[1];
  try {
    const response = await axios.post(`http://${origin}/api/getSheetId`, {
      domain: domainUrl,
    });
  
    const { sheetId } = response.data;
    url.searchParams.set("sheetId", sheetId);
    url.searchParams.set("sublength", domainLength);
    url.searchParams.set("subname", subdomain);
    url.searchParams.set("url",origin);
    return NextResponse.rewrite(url);
  } catch (error) {
    console.log(error)
  }
}
