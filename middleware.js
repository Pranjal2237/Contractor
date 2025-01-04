import { NextResponse } from "next/server";
import axios from "axios";

export async function middleware(req) {
  const host = req.headers.get("host");
  const domainarr = host.split(".");
  
  let domainUrl = domainarr[0];
  if (domainarr?.length > 1) {
    domainUrl = domainarr[1];
  }
  let domainLength = domainarr.length;
  const d = domainarr[0].split("-").length;
  domainLength = domainLength + d - 1;
  const subdomain = domainarr[0];
  const url = req.nextUrl.clone();

  const response = await axios.post(`${url.origin}/api/getSheetId`, {
    domain: domainUrl,
  });

  const { sheetId } = response.data;
  url.searchParams.set("sheetId", sheetId);
  url.searchParams.set("sublength", domainLength);
  url.searchParams.set("subname", subdomain);
  url.searchParams.set("url",url?.origin);
  return NextResponse.rewrite(url);
}
