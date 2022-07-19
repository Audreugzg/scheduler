import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_CREATE = "ERROR_CREATE";
const CONFIRMING = "CONFIRMING";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    // if (name === "" || interviewer === null) {
    //   // console.log("in here");
    //   transition(SAVING);
    //   return transition(ERROR_CREATE, true);
    // }
    const interview = {
      student: name,
      interviewer
    };
    // props.bookInterview(props.id, interview);
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteInterview(id) {
    // transition(SAVING);
    // props.cancelInterview(props.id).then(() => {
    //   transition(EMPTY);
    // });
    transition(DELETING, true);
    props
      .cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  }

  function confirm() {
    // transition(DELETING);
    transition(CONFIRMING);
  }

  function editInterview() {
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
      {mode === SAVING && <Status message="saving" />}
      {mode === DELETING && (
        // <Confirm
        //   message="Are you sure you would like to delete?"
        //   onConfirm={() => deleteInterview(props.id)}
        //   onCancel={() => transition(SHOW)}
        // />
        <Status message="deleting" />
      )}
      {mode === CONFIRMING && (
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

      {mode === ERROR_SAVE && (
        <Error
          message={"Something went wrong on creation"}
          onClose={() => {
            back(2);
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Something went wrong on deletion"}
          onClose={() => {
            back(2);
          }}
        />
      )}

      {mode === ERROR_CREATE && (
        <Error
          message={"Both name and interviewer filed need to be filled up"}
          onClose={() => {
            back(1);
          }}
        />
      )}

    </article>
  );
};

