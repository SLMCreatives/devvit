"use client";

import { useState } from "react";
import { Message, continueConversation } from "../../action";
import { readStreamableValue } from "ai/rsc";
import { Input } from "Sulaiman/S/components/ui/input";
import { Button } from "Sulaiman/S/components/ui/button";
import Form from "Sulaiman/app/form/page";
import { Textarea } from "Sulaiman/S/components/ui/textarea";
import { ThemeToggle } from "../../_components/ThemeToggle";
// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";

export default function Chatbot() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <main className="bg-slate-50 min-w-0 flex">
      <ThemeToggle />
      <div className=" p-6 justify-center bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-50">
        <h1 className="text-4xl ">Gemini Chatbot</h1>
      </div>
      <div className="w-[2px] dark:bg-slate-600 bg-gray-200"></div>
      <div className="flex flex-col h-screen w-full bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-50 px-10">
        <div className="lg:p-4 p-2 py-12 overflow-y-auto scrollbar-thumb-slate-400 scrollbar-thin">
          {conversation.length === 0 ? (
            <em className="opacity-50">Ask me anything...</em>
          ) : null}
          {conversation.map((message, index) => (
            <div key={index} className="grid grid-cols-6 gap-3 p-1">
              <p className="capitalize text-right">{message.role}:</p>
              <code className="text-md col-span-5 pl-3">{message.content}</code>
            </div>
          ))}
        </div>
        <div className="flex flex-col p-4 w-full gap-4 justify-center sticky bottom-2 ">
          <Textarea
            name="message"
            id="message"
            rows={5}
            placeholder="Type something..."
            className="border rounded-lg p-3 bg-slate-100 text-slate-800 dark:bg-slate-600 dark:text-slate-200"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.preventDefault(), ChatbotReq()();
            }}
          />
          <Button
            className=" text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            onClick={ChatbotReq()}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Send"}
          </Button>
        </div>
      </div>
    </main>
  );

  function ChatbotReq() {
    return async () => {
      const { messages, newMessage } = await continueConversation([
        ...conversation,
        { role: "user", content: input },
      ]);
      let textContent = "";
      for await (const text of readStreamableValue(newMessage)) {
        textContent = `${textContent}${text}`;
        setConversation([
          ...messages,
          { role: "assistant", content: textContent },
        ]);
        setInput("");
      }
    };
  }
}
