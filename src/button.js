import React from 'react';

function Button(props) {
  const playSound = () => {
    const button_click = new Audio('/button_click.mp3');
    button_click.volume = 0.65;
    button_click.play();
  }
  // console.log(button_click);
  return (
    <button onClick={()=>{playSound(); props.onClickFunc();}}>{props.buttonText}</button>
  )
}

export default Button;