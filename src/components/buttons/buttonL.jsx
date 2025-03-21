import React from 'react';

import './boton.css';

const ButtonL = ({ children }) => {
  const handleClickPath = () => {
    window.open(
      'https://drive.google.com/file/d/1ViF6k6ELRX2prO8exf62kzgL_jjgUoFR/view?usp=drive_link',
      '_blank',
    );
  };
  return (
    <button className="btn-descarga" onClick={handleClickPath}>
      {children}
    </button>
  );
};

export default ButtonL;
