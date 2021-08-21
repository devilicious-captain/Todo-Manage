import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./Todo.css";
import { HiOutlinePlusCircle } from "react-icons/hi";
import Task from "../task/Task";
import items from "../task-jsx/Business";
import per from "../task-jsx/Personal";
import learn from "../task-jsx/Learning";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
    display: "flex",
    // width: "50%",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Todo(props) {
  // const [changeCard, setChangeCard] = useState({});
  // console.log("changeCard", changeCard);
  // useEffect(() => {}, [changeCard]);
  const classes = useStyles();
  const addTask = () => {
    console.log("Addition of task");
    if (props.selected === "Business") {
      items.push(add);
    } else if (props.selected === "Personal") {
      per.push(add);
    } else {
      learn.push(add);
    }
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };
  const [add, setAdd] = useState({
    date: "",
    task: "",
    type: "Todo",
  });
  return (
    <Card className="todo">
      <CardContent>
        <span className="heading">{props.heading}</span>
        <div className="underline" />
        {props.selected === "Business"
          ? items.map((item) => {
              return item.type === props.type ? (
                <Task
                  type={props.type}
                  item={item}
                  // selectedCard={(card) => setChangeCard(card)}
                  tempCallback={() => props.tempCallback()}
                />
              ) : null;
            })
          : props.selected === "Personal"
          ? per.map((item) => {
              return item.type === props.type ? (
                <Task
                  type={props.type}
                  item={item}
                  tempCallback={() => props.tempCallback()}
                />
              ) : null;
            })
          : props.selected === "Learning"
          ? learn.map((item) => {
              return item.type === props.type ? (
                <Task
                  type={props.type}
                  item={item}
                  tempCallback={() => props.tempCallback()}
                />
              ) : null;
            })
          : null}
      </CardContent>
      <div className="add-on">
        {props.type === "Todo" ? (
          <div className="add">
            <IconButton color="primary" aria-label="add note" onClick={addTask}>
              <HiOutlinePlusCircle />
            </IconButton>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h2>Add a New Task</h2>
                  <TextField
                    required
                    label="New Task"
                    variant="outlined"
                    value={add.task}
                    onChange={(e) =>
                      setAdd((pre) => ({ ...pre, task: e.target.value }))
                    }
                    style={{ margin: "10px", width: "500px" }}
                  />
                  <TextField
                    required
                    type="date"
                    value={add.date}
                    onChange={(e) =>
                      setAdd((pre) => ({ ...pre, date: e.target.value }))
                    }
                    variant="outlined"
                    style={{ margin: "10px", width: "200px" }}
                  />
                  <Button variant="contained" color="primary" onClick={addTask}>
                    Add Task
                  </Button>
                </div>
              </Fade>
            </Modal>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

export default Todo;
