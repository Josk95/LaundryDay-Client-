import React from "react";

import Header from "./components/Header.js";
import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { useSession } from "next-auth/client";
import { getSession } from "next-auth/client";
import { signIn } from "next-auth/client";

export default function Home() {
  const [loadedTimeSlots, setLoadedTimeSlots] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, loading] = useSession();

  const history = useHistory();

  if (!session) {
    return (
      <div className="bg-blue-500 min-h-screen">
        <Header />
        <div className="flex w-3/4 mt-5 h-24 bg-blue-200 justify-center items-center m-auto rounded sm:w-1/2 max-h-64 min-h-full">
          <a
            className="no-underline border-b border-blue text-blue-800 cursor-pointer"
            onClick={signIn}
          >
            Logga in här!
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <head>
        <title>Laundry Day</title>
      </head>
      <Header />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  return { props: { session } };
}
