import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Lightbulb } from 'lucide-react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLessonTitle?: string;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  currentLessonTitle = 'DC Circuit Analysis',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: `Hello! I am your ElectroLearn 3D Personal BEEE Professor. Ask me anything about electricity, circuit laws, formulas, or numerical problems. I can explain in simple English or Hinglish!`,
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    'Explain Ohm\'s Law with an easy analogy',
    'Why are home appliances connected in parallel?',
    'What is the difference between KCL and KVL?',
    'How do I calculate total series resistance?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Socratic Rule-Based BEEE Professor Engine
    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = '';

      if (q.includes('ohm') || q.includes('v = ir')) {
        reply = `**Professor's Analogy:** Think of Ohm's Law (V = IR) as water in a pipe:\n\n• **Voltage (V):** The water pump pushing water with pressure.\n• **Current (I):** The volume of water flowing per second.\n• **Resistance (R):** The narrowness of the pipe squeezing the water.\n\n*Key Exam Tip:* If you double voltage, current doubles. If you double resistance, current halves!`;
      } else if (q.includes('parallel') || q.includes('home') || q.includes('appliances')) {
        reply = `**Why parallel for home appliances?**\n\n1. **Independent Control:** If your TV is turned off, the refrigerator keeps running.\n2. **Equal Voltage:** Every appliance receives the full 230 V mains voltage.\n3. **Safety & Redundancy:** If one bulb burns out, no other bulb goes dark!`;
      } else if (q.includes('kcl') || q.includes('kvl') || q.includes('kirchhoff')) {
        reply = `**KCL vs KVL Memory Trick:**\n\n• **KCL (Current Law):** Nodes/Junctions. "What goes in must come out." Based on **Conservation of Charge** (Σ I = 0).\n• **KVL (Voltage Law):** Loops. "A closed hike starts and ends at sea level." Based on **Conservation of Energy** (Σ V = 0).`;
      } else if (q.includes('series')) {
        reply = `**Series Circuits Rule:**\n\n• **Current is IDENTICAL** through every single resistor (only one path).\n• **Equivalent Resistance adds up:** Req = R1 + R2 + R3.\n• **Voltages divide:** Total V = V1 + V2 + V3. The largest resistor takes the biggest voltage drop!`;
      } else if (q.includes('hinglish') || q.includes('hindi')) {
        reply = `Bilkul! Voltage ek electrical pressure ya dhakka hai jo battery se milta hai. Current matlab electrons ka bahaav, aur Resistance matlab taar me aane wali rukawat. Jab circuit band (closed) hota hai, tabhi current behta hai!`;
      } else {
        reply = `That is a great electrical engineering question! In BEEE, always look at the fundamental governing formula first:\n\n1. What quantities are given?\n2. Which law connects them (Ohm's Law V=IR, Power P=VI, KCL, or KVL)?\n3. Check your units: convert mA to A (divide by 1000) and minutes to seconds!\n\nWould you like me to solve a worked numerical on this?`;
      }

      const aiMsg: ChatMessage = {
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-xl rounded-3xl border border-amber-200 bg-white shadow-2xl flex flex-col h-[560px] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Tutor Header */}
        <div className="flex items-center justify-between border-b border-stone-100 bg-[#fbf9f4] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600 text-white shadow-xs">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-stone-900">BEEE Socratic Professor</h3>
                <span className="rounded-full bg-emerald-100 px-2 py-0.2 text-[10px] font-bold text-emerald-800">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-stone-500">Current Lesson: {currentLessonTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fdfcf9]">
          {messages.map((m, idx) => {
            const isAi = m.sender === 'ai';
            return (
              <div key={idx} className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}>
                {isAi && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 text-xs font-bold mt-1">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                    isAi
                      ? 'border border-amber-100 bg-white text-stone-800'
                      : 'bg-amber-600 text-white font-medium'
                  }`}
                >
                  <div className="whitespace-pre-line">{m.text}</div>
                  <div className={`mt-1 text-[10px] ${isAi ? 'text-stone-400' : 'text-amber-200'}`}>
                    {m.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Prompts Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-t border-stone-100 bg-[#fbf9f4] px-4 py-2 scrollbar-none">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="shrink-0 rounded-full border border-amber-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-stone-700 hover:bg-amber-50 hover:border-amber-300 transition-all"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="border-t border-stone-200 bg-white p-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask a question about BEEE, formulas, or concepts..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:bg-white focus:outline-hidden"
          />
          <button
            onClick={() => handleSend()}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-xs"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
