
import React from 'react';
import { ViewType } from '../../types';

interface HeaderProps {
  activeView: ViewType;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, darkMode, onToggleDarkMode, onSearchClick }) => {
  const titles = {
    [ViewType.TIMELINE]: 'Timeline',
    [ViewType.BOARD]: 'Board',
    [ViewType.UNPLANNED]: 'Unplanned',
    [ViewType.WORKSPACE]: 'Workspace'
  };

  return (
    <header className="px-6 py-5 flex items-center justify-between bg-white dark:bg-slate-900 z-10 sticky top-0 border-b dark:border-slate-800 transition-colors duration-300">
      <div className="flex flex-col">
        <h1 className="text-[22px] font-black text-slate-800 dark:text-white leading-none tracking-tight">Think Easy Academy</h1>
        <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-1.5 opacity-90">Think Easy, Life Easy</p>
      </div>
      
      <div className="flex space-x-1 items-center">
        <button 
          onClick={(e) => {
            e.preventDefault();
            onToggleDarkMode();
          }}
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all text-slate-600 dark:text-slate-400 active:scale-90"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          )}
        </button>
        <button 
          onClick={onSearchClick}
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all text-slate-600 dark:text-slate-400 active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
