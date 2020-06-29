import React from "react";

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'

// import "@fullcalendar/core/main.css"
// import "@fullcalendar/daygrid/main.css"
// import "@fullcalendar/timegrid/main.css"

function CalendarView() {
  const events = [{ title: "today's event", date: new Date() }]

  return (
    <div className="App">
        <FullCalendar
        initialView="timeGridWeek"
        headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
        }}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        // events={events}
        />
    </div>
  );
}

export default CalendarView