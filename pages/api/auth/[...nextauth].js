import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Credentials({
      name: "Custom Provider",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Lösenord", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const user = await res.json();
          user.id = user.id;
          console.log(user);

          if (res.status === 200) {
            return user;
          }
        } catch (e) {
          const errorMessage = e.response.data.message;
          throw new Error(errorMessage + "&email=" + credentials.email);
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/auth/error",
    signOut: "/",
  },
  callbacks: {
    // Getting the JWT token from API response
    async jwt(token, user) {
      if (user?.token) {
        token.accessToken = user.token;
      }
      return Promise.resolve(token);
    },

    async session(session, token) {
      session.accessToken = token.accessToken;
      session.sub = token.sub;

      return Promise.resolve(session);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
