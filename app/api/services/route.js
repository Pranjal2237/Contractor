import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request) {
    const auth=new google.auth.GoogleAuth({
        credentials:{
            client_email:process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key:process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g,"\n")
        },
        scopes:["https://www.googleapis.com/auth/spreadsheets.readonly"]
    })

    const sheets=google.sheets({version:"v4",auth:await auth.getClient()})
    const range="services!A:C"
    try{
        const response=await sheets.spreadsheets.values.get({
            spreadsheetId:process.env.GOOGLE_SHEET_ID,
            range
        })
        let filterdata=response.data.values;
        return NextResponse.json(filterdata,{status:200});
    }
    catch(error){
        console.log(error);
    }
}