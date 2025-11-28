import React from "react";
import "./style.css";

function Card(props) {
  return (
    <div className="card" {...props}>
      <div className="cardHeader">
        {props.headerleft && <div>{props.headerleft}</div>}
        {props.headerright && props.headerright}
      </div>
      {props.children}
    </div>
  );
}

export default Card;
