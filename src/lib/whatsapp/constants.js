export const WHATSAPP_CONTACTS = {
  ezequiel: {
    number: '+5491136366599',
    message: 'Hola, tengo un negocio de iluminación y me gustaría conocer sus productos y condiciones comerciales'
  },
  tomas: {
    number: '+5491162926392',
    message: 'Hola, soy cliente de GSG y necesito ayuda con mi pedido'
  }
};

export const WHATSAPP_API_URL = 'https://wa.me';

export function getWhatsAppLink(number, message) {
  return `${WHATSAPP_API_URL}/${number}?text=${encodeURIComponent(message)}`;
}
