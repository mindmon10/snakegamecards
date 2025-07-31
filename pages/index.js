import React, { useState, useEffect } from 'react';

const cards = [
  { question: "🕒 现在几点了？", level: "ยาก", result: "ถูก: เดิน 9 ช่อง / ผิด: เดิน 1 ช่อง" },
  { question: "📅 今天星期几？", level: "ปานกลาง", result: "ถูก: เดิน 7 ช่อง / ผิด: เดิน 0 ช่อง" },
  { question: "👦 你叫什么名字？", level: "ง่าย", result: "ถูก: เดิน 6 ช่อง / ผิด: เดิน 1 ช่อง" },
  { question: "🎨 你在做什么？", level: "ง่าย", result: "ถูก: เดิน 8 ช่อง / ผิด: เดิน 1 ช่อง" },
  { question: "🍓 你喜欢草莓吗？", level: "ง่าย", result: "ถูก: เดิน 5 ช่อง / ผิด: เดิน 0 ช่อง" }
];

export default function Home() {
  const [currentCard, setCurrentCard] = useState(null);
  const [lineUser, setLineUser] = useState(null);

  const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setCurrentCard(cards[randomIndex]);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.liff) {
      window.liff.init({ liffId: "1651234567-abc123" })
        .then(() => {
          if (window.liff.isLoggedIn()) {
            return window.liff.getProfile();
          } else {
            window.liff.login();
          }
        })
        .then(profile => {
          if (profile) setLineUser(profile);
        })
        .catch(err => console.error("LIFF init error:", err));
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem' }}>🎲 การ์ดคำถามบันไดงู</h1>
      {lineUser && <p style={{ color: 'gray' }}>👤 {lineUser.displayName}</p>}
      <button onClick={drawCard} style={{ padding: '1rem 2rem', margin: '2rem', fontSize: '1.2rem' }}>
        สุ่มคำถาม
      </button>
      {currentCard && (
        <div style={{ border: '1px solid #ccc', padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.5rem' }}>{currentCard.question}</p>
          <p>ระดับความยาก: <strong>{currentCard.level}</strong></p>
          <p style={{ color: 'green' }}>{currentCard.result}</p>
        </div>
      )}
    </div>
  );
}