import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {sheetId}=await request.json();
    const auth=new google.auth.GoogleAuth({
        credentials:{
            client_email:process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key:process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g,"\n")
        },
        scopes:["https://www.googleapis.com/auth/spreadsheets.readonly"]
    })

    const sheets=google.sheets({version:"v4",auth:await auth.getClient()})
    const range="faqs!A:B"
    try{
        const response=await sheets.spreadsheets.values.get({
            spreadsheetId:sheetId,
            range
        })
        let filterdata=response.data.values;
        filterdata=filterdata.slice(1);
        let faqData=[];
        let num=Math.floor(Math.random() * 6);
        for(let i=0;i<5;i++)
        {
            faqData=[...faqData,filterdata[num]]
            num=num+6;
        }
        return NextResponse.json(faqData,{status:200});
    }
    catch(error){
        console.log(error);
    }
}