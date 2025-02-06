'use client';
import './footerStyle.css';
import DynamicForm from '../form/DynamicForm';
import { useState } from 'react';
const formFields = [
  {
    name: 'email',
    type: 'email',
    label: '',
    validation: {
      required: 'El correo electrónico es obligatorio.',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Por favor, introduce un correo electrónico válido.',
      },
    },
  },
];
const FooterM = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (data) => {
    // const serviceId = import.meta.env.VITE_SERVICE_ID
    // const templateId = import.meta.env.VITE_TEMPLATE_ID
    // const publicKey = import.meta.env.VITE_PUBLIC_KEY

    setIsLoading(true);
    // emailjs
    //   .send(serviceId, templateId, data, publicKey)
    //   .then(() => {
    //     setIsLoading(false)
    //     setIsSubmitted(true)
    //     reset()

    //     setTimeout(() => {
    //       setIsSubmitted(false)
    //     }, 10000)
    //   })
    //   .catch((error) => {
    //     setIsLoading(false)
    //     console.error('Error al enviar el email:', error)
    //   })
  };
  return (
    <footer className="container-footer">
      <section className="cont-h2-footer">
        <h2 className="h2-footer">Contáctate con nosotros</h2>
      </section>
      <div>
        <img
          src="\imagenes\logoBanner.png"
          alt="logo"
          className="img-logo-footer mb-4"
        />
        <h2 className="text-xl text-slate-600 mb-5">
          Dejanos tu correo y un representante se contaxtará
        </h2>

        <DynamicForm
          fields={formFields}
          onSubmit={handleSubmit}
          className="form-footer"
        />

        {isLoading && (
          <div className="loading-message">
            Enviando mensaje, aguarde unos instantes...
          </div>
        )}

        {isSubmitted && (
          <div className="success-message">
            Muchas gracias! Te enviaremos más info por el correo proporcionado.
          </div>
        )}
      </div>
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
