import DesktopTimePicker from "@mui/lab/DesktopTimePicker";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import moment from "moment";

const TimePicker = ({ title, minTime, maxTime, startPick, endPick }) => {
  const [valueStart, setValueStart] = useState(new Date(0, 0, 0, 7, 0));
  const [valueEnd, setValueEnd] = useState(new Date(0, 0, 0, 8, 0));
  const [hourStartPick, setHourStartPick] = useState();
  const [timeChanged, setTimeChanged] = useState(false);

  const handleChangeStart = (newValue) => {
    setValueStart(newValue);
    setValueEnd(new Date(0, 0, 0, hourStartPick, 0));
    setTimeChanged(true);
  };

  const handleChangeEnd = (newValue) => {
    setValueEnd(newValue);
    setTimeChanged(true);
  };

  useEffect(() => {
    setTimeChanged(false);
    startPick(valueStart);
    endPick(valueEnd);
    var hour = parseInt(moment(valueStart).format("HH"));
    setHourStartPick(hour + 1);
  }, [timeChanged]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex flex-col space-y-7 pt-5">
        <MobileTimePicker
          ampm={false}
          label={title}
          ampmInClock={false}
          value={valueStart}
          minTime={new Date(0, 0, 0, minTime)}
          maxTime={new Date(0, 0, 0, maxTime)}
          onChange={handleChangeStart}
          renderInput={(params) => <TextField {...params} />}
          cancelText="Avbryt"
          disableCloseOnSelect={false}
        />
        <MobileTimePicker
          ampm={false}
          label="Välj slut tid"
          ampmInClock={false}
          value={valueEnd}
          minTime={new Date(0, 0, 0, hourStartPick)}
          maxTime={new Date(0, 0, 0, 20)}
          onChange={handleChangeEnd}
          renderInput={(params) => <TextField {...params} />}
          cancelText="Avbryt"
        />
      </div>
    </LocalizationProvider>
  );
};

export default TimePicker;
