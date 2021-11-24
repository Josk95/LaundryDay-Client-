import React, { useEffect } from "react";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interaction from "@fullcalendar/interaction";
import { useSession } from "next-auth/client";
import { getSession } from "next-auth/client";
import { useState } from "react";
import BookConfirm from "./TimeSlot";
import { useRouter } from "next/router";
import TimeSlot from "./TimeSlot";

const CalendarView = ({ events }) => {
  const [session] = useSession();
  const [eventClickPop, setEventClickPop] = useState(false);
  const [eventItems, setEventItems] = useState([]);
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const router = useRouter();

  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  useEffect(() => {
    setEventItems(events);
  }),
    [];

  const currentDate = new Date();
  let endDate = new Date();
  endDate = endDate.setMonth(currentDate.getMonth() + 1);

  function togglePopConfirm(info) {
    let eventId = info.event.id;
    let currentUser = session.sub;

    setEventClickPop(true);
    let date = info.event.endStr.substring(0, 10);
    let startTime = info.event.startStr.substring(11, 16);
    let endTime = info.event.endStr.substring(11, 16);
    setDate(date);
    setStartTime(startTime);
    setEndTime(endTime);

    setStart(info.event.start);
    setEnd(info.event.end);
    console.log(start);
  }

  function bookTimeSlot(start, end) {
    setEventClickPop(false);
    const bookingData = {
      start: start,
      end: end,
    };

    console.log(bookingData);

    fetch("http://localhost:8000/api/book", {
      method: "POST",
      body: JSON.stringify(bookingData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    router.reload(window.location.pathname);
  }

  function closePop() {
    setEventClickPop(false);
    setDate("");
    setStart("");
    setEnd("");
  }

  return (
    <div className="w-3/4 max-w-full m-auto">
      <Calendar
        plugins={[interaction, timeGridPlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        allDaySlot={false}
        locale="sv"
        weekNumbers={true}
        weekText="V"
        fixedWeekCount={false}
        firstDay={1}
        nowIndicator={true}
        allDaySlot={false}
        scrollTime="07:00:00"
        selectable={true}
        selectMirror={true}
        eventClick={togglePopConfirm}
        navLinks={true}
        selectOverlap={false}
        selectConstraint="businessHours"
        unselectAuto={true}
        hiddenDays={[0]}
        displayEventTime={false}
        headerToolbar={{
          start: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          end: "today prev,next",
        }}
        buttonText={{
          today: "Idag",
          month: "Månad",
          week: "Vecka",
          day: "Dag",
          list: "Lista",
        }}
        businessHours={[
          {
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: "07:00:00",
            endTime: "20:00:00",
          },
          {
            daysOfWeek: [6],
            startTime: "08:00:00",
            endTime: "16:00:00",
          },
        ]}
        events={eventItems}
        selectLongPressDelay="100"
        aspectRatio={1}
        validRange={{
          start: currentDate,
          end: endDate,
        }}
      />
      {eventClickPop ? (
        <TimeSlot
          title="Bokning"
          submit={bookTimeSlot}
          toggle={togglePopConfirm}
          cancel={closePop}
          date={date}
          startTime={startTime}
          endTime={endTime}
        />
      ) : null}
    </div>
  );
};

export default CalendarView;

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
