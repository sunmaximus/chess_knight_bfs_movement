import React from 'react';

const ButtonGroup = ({ shortestPath, reset, containerClass, buttonClass }) => {
  return (
    <div className={containerClass}>
      <button className={buttonClass} onClick={shortestPath}>
        Shortest Path
      </button>
      <button className={buttonClass} onClick={reset}>
        Reset
      </button>
  </div>
  );
}

export default ButtonGroup;