import React from "react";

const SideBar = (props) => {
  return (
    <div id="dynamic-info">
        <h3 id="info-title">{props.title}</h3>
        <p id="info-description">{props.description}</p>
    </div>
  );
};

export default SideBar;
