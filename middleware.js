import { NextResponse } from "next/server";

export function middleware(req) {
  const response = NextResponse.next();
  
  // Enable CORS
  // response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins, or replace '*' with specific domain
  // response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // console.log('Setting CORS headers...',response);
  const host = req.headers.get("host");
  const domainarr = host.split(".");
  let domainLength = domainarr.length;
  const d = domainarr[0].split("-").length;
  domainLength = domainLength + d - 1;
  const subdomain = domainarr[0];
  const url = req.nextUrl.clone();
  url.searchParams.set("sublength", domainLength);
  url.searchParams.set("subname", subdomain);
  return NextResponse.rewrite(url);
}


// export const config = {
//   matcher: '/api/:path*',
// };