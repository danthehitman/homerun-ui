import React, { useState } from 'react';

function Button({onClick, increment}) {
  const counterClick = () => onClick(increment);
  return (
    <button onClick={counterClick}>
      {increment}
    </button>
  );
}

function Display(props) {
  return (
    <div>{props.message}</div>
  )
}

export {Button, Display};
