import "./index.scss";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { Counter } from "./components/Counter";
import { sayHello } from "./index.telefunc";
import { TechnologyCard } from "./components/TechnologyCard";

function Page() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const handleSayHello = async () => {
    setMessage("sending request ...");
    const msg = await sayHello();

    setMessage(`telefunc saild: "${msg}"`);
  };
  const haveSession = session && session.user;
  const renderSession = () => {
    if (haveSession)
      return (
        <div>
          Logged in as {session.user?.name}
          <button className="ml-4 btn" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      );

    return (
      <a className="btn" href="/api/auth/signin">
        Login
      </a>
    );
  };

  return (
    <div className="IndexPage">
      <main>
        <h1 className="header-text">
          <span className="">FullStack</span>
          <span className="">Web</span>
          <span className="">TS</span>
        </h1>
        <p className="text-2xl text-gray-500">This stack uses</p>
        <div className="technologies">
          <TechnologyCard
            name="Vite-SSR-Plugin"
            description="Like Next.js/Nuxt but as do-one-thing-do-it-well Vite plugin"
            documentation="https://vite-plugin-ssr.com/"
          >
            <div className="feat">
              <div className="features pt-4 flex gap-8">
                <h3>Reactivity:</h3>
                <Counter />
                <Counter start={10} />
                <Counter start={25} step={5} />
              </div>
            </div>
          </TechnologyCard>
          <TechnologyCard
            name="TypeScript"
            description="Strongly typed JavaScript, giving you better tooling at any scale"
            documentation="https://www.typescriptlang.org/"
          />
          <TechnologyCard
            name="TailwindCSS"
            description="Rapidly build modern websites without ever leaving your HTML"
            documentation="https://tailwindcss.com/"
          />
          <TechnologyCard
            name="Telefunc"
            description="Remote Functions. Instead of API."
            documentation="https://telefunc.com/"
          >
            <div className="feat">
              <div className="flex gap-4 items-center">
                <h2>Remote function: </h2>
                <button className="btn" onClick={handleSayHello}>
                  Say Hello
                </button>
                <div className="text-lg">{message}</div>
              </div>
            </div>
          </TechnologyCard>
          <TechnologyCard
            name="Prisma"
            documentation="https://www.prisma.io/"
            description="ORM that helps build faster and make fewer errors"
          />
          <TechnologyCard
            name="Next-Auth"
            documentation="https://next-auth.js.org/"
            description="Ease, flexible and secure authentication"
          >
            <div className="feat">
              <div className="flex items-center gap-4">
                <h2>Authentication</h2>
                {renderSession()}
              </div>
              <span className="p-1"></span>
              <div className="text-left w-full ">
                or try accessing this &nbsp;
                <a href="/protected" className="text-blue-400 underline">
                  Protected Page
                </a>
              </div>
            </div>
          </TechnologyCard>
        </div>
      </main>
      );
    </div>
  );
}

export { Page };
