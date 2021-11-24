import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./components/Header";
import RegisterForm from "./components/RegisterForm";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";

const registrera = () => {
  const history = useHistory();
  const router = useRouter();

  function addUserHandler(userData) {
    fetch("http://localhost:8000/api/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <div className="bg-blue-100">
      <Header />
      <div>
        <div>
          <RegisterForm onAddUser={addUserHandler} />
        </div>
      </div>
    </div>
  );
};

export default registrera;
