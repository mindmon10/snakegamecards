import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const cards = [
  {
    question: "🍎 คำนี้แปลว่าอะไร?",
    pinyin: "píngguǒ",
    level: "ง่าย",
    choices: ["แอปเปิ้ล", "ส้ม", "กล้วย"],
    answer: "แอปเปิ้ล",
    explanation: "🍎 แอปเปิ้ล / píngguǒ"
  },
  {
    question: "🕐 นาฬิกาบอกเวลากี่โมง?",
    pinyin: "yī diǎn",
    level: "กลาง",
    choices: ["1 โมง", "2 โมง", "3 โมง"],
    answer: "1 โมง",
    explanation: "🕐 = 1 โมง / yī diǎn"
  },
  {
    question: "你叫什么名字？",
    pinyin: "Nǐ jiào shénme míngzi?",
    level: "กลาง",
    choices: null,
    answer: null,
    explanation: "คุณชื่ออะไร – เหล่าซือเป็นผู้ตัดสิน"
  },
  {
    question: "📅 วันจันทร์ ภาษาจีนคือ?",
    pinyin: "xīngqī yī",
    level: "ง่าย",
    choices: ["星期一", "星期二", "星期天"],
    answer: "星期一",
    explanation: "📅 Monday = xīngqī yī / 星期一"
  },
  {
    question: "🎂 คุณเกิดเดือนไหน?",
    pinyin: "Nǐ shì jǐ yuè shēngrì?",
    level: "กลาง",
    choices: null,
    answer: null,
    explanation: "คำถามเปิด – เหล่าซือตัดสิน"
  },
  {
    question: "🍚 คำนี้แปลว่าอะไร?",
    pinyin: "mǐfàn",
    level: "ง่าย",
    choices: ["ข้าวสวย", "ข้าวเหนียว", "ข้าวต้ม"],
    answer: "ข้าวสวย",
    explanation: "🍚 ข้าว / mǐfàn 米饭"
  },
  {
    question: "🚌 รถประจำทางภาษาจีนคือ?",
    pinyin: "gōnggòng qìchē",
    level: "ยาก",
    choices: ["公共汽车", "出租车", "火车"],
    answer: "公共汽车",
    explanation: "🚌 = gōnggòng qìchē / 公共汽车"
  },
  {
    question: "🧃 น้ำผลไม้ในภาษาจีนว่าอะไร?",
    pinyin: "guǒzhī",
    level: "กลาง",
    choices: ["果汁", "汽水", "牛奶"],
    answer: "果汁",
    explanation: "🧃 = น้ำผลไม้ / guǒzhī 果汁"
  },
  {
    question: "👋 สวัสดีตอนเช้าภาษาจีนคือ?",
    pinyin: "zǎoshàng hǎo",
    level: "ง่าย",
    choices: ["早上好", "晚上好", "你好"],
    answer: "早上好",
    explanation: "👋 Good morning = zǎoshàng hǎo / 早上好"
  },
  {
    question: "你今天几点起床？",
    pinyin: "Nǐ jīntiān jǐ diǎn qǐchuáng?",
    level: "กลาง",
    choices: null,
    answer: null,
    explanation: "คำถามเปิด – เหล่าซือเป็นผู้ตัดสิน"
  },
  {
    question: "🚗 รถยนต์ภาษาจีนคือ?",
    pinyin: "qìchē",
    level: "ง่าย",
    choices: ["汽车", "飞机", "轮船"],
    answer: "汽车",
    explanation: "🚗 qìchē = รถยนต์ / 汽车"
  },
  {
    question: "🧒 คุณมีพี่น้องไหม?",
    pinyin: "Nǐ yǒu xiōngdì jiěmèi ma?",
    level: "กลาง",
    choices: null,
    answer: null,
    explanation: "คำถามปลายเปิด – ให้เหล่าซือตัดสิน"
  },
  {
    question: "📖 อ่านหนังสือ ภาษาจีนคือ?",
    pinyin: "kàn shū",
    level: "ง่าย",
    choices: ["看书", "写书", "做书"],
    answer: "看书",
    explanation: "📖 = อ่านหนังสือ / 看书 kàn shū"
  },
  {
    question: "🛍️ คุณชอบซื้อของไหม?",
    pinyin: "Nǐ xǐhuān mǎi dōngxi ma?",
    level: "กลาง",
    choices: null,
    answer: null,
    explanation: "คำถามปลายเปิด – ให้เหล่าซือตัดสิน"
  },
  {
    question: "🌞 สภาพอากาศวันนี้เป็นยังไง?",
    pinyin: "Jīntiān tiānqì zěnmeyàng?",
    level: "กลาง",
    choices: null,
    answer: null,
    explanation: "คำถามปลายเปิด – ให้เหล่าซือตัดสิน"
  },
  {
    question: "💧 น้ำ ภาษาจีนคืออะไร?",
    pinyin: "shuǐ",
    level: "ง่าย",
    choices: ["水", "火", "风"],
    answer: "水",
    explanation: "💧 = น้ำ / shuǐ 水"
  },
  {
    question: "📺 คุณชอบดูทีวีไหม?",
    pinyin: "Nǐ xǐhuān kàn diànshì ma?",
    level: "กลาง",
    choices: null,
    answer: null,
    explanation: "คำถามปลายเปิด – ให้เหล่าซือตัดสิน"
  },
  {
    question: "🌈 สีรุ้งในภาษาจีนคือ?",
    pinyin: "cǎihóng",
    level: "ยาก",
    choices: ["彩虹", "下雨", "阳光"],
    answer: "彩虹",
    explanation: "🌈 cǎihóng = รุ้ง / 彩虹"
  },
  {
    question: "📞 คุณชอบโทรหาเพื่อนไหม?",
    pinyin: "Nǐ xǐhuān gěi péngyǒu dǎ diànhuà ma?",
    level: "ยาก",
    choices: null,
    answer: null,
    explanation: "คำถามปลายเปิด – ให้เหล่าซือตัดสิน"
  },
  {
    question: "🐼 คำว่าแพนด้า ภาษาจีนคือ?",
    pinyin: "xióngmāo",
    level: "ง่าย",
    choices: ["熊猫", "猫熊", "大猫"],
    answer: "熊猫",
    explanation: "🐼 xióngmāo = แพนด้า / 熊猫"
  },
  {
    question: "🔢 เลข 3 ภาษาจีนคือ?",
    pinyin: "sān",
    level: "ง่าย",
    choices: ["一", "三", "五"],
    answer: "三",
    explanation: "🔢 sān = เลขสาม / 三"
  },
  {
    question: "👨‍👩‍👧 พ่อแม่ในภาษาจีนรวมกันเรียกว่า?",
    pinyin: "fùmǔ",
    level: "กลาง",
    choices: ["父母", "家人", "爸妈"],
    answer: "父母",
    explanation: "👨‍👩‍👧 fùmǔ = พ่อแม่ / 父母"
  },
  {
    question: "💬 แนะนำตัวเป็นภาษาจีน (ชื่อ + อายุ)?",
    pinyin: "Zìwǒ jièshào",
    level: "กลาง",
    choices: null,
    answer: null,
    explanation: "คำถามปลายเปิด – ให้เหล่าซือตัดสิน"
  },
  {
    question: "🗓️ เดือนไหนมี 28 วัน?",
    pinyin: "jǐ yuè yǒu 28 tiān?",
    level: "กลาง",
    choices: ["กุมภาพันธ์", "ทุกเดือน", "มีนาคม"],
    answer: "ทุกเดือน",
    explanation: "ทุกเดือนมี 28 วัน (อย่างน้อย)"
  },
  {
    question: "🍌 กินกล้วย ใช้คำกริยาอะไร?",
    pinyin: "吃/喝/跳",
    level: "ง่าย",
    choices: ["吃", "喝", "跳"],
    answer: "吃",
    explanation: "吃香蕉 = กินกล้วย"
  },
  {
    question: "🧒 คุณอายุเท่าไหร่?",
    pinyin: "Nǐ jǐ suì?",
    level: "กลาง",
    choices: null,
    answer: null,
    explanation: "ตอบด้วยเลข + suì เช่น wǒ 12 suì"
  },
  {
    question: "🔴 สีแดงภาษาจีนคือ?",
    pinyin: "hóngsè",
    level: "ง่าย",
    choices: ["红色", "蓝色", "黄色"],
    answer: "红色",
    explanation: "🔴 hóngsè = สีแดง / 红色"
  },
  {
    question: "📆 วันนี้วันที่เท่าไหร่?",
    pinyin: "Jīntiān jǐ hào?",
    level: "กลาง",
    choices: null,
    answer: null,
    explanation: "ตอบแบบ: jīntiān shì 8 yuè 1 hào"
  },
  {
    question: "🍎 แอปเปิ้ลควรกินหรือดื่ม?",
    pinyin: "กินหรือดื่ม",
    level: "ง่าย",
    choices: ["กิน", "ดื่ม"],
    answer: "กิน",
    explanation: "กินแอปเปิ้ล ใช้ 吃 píngguǒ"
  },
  {
    question: "📚 วิชาที่คุณชอบเรียน?",
    pinyin: "Nǐ xǐhuān shénme kè?",
    level: "กลาง",
    choices: null,
    answer: null,
    explanation: "คำถามปลายเปิด – ให้เหล่าซือตัดสิน"
  },
  {
    question: "👚 สีม่วงในภาษาจีนคือ?",
    pinyin: "zǐsè",
    level: "ง่าย",
    choices: ["紫色", "粉色", "绿色"],
    answer: "紫色",
    explanation: "👚 zǐsè = สีม่วง / 紫色"
  },
  {
    question: "📈 เลขใดมากกว่า? (三 vs 八)",
    pinyin: "sān vs bā",
    level: "ง่าย",
    choices: ["三", "八"],
    answer: "八",
    explanation: "八 (bā) = 8 มากกว่า 三 (sān) = 3"
  },
  {
    question: "🎤 คุณพูดภาษาจีนได้ไหม?",
    pinyin: "Nǐ huì shuō Hànyǔ ma?",
    level: "กลาง",
    choices: null,
    answer: null,
    explanation: "คำถามปลายเปิด – ให้เหล่าซือตัดสิน"
  },
  {
    question: "👗 สีชมพูภาษาจีนคือ?",
    pinyin: "fěnsè",
    level: "ง่าย",
    choices: ["粉色", "红色", "橙色"],
    answer: "粉色",
    explanation: "👗 fěnsè = สีชมพู / 粉色"
  },
  {
    question: "👶 เด็กชาย ภาษาจีนคือ?",
    pinyin: "nánhái",
    level: "ง่าย",
    choices: ["男孩", "女孩", "宝宝"],
    answer: "男孩",
    explanation: "👶 เด็กชาย = nánhái / 男孩"
  },
  {
    question: "📅 เดือนมกราคม ภาษาจีนว่า?",
    pinyin: "yī yuè",
    level: "ง่าย",
    choices: ["一月", "二月", "十二月"],
    answer: "一月",
    explanation: "一月 = yī yuè = มกราคม"
  },
  {
    question: "🧊 น้ำแข็งภาษาจีนคือ?",
    pinyin: "bīng",
    level: "ง่าย",
    choices: ["冰", "水", "雪"],
    answer: "冰",
    explanation: "🧊 bīng = น้ำแข็ง / 冰"
  },
  {
    question: "🍞 ขนมปังใช้คำว่าอะไร?",
    pinyin: "miànbāo",
    level: "กลาง",
    choices: ["面包", "米饭", "包子"],
    answer: "面包",
    explanation: "🍞 miànbāo = ขนมปัง / 面包"
  },
  {
    question: "👩 คุณแม่ภาษาจีนคือ?",
    pinyin: "māmā",
    level: "ง่าย",
    choices: ["妈妈", "姐姐", "阿姨"],
    answer: "妈妈",
    explanation: "👩 māmā = แม่ / 妈妈"
  },
  {
    question: "🎓 คุณเรียนอยู่ชั้นอะไร?",
    pinyin: "Nǐ shàng jǐ niánjí?",
    level: "กลาง",
    choices: null,
    answer: null,
    explanation: "ตอบเช่น wǒ shàng sān niánjí (ป.3)"
  }
];

