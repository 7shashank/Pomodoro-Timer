import React from 'react';
// const button_click = new Audio('/button_click.wav');

function Button(props) {
  console.log(props);
  return (
    <button onClick={props.onClickFunc}>{props.buttonText}</button>
  )
}

export default Button;