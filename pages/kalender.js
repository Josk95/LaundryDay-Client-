import React from "react";
import dynamic from "next/dynamic";
import Header from "./components/Header.js";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getSession, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { getDay, getMonth } from "date-fns";

const Calendars = dynamic(() => import("./components/CalendarView.js"), {
  ssr: false,
});

export default function Kalender() {
  const [loadedTimeSlots, setLoadedTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [session] = useSession();
  const [currentStatus, setCurrentStatus] = useState();
  const router = useRouter();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(false);

    const currentDate = new Date();
    let endDate = new Date();
    endDate = endDate.setMonth(currentDate.getMonth() + 1);

    const date = new Date().toISOString().split("T")[0];
    let timeslot = [];
    let timeslots = [];
    const uuidv4 = require("uuid/v4");

    //Loopa igenom idag till en månad fram
    for (
      let currentDate = new Date();
      currentDate < endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      if (currentDate.getDay() == 6) {
        timeslot = {
          id: currentDate.getDate() * 10,
          userId: null,
          title: "Ledig",
          allDay: false,
          start: currentDate.toISOString().split("T")[0] + "T08:00",
          end: currentDate.toISOString().split("T")[0] + "T16:00",
        };
        timeslots.push(timeslot);
      } else {
        timeslot = {
          id: currentDate.getDate() * 11,
          userId: 1,
          title: "1302B",
          allDay: false,
          start: currentDate.toISOString().split("T")[0] + "T07:00",
          end: currentDate.toISOString().split("T")[0] + "T14:00",
          color: "red",
        };
        timeslots.push(timeslot);

        timeslot = {
          id: currentDate.getDate() * 12,
          userId: null,
          title: "Ledig",
          allDay: false,
          start: currentDate.toISOString().split("T")[0] + "T14:00",
          end: currentDate.toISOString().split("T")[0] + "T16:00",
        };
        timeslots.push(timeslot);

        timeslot = {
          id: currentDate.getDate() * 13,
          userId: null,
          title: "Ledig",
          allDay: false,
          start: currentDate.toISOString().split("T")[0] + "T16:00",
          end: currentDate.toISOString().split("T")[0] + "T20:00",
        };
        timeslots.push(timeslot);
      }
    }

    setLoadedTimeSlots(timeslots);
    console.log(timeslots);
    setIsLoading(false);

    /*
        for (const key in data) {
          let timeslot = [];
          let title = "Laundry";
          let textColor = "white";
          let backgroundColor = "green";

          /*Skapa två dateTime objekt och jämför om dagens Datetime objekt är inom intervallet.*/
    /*
          let startTime = data[key].startTime;
          let endTime = data[key].endTime;
          let time = `${startTime}:${endTime}`;

          let t1 = new Date();
          var h = Date.parse(data[key].startTime.substring(0, 3));
          t1.setHours(h);
          console.log(t1.getHours());

          if (data[key].userId !== 0 && data[key].userId == session.sub) {
            title = data[key].startTime + " - " + data[key].endTime;
            textColor = "black";
            backgroundColor = "green";

            timeslot = {
              id: data[key].userId,
              title: title,
              allDay: false,
              start: data[key].date + "T" + data[key].startTime + ":00",
              end: data[key].date + "T" + data[key].endTime + ":00",
              textColor: textColor,
              backgroundColor: backgroundColor,
            };
          } else if (data[key].userId !== 0) {
            title = "Bokad - " + data[key].startTime + ":" + data[key].endTime;
            textColor = "blue";
            backgroundColor = "red";

            timeslot = {
              id: data[key].userId,
              title: title,
              allDay: false,
              start: data[key].date + "T" + data[key].startTime + ":00",
              end: data[key].date + "T" + data[key].endTime + ":00",
              textColor: textColor,
              backgroundColor: backgroundColor,
            };
          }
          timeslots.push(timeslot);
        }
*/
  }, []);

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
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <Calendars events={loadedTimeSlots} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  return { props: { session } };
}
