import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const EDIT = "EDIT";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // props.bookInterview(props.id, interview);
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  function deleteInterview(id) {
    transition(SAVING);
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    });
  }

  function confirm() {
    transition(DELETING);
  }

  function editInterview(id) {
    transition(EDIT);
  }




  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={confirm}
          onEdit={() => editInterview(props.id)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status />}
      {mode === DELETING && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={() => deleteInterview(props.id)}
          onCancel={() => transition(SHOW)}
        />
      )}

      {mode === EDIT && (
        <Form
          bookInterview={props.bookInterview}
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => back()}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}

    </article>
  );
};

