import { Navigation } from "@/components";
import About from "@/components/about";
import Display from "@/components/display";
import React from "react";

const page = async ({ searchParams }) => {
  let tenantConfig = await searchParams;
  let sheetId = tenantConfig["sheetId"];
  return (
    <div>
      <Navigation sheetId={sheetId} />
      <Display heading="About Us" />
      <About
        range="configs!B:B"
        link="about"
        subheading="Who We Are"
        sheetId={sheetId}
      />
      <About
        range="configs!C:C"
        link="why"
        subheading="Why Choose Us"
        sheetId={sheetId}
      />
    </div>
  );
};

export default page;

export function generateMetadata({ params }) {
  return {
    title: "About Us",
  };
}
