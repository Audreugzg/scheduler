
export function getAppointmentsForDay(state, day) {
  const result = [];
  let aptNumArr = [];
  

  state.days.forEach((data) => {
    if (day === data.name) {
      aptNumArr = data.appointments;
    }
  });

  aptNumArr.forEach((apt) => {
    if (state.appointments[apt]) {
      result.push(state.appointments[apt]);
    }
  });

  return result;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  interview = { ...interview, interviewer: state.interviewers[interview.interviewer]};
  

  return interview;
}

