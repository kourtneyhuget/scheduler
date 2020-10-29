export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((dayObj) => dayObj.name === day);

  const apptArray = [];

  if (state.appointments && filteredDays) {
    filteredDays.appointments.forEach((appId) =>
      apptArray.push(state.appointments[appId])
    );
  }
  return apptArray;
}
