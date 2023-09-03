import React from "react";
import "./msg4host.scss";

// this component can take two props: message and addClassname which lets you customize the text that will be rendered or to add a additional class to the component
const Msg4Host = ({ message, addClassname }) => {
  return (
    <div className={`msg_4_host ${addClassname}`}>
      <h2>{message}</h2>
    </div>
  );
};

export default Msg4Host;
