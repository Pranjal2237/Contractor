import { Navigation } from "@/components";
import Contact from "@/components/contact";
import Display from "@/components/display";
import React from "react";

const page = async ({ searchParams }) => {
  let tenantConfig = await searchParams;
  let sheetId = tenantConfig["sheetId"];
  return (
    <div>
      <Navigation sheetId={sheetId} />
      <Display heading="Contact Us" />
      <Contact sheetId={sheetId} />
    </div>
  );
};

export default page;

export function generateMetadata({ params }) {
  return {
    title: "Contact Us",
  };
}
