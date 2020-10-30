export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((dayObj) => dayObj.name === day);
  console.log(filteredDays);
  const apptArray = [];

  if (state.appointments && filteredDays) {
    console.log(state.appointments);
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
  const filteredDays = state.days.find((dayObj) => dayObj.name === day);
  const intArray = [];

  if (state.interviewersAvailable && filteredDays) {
    const intervierwersAvail = state.interviewersAvailable[day];
    intervierwersAvail.interviewers.forEach((intId) => {
      intArray.push(state.interviewers[intId]);
    });
  }
  return intArray;
}
