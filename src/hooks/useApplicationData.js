import React, { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // calls to server
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  // function to update state when updating spots remaining
  const updateSpots = (day, days, appointments) => {
    const dayIndex = days.findIndex((d) => d.name === day);
    const dayObj = days[dayIndex];
    const appointmentIDs = dayObj.appointments;
    let spots = 0;
    for (const id of appointmentIDs) {
      let appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    let newDayObj = { ...dayObj, spots };
    let newDaysArray = [...days];
    newDaysArray[dayIndex] = newDayObj;
    return newDaysArray;
  };

  // function to update state when booking an interview
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`api/appointments/${id}`, appointment).then(() => {
      let newDays = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days: newDays });
    });
  };

  // function to update state when cancelling an interview
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      appointment.interview = null;
      let newDays = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days: newDays });
    });
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
