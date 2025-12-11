// === Section: Date Utilities ===
// ES6 Arrow Functions

export const getCurrentDate = () => {
  // Test etmek için burayı değiştirebilirsiniz:
  // return new Date("2025-12-15");
  return new Date();
};

export const canOpenBox = (dayNumber) => {
  const today = getCurrentDate();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11 (Aralık 11, Ocak 0)
  const currentDay = today.getDate();

  // 2025 Aralık ayı (11) kontrolü
  if (currentYear === 2025 && currentMonth === 11) {
    return dayNumber <= currentDay;
  }

  // 2026 Ocak ayı (0) ise tüm Aralık kutuları (1-31) ve 1 Ocak (32. kutu) açılabilir
  if (currentYear === 2026 && currentMonth === 0) {
    return true;
  }

  // Yılın diğer zamanları (Test harici kapalıdır)
  return false;
};

export const getLockedMessage = (dayNumber) => {
  // "Henüz ... tarihinde değiliz" mesajını dinamik üret
  const targetMonth = dayNumber === 32 ? "Ocak" : "Aralık";
  const targetDay = dayNumber === 32 ? 1 : dayNumber;
  return `Henüz ${targetDay} ${targetMonth} tarihinde değiliz. Günü gelince her şey ortaya çıkacak, merak etme!`;
};
