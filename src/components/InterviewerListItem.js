import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

const props = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

export default function InterviewerListItem(props) {
  let interviewerClass = classNames('interviewers__item',{'interviewers__item--selected' : props.selected});
  const showName = function () {
    if (props.selected) {
      return (`${props.name}`);

      
    }
    
    return ("");


    
  }

  

  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      {showName()}
    </li>

  );
}