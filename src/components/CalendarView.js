import React from "react";
import { connect } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from '../event-utils'
// import styled from 'styled-components'

// const Styles = styled.div `
//   .fc-toolbar {
//   }
// `

class CalendarView extends React.Component {

  parseEvents = (jobs) => {
    // debugger
    let eventColor
    return jobs.map(job => {
      if (!job.caregiver_id) {
        eventColor = 'red'
      } else if (job.status === 'complete') {
        eventColor = '#33ccff'
      } else eventColor = '#90EE90'
      return {
        title: job.title,
        start: job.start_date_YYYYMMDD,
        end: job.end_date_YYYYMMDD,
        startTime: job.start_time_HHMM,
        endTime: job.end_time_HHMM,
        backgroundColor: eventColor,
        url: `/jobs/${job.id}`
      }
    }) 
  }

  render() {
    return (
      // <Styles>
        <FullCalendar
          height={'93%'}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='timeGridWeek'
          // editable={true}
          //   selectable={true}
          //   selectMirror={true}
          dayMaxEvents={true}
          initialEvents={this.parseEvents(this.props.jobs)} // alternatively, use the `events` setting to fetch from a feed
          select={this.handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={this.handleEventClick}
          // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      // </Styles>
    )
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    clickInfo.jsEvent.preventDefault();
    if (clickInfo.event.url) {
      // window.open(clickInfo.event.url, 'Job details', 'resizable,height=860,width=970');
      window.location.replace(clickInfo.event.url);
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function mapStateToProps(state) {
  return {
    jobs: state.jobReducer.userJobs
  }
}

export default connect(mapStateToProps)(CalendarView)