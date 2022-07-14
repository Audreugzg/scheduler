import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment (props) {
  

  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      ) : (
        <Empty />
      )}
  
    </article>
  );
};

