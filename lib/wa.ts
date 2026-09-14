export const WHATSAPP_NUMBER = "6281234567890"; // TODO: ganti dengan nomor WA Dadwish

export function waLink(message: string, number = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}


