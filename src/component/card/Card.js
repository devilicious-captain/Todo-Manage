import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./Card.css";

export default function OutlinedCard(props) {
  // const [Business, setBusiness] = useState(false);
  // const [Personal, setPersonal] = useState(false);
  // const [Learning, setLearning] = useState(false);
  const handleChange = () => {
    props.selectedCard(props.heading);
  };
  return (
    <Card
      className="card-root"
      variant="outlined"
      value={props.heading}
      onClick={handleChange}
    >
      <CardContent>
        <Typography className="card-title" color="textSecondary" gutterBottom>
          {props.number} Tasks
        </Typography>
        <Typography variant="h5" component="h2" className="card-heading">
          {props.heading}
        </Typography>
        <div className="progress">
          <progress
            value={60}
            max={100}
            min={0}
            strokeWidth={10}
            className="progress"
            style={{ height: "15px", backgroundColor: "#3263d5" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
