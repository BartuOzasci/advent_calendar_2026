import React from "react";

const DayBox = ({ day, isOpen, onClick }) => {
  return (
    <div
      className={`day-box ${isOpen ? "open" : "locked"}`}
      onClick={() => onClick(day)}
    >
      <div className="day-box-inner">
        {/* Ön Yüz */}
        <div className="day-box-front">
          <h2>{day === 32 ? "1" : day}</h2>
          <small>{day === 32 ? "OCAK" : "ARALIK"}</small>
          {day === 32 && <span>🎉</span>}
        </div>

        {/* Arka Yüz (Mesaj) */}
        <div className="day-box-back">
          <p>{isOpen ? "Mesaj Yükleniyor..." : "Kilitli"}</p>
          {/* İçerik App.js'den prop olarak da gelebilir ama basitlik için burada */}
        </div>
      </div>
    </div>
  );
};

export default DayBox;