export default function CardSuggester() {
  const [currentCard, setCurrentCard] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [moveSteps, setMoveSteps] = useState(null);
  const [history, setHistory] = useState([]);

  const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setCurrentCard(cards[randomIndex]);
    setSelectedChoice(null);
    setUserAnswer("");
    setShowAnswer(false);
    setMoveSteps(null);
  };

  const randomMove = (level) => {
    if (level === "ยาก") return Math.floor(Math.random() * 8) + 5; // 5-12
    if (level === "กลาง") return Math.floor(Math.random() * 7) + 3; // 3-9
    return Math.floor(Math.random() * 4) + 1; // 1-4
  };

  const handleSubmit = () => {
    setShowAnswer(true);
    let steps = 0;
    if (currentCard.answer) {
      const correct = currentCard.choices
        ? selectedChoice === currentCard.answer
        : userAnswer.trim() === currentCard.answer;
      steps = correct ? randomMove(currentCard.level) : 1;
    } else {
      steps = Math.floor(Math.random() * 12) + 1;
    }
    setMoveSteps(steps);
    setHistory((prev) => [...prev, { question: currentCard.question, steps }]);
  };

  const DiceImage = ({ steps }) => (
    <Image
      src={`/dice/dice-${Math.min(steps, 6)}.png`}
      alt={`dice-${steps}`}
      width={60}
      height={60}
    />
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-gradient-to-b from-blue-100 to-purple-100">
      <Image src="/haoxue-logo.png" alt="logo" width={120} height={120} />
      <h1 className="text-3xl font-bold text-purple-700">🎲 เกมสุ่มการ์ดภาษาจีน (สนทนา + พินอิน)</h1>

      {currentCard && (
        <Card className="max-w-xl w-full shadow-xl border-purple-300 bg-white rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <p className="text-xl">❓ <strong>{currentCard.question}</strong></p>
            <p className="text-blue-600 italic">{currentCard.pinyin}</p>
            <p className="text-sm text-purple-700">ระดับ: <strong>{currentCard.level}</strong></p>

            {currentCard.choices ? (
              <RadioGroup onValueChange={setSelectedChoice} defaultValue={selectedChoice}>
                {currentCard.choices.map((choice, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={choice} id={`choice-${index}`} />
                    <Label htmlFor={`choice-${index}`}>{choice}</Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <Input
                type="text"
                placeholder="พิมพ์คำตอบของคุณ"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
            )}

            <Button onClick={handleSubmit} className="mt-4 bg-green-500 hover:bg-green-600 text-white">
              ตรวจคำตอบ
            </Button>

            {showAnswer && (
              <div className="mt-4 p-4 rounded-xl border bg-blue-50 border-blue-300">
                {moveSteps !== null && moveSteps > 0 ? (
                  <>
                    <p className="text-green-700 font-semibold">✅ เยี่ยมมาก! เดินไปได้ {moveSteps} ช่อง 🎉</p>
                    <DiceImage steps={moveSteps} />
                  </>
                ) : (
                  <p className="text-red-600">❌ ผิดจ้า เดินไม่ได้เลย 😢</p>
                )}
                <p className="text-sm text-gray-700 mt-2">💡 {currentCard.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Button onClick={drawCard} className="text-xl px-6 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-xl mt-8">
        สุ่มการ์ด
      </Button>

      {history.length > 0 && (
        <div className="w-full max-w-xl mt-8 p-4 bg-white rounded-xl shadow border border-purple-200">
          <h2 className="font-semibold text-purple-700 mb-2">📜 ประวัติการเดิน</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {history.map((h, index) => (
              <li key={index}>{h.question} ➜ เดิน {h.steps} ช่อง</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
