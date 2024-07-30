"use client";
import React, { useState, useEffect } from "react";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "dotenv/config";
import Header from "../_components/Header";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const apiKey = "AIzaSyDnQevxvnpRUMFuLT4A7OkNQ-RrP7LSpbw";

const GroceryListGenerator: React.FC = () => {
  const [recipeText, setRecipeText] = useState("");
  const [groceryList, setGroceryList] = useState("" || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [platform, setPlatform] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleLinkChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRecipeText(event.target.value);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(event.target.value);
  };

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlatform(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);

      async function run() {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });

        const prompt = `
        Generate a caption for this 
        image: ${imageURL}
        platform: ${platform}
        addition info: ${recipeText}
        `;

        const result = await model.generateContent(prompt);

        const response = await result.response;
        const ingredients = response.text;
        // const data = appSON.parse(ingredients);
        setGroceryList(ingredients);
        console.log(result.response.text);
      }
      run();
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="bg-white px-4">
      <Header />

      <div className="flex-row justify-center items-center bg-white min-h-screen">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-400 to-teal-800 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center text-balance">
              <h1 className="py-8 -my-8 text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-violet-500 sm:text-6xl">
                AI Caption Generator
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Generate caption from image uploaded.
              </p>
              {/* Prompt Section */}

              <section className="hero flex-row gap-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <label htmlFor="recipeText"></label>
                  <textarea
                    id="recipeText"
                    value={recipeText}
                    onChange={handleLinkChange}
                    required
                    className="border border-gray-300 rounded-xl p-2"
                    placeholder="Write down any particular things you want to have in your story."
                  />
                  <hr />
                  <label htmlFor="imageUpload"></label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    value={imageURL}
                    onChange={handleImageChange}
                  />
                  <hr />
                  <label htmlFor="Platform"></label>
                  <input
                    id="platform"
                    value={platform}
                    onChange={handlePlatformChange}
                    className="border border-gray-300 rounded-xl p-2"
                    placeholder="Platform (e.g. Facebook)"
                  />

                  <button
                    type="submit"
                    className="py-2 px-4 mt-4 bg-emerald-500 text-white rounded-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? "Generating..." : "Generate Story"}
                  </button>
                </form>
                {error && <p className="error">{error}</p>}
              </section>

              {/* Display the generated grocery list */}
            </div>
            {groceryList.length === 0 && <p></p>}
            <section className="flex-row gap-4 mt-10">
              <div className="border border-gray-300 p-8 mt-4 rounded-xl">
                <p>Caption for:</p>
                <img src={imageURL} alt="uploaded image" />
                <p className="text-xl">{groceryList}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GroceryListGenerator;
