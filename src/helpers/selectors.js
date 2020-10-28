export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((day) => {
    return day.name === day;
  });
}
