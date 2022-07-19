import { useState, useEffect } from "react";
import {changeSpots} from "helpers/selectors"
import axios from "axios";

export default function useApplicationData(props){
  function bookInterview(id, interview) {
    console.log(id, interview);

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        // setState({ ...state, appointments });
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        const newDays = changeSpots(state,state.day,true);
        const index = (newDays[0].index);
        const spots = newDays[0].spots;
        const day = {
          ...state.days[index],
          spots: spots,
        };
        let newDay = [...state.days]
        newDay[index] = day;
        const days = [...newDay];

        // console.log("days",days);
        // days = Object.values(days);
        
        setState({ ...state, appointments,days});
        // console.log(state);
      })
  }

  function cancelInterview(id) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
        const newState = { ...state };
        const newDays = changeSpots(state,state.day,false);
        console.log(newDays);
        newState.days[newDays[0].index].spots = newDays[0].spots;
        newState.appointments[id].interview = null;
        console.log(newState);
        setState(newState);
      })
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      console.log(all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, [])

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  return { state, setState, setDay, bookInterview, cancelInterview };
}
  