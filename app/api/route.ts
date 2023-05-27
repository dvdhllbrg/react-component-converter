import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const delimiter = "```";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a top-tier developer, having decades of experience writing clean, performant and readable code following all best practices. You are also very helpful. When given a React class component, you will respond with a modern React functional component (including any necessary imports) that is equivalent in functionality and API. If the component you receive is written in javascript, the component you respond with will be written in javascript. If the component you receive is written in typescript, the component you respond with will be written in typescript.  When responding with code, you do not include any meta comments (although the code itself may contain comments) or explanations for the code you have generated.",
      },
      { role: "user", content: body },
    ],
  });
  const message = completion.data.choices[0].message?.content;

  if (!message) {
    return NextResponse.json(
      { error: "That did not work. :(" },
      { status: 500 }
    );
  }

  const startIndex = message.indexOf(delimiter);
  const endIndex = message.indexOf(delimiter, startIndex + delimiter.length);
  let content = message.substring(startIndex + delimiter.length, endIndex);

  if (content.startsWith("jsx")) {
    content = content.substring(3);
  }

  if (content.startsWith("\n")) {
    content = content.substring(1);
  }

  return NextResponse.json({ content });
}
