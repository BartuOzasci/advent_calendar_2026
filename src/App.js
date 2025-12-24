import React, { useState, useEffect } from "react";
import "./css/style.css";
import { messages } from "./data/messages";
import { canOpenBox, getLockedMessage } from "./utils/dateManager";
import Confetti from "react-confetti";
import useWindowSize from "./hooks/useWindowSize";

const App = () => {
  // Window boyutları için hook
  const { width, height } = useWindowSize();

  // State Tanımları - localStorage'dan başlangıç değeri al
  const [openedBoxes, setOpenedBoxes] = useState(() => {
    const saved = localStorage.getItem("adventCalendarOpenedBoxes");
    // 31 ve 32 hariç tüm kutuları otomatik aç
    const autoOpen = Array.from({ length: 32 }, (_, i) => i + 1).filter(
      (d) => d !== 31 && d !== 32
    );
    return saved ? JSON.parse(saved) : autoOpen;
  });
    const [showSurprise, setShowSurprise] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // openedBoxes değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem(
      "adventCalendarOpenedBoxes",
      JSON.stringify(openedBoxes)
    );
  }, [openedBoxes]);

  // Sayfa açılınca konfetiler ve sürpriz mesajı göster
  useEffect(() => {
    setShowConfetti(true);
    setShowSurprise(true);
    // Bartu seni çok seviyor busişko mesajı 4 saniye gösterilsin
    const confettiTimeout = setTimeout(() => setShowConfetti(false), 4000);
    const surpriseTimeout = setTimeout(() => setShowSurprise(false), 4000);
    return () => {
      clearTimeout(confettiTimeout);
      clearTimeout(surpriseTimeout);
    };
  }, []);

  // Kutu Tıklama Olayı
  const handleBoxClick = (day) => {
    // Zaten açıksa işlem yapma
    if (openedBoxes.includes(day)) return;

    // Tarih Kontrolü
    if (canOpenBox(day)) {
      // State'i güncelle (ES6 Spread Operator)
      setOpenedBoxes((prev) => [...prev, day]);

      // Özel günlerde (25 Aralık - Noel veya 1 Ocak - Yılbaşı) confetti göster
      if (day === 25 || day === 32) {
        setShowConfetti(true);
        // 5 saniye sonra confetti'yi kapat
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } else {
      // Uyarı Göster
      triggerToast(getLockedMessage(day));
    }
  };

  // Toast Bildirimi Yönetimi
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    // 3 saniye sonra kapat
    setTimeout(() => setShowToast(false), 3000);
  };

  // 1'den 32'ye kadar sayıları içeren dizi oluştur (Array.from yüksek performanslıdır)
  const daysArray = Array.from({ length: 32 }, (_, i) => i + 1);

  return (
    <div className="container py-5">
      {/* Confetti Efekti */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={800}
          recycle={false}
        />
      )}

      {/* Bartu'nun Sürprizi */}
      {showSurprise && (
        <div
          style={{
            position: "fixed",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255,255,255,0.95)",
            color: "#c0392b",
            fontSize: "2.2rem",
            fontWeight: "bold",
            borderRadius: "20px",
            padding: "40px 60px",
            zIndex: 2000,
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            textAlign: "center",
            border: "3px solid #c0392b"
          }}>
          <span style={{ fontSize: "2.2rem" }}>Bartu seni çok seviyor busişko! 💖</span>
        </div>
      )}

      <header className="text-center mb-5">
        <h1>🎄Buse'nin Yılbaşı Advent Takvimi 🎄</h1>
        <p className="lead text-light">Her gün yeni bir sürpriz!</p>
      </header>

      {/* Uyarı Bildirimi (Toast) */}
      <div className={`toast-custom ${showToast ? "show" : ""}`}>
        {toastMessage}
      </div>

      {/* Takvim Izgarası */}
      <div className="calendar-grid">
        {daysArray.map((day) => {
          const isOpen = openedBoxes.includes(day);
          const isLocked = !canOpenBox(day);
          return (
            <div
              key={day}
              className={`day-box ${isOpen ? "open" : isLocked ? "locked" : ""}`}
              onClick={isLocked ? undefined : () => handleBoxClick(day)}
              style={isLocked ? { cursor: "not-allowed", pointerEvents: "auto", opacity: 0.6 } : {}}
            >
              <div className="day-box-inner">
                {/* Ön Yüz */}
                <div className="day-box-front">
                  <h2>{day === 32 ? "1" : day}</h2>
                  <small>{day === 32 ? "OCAK" : "ARALIK"}</small>
                  {day === 25 && <span>🎅</span>}
                  {day === 32 && <span>🎉</span>}
                </div>

                {/* Arka Yüz */}
                <div className="day-box-back">
                  {isOpen
                    ? messages[day - 1]
                    : isLocked
                    ? getLockedMessage(day)
                    : "Kilitli"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
