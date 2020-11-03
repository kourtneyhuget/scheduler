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

export function getInterview(state, interview) {
  const interviewerObj = state.interviewers;
  const result = {};

  if (!interview) {
    return null;
  }

  const interviewId = interview.interviewer;

  for (let key in interviewerObj) {
    if (key == interviewId) {
      result["student"] = interview.student;
      result["interviewer"] = interviewerObj[key];
      return result;
    }
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((dayObj) => dayObj.name === day);
  const intArray = [];

  if (filteredDays) {
    for (let intAvail of filteredDays) {
      const interviewers = intAvail.interviewers;
      for (let interviewer of interviewers) {
        intArray.push(state.interviewers[interviewer]);
      }
    }
  }
  return intArray;
}
