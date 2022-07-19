
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

export function getInterviewersForDay(state, day) {
  let interviewerNumArr = [];
  const interviewersForDay = [];

  state.days.forEach((data) => {
    if (day === data.name) {
      interviewerNumArr = data.interviewers;
    }
  });

  interviewerNumArr.forEach((interviewer) => {
    if (state.appointments[interviewer]) {
      interviewersForDay.push(state.interviewers[interviewer]); 
    }
  });

  return interviewersForDay;
}

export function changeSpots(state,day,flag) {

  const newDays = [];

  for (const i of state.days) {
    if (i.name === day && flag === true) {
      newDays.push({index: i.id-1, spots: i.spots-1})
    }
    if (i.name === day && flag === false) {
      newDays.push({index: i.id-1, spots: i.spots+1})
    } 
  }
  return newDays;
};

