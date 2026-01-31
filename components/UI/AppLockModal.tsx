
import React, { useState } from 'react';

interface AppLockModalProps {
  onClose: () => void;
  onSave: (pin: string) => void;
}

const AppLockModal: React.FC<AppLockModalProps> = ({ onClose, onSave }) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(1);
  const [length, setLength] = useState<4 | 6>(4);
  const [error, setError] = useState('');

  const handleNumClick = (n: number) => {
    setError('');
    const current = step === 1 ? pin : confirmPin;
    if (current.length < length) {
      if (step === 1) setPin(pin + n);
      else setConfirmPin(confirmPin + n);
    }
  };

  const handleBackspace = () => {
    if (step === 1) setPin(pin.slice(0, -1));
    else setConfirmPin(confirmPin.slice(0, -1));
  };

  const handleNext = () => {
    if (step === 1) {
      if (pin.length < length) setError(`Please enter a ${length}-digit PIN`);
      else setStep(2);
    } else {
      if (confirmPin === pin) {
        onSave(pin);
      } else {
        setError("PINs don't match");
        setConfirmPin('');
      }
    }
  };

  const isComplete = (step === 1 ? pin.length : confirmPin.length) === length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fadeIn">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[3rem] shadow-xl relative animate-slideIn transition-colors overflow-hidden">
        <div className="p-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-[1.5rem] flex items-center justify-center mb-6 border border-blue-100/50 dark:border-blue-800/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">
            {step === 1 ? 'Set App PIN' : 'Confirm App PIN'}
          </h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em] mb-8 opacity-60">
            Step {step} of 2
          </p>

          {step === 1 && (
            <div className="flex space-x-4 mb-8">
              {[4, 6].map(l => (
                <button 
                  key={l}
                  onClick={() => { setLength(l as 4 | 6); setPin(''); }}
                  className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${length === l ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}
                >
                  {l} Digits
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-center space-x-4 mb-6">
            {Array.from({ length }).map((_, i) => {
              const val = step === 1 ? pin[i] : confirmPin[i];
              return (
                <div key={i} className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${val ? 'bg-blue-600 border-blue-600 scale-110' : 'border-slate-200 dark:border-slate-700'}`}></div>
              );
            })}
          </div>

          <div className="h-4 mb-8">
            {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">{error}</p>}
          </div>

          <div className="grid grid-cols-3 gap-6 w-full max-w-[240px] mb-10">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
              <button key={n} onClick={() => handleNumClick(n)} className="w-14 h-14 rounded-full text-xl font-black text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-all">{n}</button>
            ))}
            <div className="w-14 h-14"></div>
            <button onClick={() => handleNumClick(0)} className="w-14 h-14 rounded-full text-xl font-black text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-all">0</button>
            <button onClick={handleBackspace} className="w-14 h-14 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 active:scale-90 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m18 8-4 4 4 4"/><path d="M14 12h8"/></svg>
            </button>
          </div>

          <div className="flex w-full gap-4">
             <button 
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest rounded-2xl text-[10px] hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button 
              disabled={!isComplete}
              onClick={handleNext}
              className={`flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all ${!isComplete ? 'opacity-30 cursor-not-allowed shadow-none' : ''}`}
            >
              {step === 1 ? 'Next Step' : 'Save & Confirm PIN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLockModal;
