
import React, { useState } from 'react';

interface LockScreenProps {
  pin: string;
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ pin, onUnlock }) => {
  const [entry, setEntry] = useState('');
  const [error, setError] = useState(false);
  const length = pin.length;

  const handleNumClick = (n: number) => {
    setError(false);
    if (entry.length < length) {
      const next = entry + n;
      setEntry(next);
      if (next.length === length) {
        if (next === pin) {
          setTimeout(onUnlock, 150);
        } else {
          setTimeout(() => {
            setError(true);
            setEntry('');
          }, 200);
        }
      }
    }
  };

  const handleBackspace = () => {
    setEntry(entry.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-8 animate-fadeIn transition-colors duration-500">
      <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-200 animate-bounce"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
      <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">App Locked</h2>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-12">Think Easy Academy</p>

      <div className={`flex justify-center space-x-5 mb-16 ${error ? 'animate-shake' : ''}`}>
        {Array.from({ length }).map((_, i) => (
          <div key={i} className={`w-5 h-5 rounded-full border-4 transition-all duration-300 ${entry[i] ? 'bg-blue-600 border-blue-600 scale-125 shadow-lg' : 'border-slate-100 dark:border-slate-800 shadow-inner'}`}></div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8 w-full max-w-[280px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
          <button key={n} onClick={() => handleNumClick(n)} className="w-16 h-16 rounded-full text-2xl font-black text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-all shadow-sm">{n}</button>
        ))}
        <div className="w-16 h-16"></div>
        <button onClick={() => handleNumClick(0)} className="w-16 h-16 rounded-full text-2xl font-black text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-all shadow-sm">0</button>
        <button onClick={handleBackspace} className="w-16 h-16 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 active:scale-90 transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m18 8-4 4 4 4"/><path d="M14 12h8"/></svg></button>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
};

export default LockScreen;
