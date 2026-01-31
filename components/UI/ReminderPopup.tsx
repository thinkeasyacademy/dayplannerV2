import React from 'react';
import { Task } from '../../types';

interface ReminderPopupProps {
  task: Task;
  onDismiss: () => void;
  onView: () => void;
}

const ReminderPopup: React.FC<ReminderPopupProps> = ({ task, onDismiss, onView }) => {
  const format12h = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, '0')} ${suffix}`;
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-8 animate-fadeIn">
      <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-md" onClick={onDismiss}></div>
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative animate-slideIn overflow-hidden border border-blue-100 dark:border-blue-900/30">
        
        <div className="h-2 bg-blue-600 w-full animate-pulse"></div>
        
        <div className="p-8 pt-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-blue-500/10 border border-blue-100 dark:border-blue-800 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
          </div>

          <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] mb-3">Reminder Now</p>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2 text-center leading-tight tracking-tight">
            {task.title}
          </h3>
          
          <div className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 text-[11px] font-black uppercase tracking-widest mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>{format12h(task.time || '10:00')}</span>
          </div>

          {task.details && (
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium text-center mb-10 px-4 line-clamp-3">
              {task.details}
            </p>
          )}

          <div className="flex w-full gap-4">
            <button 
              onClick={onDismiss}
              className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest rounded-2xl text-[10px] hover:bg-slate-200 transition-all active:scale-95"
            >
              Dismiss
            </button>
            <button 
              onClick={onView}
              className="flex-[1.5] py-5 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              View Task
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800">
           <div className="h-full bg-blue-600 animate-[progress_5s_linear_forwards]"></div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default ReminderPopup;