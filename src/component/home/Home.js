import React, { useState } from "react";
import Card from "../card/Card";
import Todo from "../todo/Todo";
import "./Home.css";

function Home() {
  const [selected, setSelected] = useState("Business");
  const [temp, setTemp] = useState(false);
  console.log(selected);
  return (
    <div className="home">
      <h1 className="intro">
        What's up, <span style={{ color: "#0f2467" }}>Buddy</span>
      </h1>
      <span
        style={{
          fontSize: "18px",
          color: "#0f2467",
          fontWeight: "600",
          padding: "15px",
        }}
      >
        Categories
      </span>
      <div className="stats-card">
        <div className="Business-card">
          <Card
            number="40"
            heading="Business"
            selectedCard={(card) => setSelected(card)}
          />
        </div>
        <div className="Personal-card">
          <Card
            number="30"
            heading="Personal"
            selectedCard={(card) => setSelected(card)}
          />
        </div>
        <div className="Learning-card">
          <Card
            number="20"
            heading="Learning"
            selectedCard={(card) => setSelected(card)}
          />
        </div>
      </div>
      <br /> {console.log(temp)}
      <>
        <h1 className="select-head">{selected}</h1>
        <div className="task-specification">
          <div className="To-do">
            <Todo
              heading="Todo "
              type="Todo"
              selected={selected}
              tempCallback={() => {
                console.log("Temp called !");
                setTemp(!temp);
              }}
            />
          </div>
          <div className="Doing">
            <Todo
              heading="Doing "
              type="doing"
              selected={selected}
              tempCallback={() => {
                setTemp(!temp);
              }}
            />
          </div>
          <div className="Done">
            <Todo
              heading="Done "
              type="done"
              selected={selected}
              tempCallback={() => setTemp(!temp)}
            />
          </div>
        </div>
      </>
      {/* ) : (
      <>
        {" "}
        <h1 className="select-head">Business</h1>
        <div className="task-specification">
          <div className="To-do">
            <Todo heading="Todo " type="Todo" selected="Business" />
          </div>
          <div className="Doing">
            <Todo heading="Doing " type="doing" selected="Business" />
          </div>
          <div className="Done">
            <Todo heading="Done " type="done" selected="Business" />
          </div>
        </div>
      </>
      )} */}
    </div>
  );
}

export default Home;
