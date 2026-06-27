export const WHATSAPP_CONTACTS = {
  ezequiel: {
    number: '5491136366599',
    message: 'Hola, tengo un negocio de iluminación y me gustaría conocer sus productos y condiciones comerciales'
  },
  tomas: {
    number: '5491162926392',
    message: 'Hola, soy cliente de GSG y necesito ayuda con mi pedido'
  }
};

export function getWhatsAppLink(number, message) {
  const clean = number.replace(/\D/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
