import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration  = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    console.log(JSON.stringify(openai));
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!configuration.apiKey){
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                'role':'system', 'content':'You are a lab assitant that helps students answer scientific questions by giving hints without giving specific answers.'
            },...messages]
        });

        return NextResponse.json(response.data.choices[0].message);
    }catch (error){
        console.log("[ASK_ERROR]",error);
        return new NextResponse("Internal error", { status: 500 });
    }
}