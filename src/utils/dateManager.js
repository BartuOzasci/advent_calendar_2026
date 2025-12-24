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

  // 31 Aralık (31) ve 1 Ocak (32) hariç
  if (dayNumber === 31 || dayNumber === 32) {
    return false;
  }
  // Sadece gün geldiğinde açılabilir
  if (currentMonth === 11 && currentYear === 2025) {
    return dayNumber <= currentDay;
  }
  // Diğer zamanlarda açılmasın
  return false;
};

export const getLockedMessage = (dayNumber) => {
  // "Henüz ... tarihinde değiliz" mesajını dinamik üret
  const targetMonth = dayNumber === 32 ? "Ocak" : "Aralık";
  const targetDay = dayNumber === 32 ? 1 : dayNumber;
  return `Henüz ${targetDay} ${targetMonth} tarihinde değiliz. Günü gelince her şey ortaya çıkacak, merak etme!`;
};
