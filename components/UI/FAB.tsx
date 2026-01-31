
import React, { useState } from 'react';

interface FABProps {
  onAddTask: () => void;
  onAddNote: () => void;
  onAddBigNote: () => void;
}

const FAB: React.FC<FABProps> = ({ onAddTask, onAddNote, onAddBigNote }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { label: 'Big Note', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M9 2v3"/><path d="M15 2v3"/><rect width="18" height="13" x="3" y="7" rx="2"/><path d="m3 12 18 0"/></svg>, onClick: () => { onAddBigNote(); setIsOpen(false); } },
    { label: 'Quick Note', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>, onClick: () => { onAddNote(); setIsOpen(false); } },
    { label: 'Task', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, onClick: () => { onAddTask(); setIsOpen(false); } }
  ];

  return (
    <div className="fixed bottom-24 right-6 max-w-md mx-auto z-50 pointer-events-none">
      <div className="flex flex-col items-end space-y-4 pointer-events-auto">
        {isOpen && actions.map((action, idx) => (
          <div 
            key={idx} 
            className="flex items-center space-x-3 animate-slideIn"
            style={{ animationDelay: `${(actions.length - 1 - idx) * 0.05}s` }}
          >
            <span className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-md text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-100 dark:border-slate-700">
              {action.label}
            </span>
            <button 
              onClick={action.onClick}
              className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-xl border border-slate-100 dark:border-slate-700 active:scale-90 transition-transform"
            >
              {action.icon}
            </button>
          </div>
        ))}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-90 ${
            isOpen ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rotate-45' : 'bg-[#D1E1FA] dark:bg-blue-600 text-blue-600 dark:text-white'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm -z-10 pointer-events-auto transition-all"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FAB;
