"use server";

import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createStreamableValue } from "ai/rsc";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface Movies {
  title: string;
  overview: string;
  backdrop_path: string;
  genre: string[];
  vote_average: number;
}

export async function continueConversation(history: Message[]) {
  ("use server");
  const stream = createStreamableValue();
  (async () => {
    const { textStream } = await streamText({
      model: google("models/gemini-1.5-pro-latest"),
      system: "You are a friendly assistant!",
      messages: history,
    });
    for await (const text of textStream) {
      stream.update(text);
    }
    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}
