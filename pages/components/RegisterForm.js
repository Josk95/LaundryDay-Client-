import React, { useRef } from "react";
import { signin, signIn, signout, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";

const RegisterForm = (props) => {
  const lghInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();

  function submitHandler(event) {
    event.preventDefault();

    const enteredLgh = lghInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const userData = {
      appartmentNumber: enteredLgh,
      email: enteredEmail,
      password: enteredPassword,
    };

    props.onAddUser(userData);
    router.push("/signin");
  }

  return (
    <form
      class="bg-grey-lighter max-h-screen flex flex-col"
      onSubmit={submitHandler}
    >
      <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-5">
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">Registrera</h1>
          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Lägenhetsnummer"
            required
            ref={lghInputRef}
          />

          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            required
            ref={emailInputRef}
          />

          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Lösenord"
            required
            ref={passwordInputRef}
          />
          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Bekräfta Lösenord"
            required
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white"
          >
            Skapa Konto
          </button>

          <div class="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              class="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              class="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div class="text-grey-dark mt-6">
          <p>Har du redan ett konto?</p>
          <a
            className="no-underline border-b border-blue text-blue-800 cursor-pointer"
            onClick={signIn}
          >
            Logga in här!
          </a>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
