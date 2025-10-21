import React from 'react';

import './boton.css';

const ButtonL = ({ children }) => {
  const handleClickPath = () => {
    window.open(
      'https://drive.google.com/file/d/1-5Pz9clY2-odo61hT5UDpTiUfy_kmrDg/view?usp=sharing',
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
