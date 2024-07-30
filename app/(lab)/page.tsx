import { Suspense } from "react";
import Loading from "./loading";

export default function Lab() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col justify-center items-center h-screen bg-white">
          <h1 className="py-8 -my-8 text-xs font-extrabold tracking-tight lg:text-xs bg-clip-text text-transparent bg-gradient-to-br from-emerald-600 to-emerald-900 absolute top-2 left-2">
            SLM Creatives Lab
          </h1>
          <div className="flex flex-col text-center gap-4 text-gray-600">
            <a href="/lab/chatbot" className="hover:text-slate-300">
              Gemini Chatbot
            </a>
            <a href="/lab/minder" className="hover:text-slate-300">
              Movie Search
            </a>
            <a href="/lab/mfhror" className="hover:text-slate-300">
              mfhror.com
            </a>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
