
import React, { useState, useEffect } from 'react';

interface TimePickerProps {
  initialTime: string; // HH:mm
  onSelect: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ initialTime, onSelect }) => {
  const [h, m] = initialTime.split(':').map(Number);
  const [hour, setHour] = useState(h % 12 || 12);
  const [minute, setMinute] = useState(m);
  const [isPm, setIsPm] = useState(h >= 12);
  const [mode, setMode] = useState<'hour' | 'minute'>('hour');

  const updateTime = (newHour: number, newMin: number, newIsPm: boolean) => {
    let adjustedH = newHour % 12;
    if (newIsPm) adjustedH += 12;
    const timeStr = `${adjustedH.toString().padStart(2, '0')}:${newMin.toString().padStart(2, '0')}`;
    onSelect(timeStr);
  };

  const handleHourClick = (val: number) => {
    setHour(val);
    setMode('minute');
    updateTime(val, minute, isPm);
  };

  const handleMinuteClick = (val: number) => {
    setMinute(val);
    updateTime(hour, val, isPm);
  };

  const toggleAmPm = () => {
    const nextIsPm = !isPm;
    setIsPm(nextIsPm);
    updateTime(hour, minute, nextIsPm);
  };

  const hourPositions = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutePositions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  return (
    <div className="flex flex-col items-center bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-inner border dark:border-slate-700 animate-fadeIn">
      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={() => setMode('hour')}
          className={`text-3xl font-bold p-2 rounded-xl transition-all ${mode === 'hour' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-slate-400'}`}
        >
          {hour.toString().padStart(2, '0')}
        </button>
        <span className="text-3xl font-bold text-slate-300">:</span>
        <button 
          onClick={() => setMode('minute')}
          className={`text-3xl font-bold p-2 rounded-xl transition-all ${mode === 'minute' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-slate-400'}`}
        >
          {minute.toString().padStart(2, '0')}
        </button>
        <button 
          onClick={toggleAmPm}
          className="bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-xl text-xs font-black text-slate-600 dark:text-slate-300"
        >
          {isPm ? 'PM' : 'AM'}
        </button>
      </div>

      <div className="relative w-48 h-48 rounded-full border-4 border-slate-100 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-900/50">
        <div className="absolute w-1.5 h-1.5 bg-blue-600 rounded-full z-10"></div>
        {/* Hand */}
        <div 
          className="absolute w-0.5 bg-blue-600 origin-bottom rounded-full transition-all duration-300"
          style={{ 
            height: '40%', 
            bottom: '50%', 
            transform: `rotate(${mode === 'hour' ? (hour * 30) : (minute * 6)}deg)` 
          }}
        >
           <div className="absolute top-0 -left-1.5 w-4 h-4 bg-blue-600 rounded-full border-2 border-white dark:border-slate-800"></div>
        </div>

        {mode === 'hour' ? hourPositions.map(h => {
          const angle = (h * 30) - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 70 * Math.cos(rad);
          const y = 70 * Math.sin(rad);
          return (
            <button
              key={h}
              onClick={() => handleHourClick(h)}
              className={`absolute w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center ${hour === h ? 'bg-blue-600 text-white shadow-lg z-20 scale-125' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {h}
            </button>
          );
        }) : minutePositions.map(m => {
          const angle = (m * 6) - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 70 * Math.cos(rad);
          const y = 70 * Math.sin(rad);
          return (
            <button
              key={m}
              onClick={() => handleMinuteClick(m)}
              className={`absolute w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center ${minute === m ? 'bg-blue-600 text-white shadow-lg z-20 scale-125' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {m.toString().padStart(2, '0')}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimePicker;
