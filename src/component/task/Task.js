import { Button, Card } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../todo/Todo.css";

function Task(props) {
  const [doing, setDoing] = useState(false);
  const [done, setDone] = useState(false);
  const changeOngoing = (e) => {
    // e.preventDefault();
    props.item.type = "doing";
    // props.selectedCard(props.item);
    props.tempCallback();
    setDoing(true);
  };
  const changeDone = (e) => {
    props.item.type = "done";
    // props.selectedCard(props.item);
    props.tempCallback();
    setDone(true);
  };
  useEffect(() => {}, [doing, done]);

  return (
    <Card className="task">
      <div className="task-head">
        <span className="date">{props.item.date}</span>
      </div>
      <h5 className="text">{props.item.task} </h5>
      <div className="Progress">
        {props.item.type === "Todo" ? (
          <Button
            variant="contained"
            color="primary"
            style={{ color: "azure" }}
            className="Ongoing"
            onClick={changeOngoing}
          >
            Ongoing
          </Button>
        ) : props.item.type === "doing" ? (
          <Button
            variant="contained"
            colr="primary"
            style={{ color: "azure", background: "#052a72" }}
            className="Done-task"
            onClick={changeDone}
          >
            Done
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

export default Task;
