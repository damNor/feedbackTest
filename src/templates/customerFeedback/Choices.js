import React from "react";
import {
  FormGroup,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  TextField,
} from "@material-ui/core";

class ShowChoices extends React.Component {
  constructor(props) {
    super(props);
    // const [textRating, setTextRating] = useState("");
    this.state = { textRating: "" };
  }
  setTextRating = (text) => {
    console.log("text", text);
    this.setState({ textRating: text });
  };

  handleClick = (event) => {
    console.log("event.target.dataset.id ", event.target.value);
    switch (event.target.value) {
      case "5":
        this.setTextRating("Excellent");
        break;
      case "4":
        this.setTextRating("Good");
        break;
      case "3":
        this.setTextRating("Fair");
        break;
      case "2":
        this.setTextRating("Poor");
        break;
      case "1":
        this.setTextRating("Very Poor");
        break;
    }
  };
  render() {
    console.log("textRating", this.state.textRating);
    return (
      <>
        <div
          className="textRating"
          style={{
            margin: "0px auto",
            width: "80%",
            border: "1px #ccc",
            height: "30px",
            backgroundColor: "#E7E7E7",
            textAlign: "center",
          }}
        >
          {" "}
          {this.state.textRating}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Excellent</div>
          <div className="emoticons">
            <RadioGroup
              row
              aria-label="position"
              name="rating[0]"
              defaultValue="top"
            >
              {this.props.choices.map(({ id, score }) => (
                <>
                  <FormControlLabel
                    value={score}
                    control={
                      <Radio color="primary" onClick={this.handleClick} />
                    }
                    label={score}
                    labelPlacement="bottom"
                  />
                </>
              ))}
            </RadioGroup>
          </div>
          <div>Very Poor</div>
        </div>
      </>
    );
  }
}

export default ShowChoices;
