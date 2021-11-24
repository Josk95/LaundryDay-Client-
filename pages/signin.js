import React from "react";
import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import Header from "./components/Header";

export default function SignIn({ providers, csrfToken }) {
  return (
    <div>
      <Header />
      <form
        class="bg-grey-lighter max-h-screen h-screen flex flex-col bg-gray-600"
        method="post"
        action="/api/auth/callback/credentials"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div class="container max-w-sm my-10 mx-auto flex flex-col items-center justify-center">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl text-center">Logga in</h1>

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              required
            />

            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Lösenord"
              required
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white"
            >
              Logga in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

SignIn.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await providers(context),
    csrfToken: await csrfToken(context),
  };
};
