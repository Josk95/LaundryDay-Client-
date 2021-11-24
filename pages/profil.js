import { requestJson } from "@fullcalendar/common";
import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/client";
import React from "react";
import Header from "./components/Header";
import Bookings from "./components/Bookings";

export default function Profil(props) {
  const [user, setUser] = useState([""]);
  const [bookings, setBookings] = useState([""]);
  const [session] = useSession();

  const data = [
    {
      date: "2021-09-30",
      dateBooked: "2021/09/9",
      endTime: "08:00",
      id: 9,
      isCheckedOut: false,
      startTime: "07:00",
      status: true,
      userId: 2,
    },
    {
      date: "2021-10-07",
      dateBooked: "2021/10/10",
      endTime: "08:00",
      id: 14,
      isCheckedOut: false,
      startTime: "07:00",
      status: true,
      userId: 1,
    },
    {
      date: "2021-09-30",
      dateBooked: "2021/09/9",
      endTime: "08:00",
      id: 1,
      isCheckedOut: false,
      startTime: "07:00",
      status: true,
      userId: 2,
    },
  ];

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      setUser(content);
    })();
  }, [session]);

  useEffect(() => {
    fetch("http://localhost:8000/api/bookings", {
      headers: { "Content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBookings(data);
        console.log(data);
      });
  }, []);

  if (!session)
    return (
      <div>
        <Header />
        <p>Du är inte inloggad</p>
        <div></div>
      </div>
    );

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      <div className="px-5 my-10 sm:grid md:grid-cols-2 xl:flex">
        <card className="flex bg-yellow-500 rounded-md m-5">
          <div className="w-full mx-2 text-xl p-2 space-x-2">
            <h1 className="text-center mt-2">Uppgifter</h1>
            <p>Lägenhetsnummer: {user.name}</p>
            <p>Email: {user.email}</p>
            <button className="bg-red-700 rounded-lg text-gray-300 text-sm w-20 h-10 m-5">
              Redigera
            </button>
          </div>
        </card>
        <div className="">
          <h1 className="text-center text-white text-xl">Bokningar</h1>
          {data.map((result) => (
            <Bookings key={result.id} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
