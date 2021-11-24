import React from "react";
import "@fullcalendar/react";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "../styles/globals.css";

import { Provider } from "next-auth/client";

import "@fullcalendar/interaction";

function MyApp({ Component, pageProps, children }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
