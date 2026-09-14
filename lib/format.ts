export function rupiah(n: number) {
  return `Rp${new Intl.NumberFormat("id-ID").format(n)}`;
}

/** Hitung status buka berdasarkan jam WIB (UTC+7). */
export function getOpenStatus(now = new Date()): {
  open: boolean;
  label: string;
  closesAt: string;
} {
  // Konversi ke WIB
  const wib = new Date(now.getTime() + (7 * 60 + now.getTimezoneOffset()) * 60000);
  const day = wib.getDay(); // 0 Min ... 6 Sab
  const hour = wib.getHours() + wib.getMinutes() / 60;
  const closesAt = "22.00";
  // Senin–Sabtu 09.00–22.00, Minggu tutup
  const open = day !== 0 && hour >= 9 && hour < 22;
  return {
    open,
    closesAt,
    label: open
      ? `Buka · tutup ${closesAt} WIB`
      : day === 0
        ? "Tutup · buka Senin 09.00 WIB"
        : "Tutup · buka 09.00 WIB",
  };
}
