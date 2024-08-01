import React from "react";
import "./footerStyle.css";

const FooterM = () => {
  return (
    <footer className="container-footer">
      <section className="cont-h2-footer">
        <h2 className="h2-footer">Contáctate</h2>
        <h2 className="h2-footer ml-10">con nosotros</h2>
      </section>
      <span className="linea"></span>
      <section className="cont-text-contact-footer">
        <div className="cont-text-otros">
          <h3>Otros canales de contacto</h3>
          <span></span> <p>@instagram</p>
          <span></span> <p>@facebook</p>
        </div>
        <div className="cont-text-otros oficinas">
          <h3>Nuestras oficinas</h3>
          <p>Direccion de oficina</p>
          <p>Direccion de oficina</p>
          <p>Direccion de oficina</p>
        </div>
      </section>
    </footer>
  );
};

export default FooterM;
