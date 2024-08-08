import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-top p-24 bg-white gap-8">
      <div className="z-10 w-full font-mono text-sm flex flex-row items-center gap-4">
        <img
          src="/devvit.svg"
          alt="Logo"
          width={300}
          height={300}
          className="w-12 object-cover"
        />
        <h1 className="text-2xl">Devvit [0.1]</h1>
      </div>
      <div className="z-10 w-full font-mono text-sm flex flex-col gap-4">
        <p className="text-xl">Overview</p>
        <p>
          Devvit is a Next.js web application built with Drizzle ORM for
          database interactions. It aims to create a developer-centric community
          platform similar to Reddit, offering features like code sharing,
          project collaboration, technical Q&A, and job postings and workshop
          events.
        </p>
      </div>
      <div className="z-10 w-full font-mono text-sm flex flex-col gap-4">
        <p className="text-xl">Suggested Tech Stack</p>
        <ul className="list-disc list-inside">
          <li>Next.js: React framework for building web applications.</li>
          <li>Drizzle ORM: Type-safe ORM for interacting with databases.</li>
          <li>
            Supabase: Database for storing user data, posts, comments, etc.
          </li>
          <li>NextAuth.js: For user authentication and authorization </li>
        </ul>
      </div>
      <div className="z-10 w-full font-mono text-sm flex flex-col gap-4">
        <p className="text-xl">To Do List</p>
        <ul className="list-image-[url('/check.svg')] list-inside">
          <li>Init Setup</li>
          <li>Setup Auth</li>
          <li>Feed UI</li>
          <li>Setup Database</li>
          <li>Feed Data</li>
        </ul>
      </div>
      <div className="z-10 w-full font-mono text-sm flex flex-col gap-4">
        <p className="text-xl">Contributors</p>
        <p>Contributions are welcome! Please open an issue or pull request.</p>
        <Link href="#" type="button">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled
          >
            View On Github
          </button>{" "}
          <em className="text-xs inline -mt-2 text-red-500 ">Coming Soon!</em>
        </Link>
      </div>
      <div className="z-10 w-full font-mono text-sm flex flex-col gap-4"></div>
    </main>
  );
}
