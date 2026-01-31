
import React from 'react';
import { ViewType } from '../../types';

interface BottomNavProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  const tabs = [
    { id: ViewType.TIMELINE, label: 'Timeline', icon: (active: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 15h2m-2-4h2m-2-4h2M9 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z"/><path d="M12 18v.01M12 14v.01M12 10v.01M12 6v.01"/></svg>
    )},
    { id: ViewType.BOARD, label: 'Board', icon: (active: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
    )},
    { id: ViewType.UNPLANNED, label: 'Unplanned', icon: (active: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M9 16h6m-3-3v6"/></svg>
    )},
    { id: ViewType.WORKSPACE, label: 'Workspace', icon: (active: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
    )}
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-[#1E1E1E] border-t border-slate-100 dark:border-white/5 flex justify-around items-center py-2 px-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] transition-colors z-50">
      {tabs.map((tab) => {
        const isActive = activeView === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={`flex flex-col items-center flex-1 py-1 transition-all duration-300 ${isActive ? 'text-[#1D61E7] dark:text-[#5893FF]' : 'text-slate-400 dark:text-slate-600'}`}
          >
            <div className={`p-2.5 rounded-[1.25rem] mb-1.5 transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
              {tab.icon(isActive)}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
