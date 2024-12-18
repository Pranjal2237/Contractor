import { cities } from "@/utils";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    const searchValue=await params?.sheetName;
    console.log(searchValue);
    try{
        let data=cities[searchValue];
        return NextResponse.json(data);
    }
    catch(error){
        console.log(error);
    }
}