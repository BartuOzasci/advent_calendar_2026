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

  // 31 Aralık (31) ve 1 Ocak (32) sadece günü gelince açılır
  if (dayNumber === 31) {
    // 31 Aralık: 31 Aralık 2025
    return currentYear > 2025 || (currentYear === 2025 && currentMonth === 11 && currentDay >= 31);
  }
  if (dayNumber === 32) {
    // 1 Ocak: 1 Ocak 2026
    return currentYear > 2026 || (currentYear === 2026 && currentMonth === 0 && currentDay >= 1);
  }
  // Diğer tüm günler her zaman açık
  return true;
};

export const getLockedMessage = (dayNumber) => {
  // "Henüz ... tarihinde değiliz" mesajını dinamik üret
  const targetMonth = dayNumber === 32 ? "Ocak" : "Aralık";
  const targetDay = dayNumber === 32 ? 1 : dayNumber;
  return `Henüz ${targetDay} ${targetMonth} tarihinde değiliz. Günü gelince her şey ortaya çıkacak, merak etme!`;
};
