import React, { useState } from "react";
import Collapse from "@kunukn/react-collapse";
import Down from "./Down";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox } from "@material-ui/core";
import Icons from "./Icons";



/* 
const [checked, setChecked] = useState(true);
const handleChange = (event) => {
    setChecked(event.target.checked);
}; 
*/


const Block = ({ isOpen, title, onToggle, children, template }) => {
  return (
    <div className="block">
      <button className="btn toggle" onClick={onToggle}>
        <span style={{ width: "80%" }}>{title}</span>
        <Icons templateID={template} />
        <Down isOpen={isOpen} />
      </button>

      <Collapse layoutEffect isOpen={isOpen}>
        {children}
      </Collapse>
    </div>
  );
};
export default Block;
