
import React, { useState } from 'react';
import { Task } from '../../types';

interface TimelineViewProps {
  tasks: Task[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  upcomingCount: number;
  todoCount: number;
  unplannedCount: number;
  profileName: string;
  activeFilter: 'all' | 'todo' | 'upcoming';
  onFilterChange: (filter: 'all' | 'todo' | 'upcoming') => void;
  onSwitchToUnplanned: () => void;
}

const TimelineView: React.FC<TimelineViewProps> = ({ 
  tasks, 
  selectedDate, 
  setSelectedDate, 
  onToggle, 
  onDelete,
  onEdit,
  upcomingCount,
  todoCount,
  unplannedCount,
  profileName,
  activeFilter,
  onFilterChange,
  onSwitchToUnplanned
}) => {
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  
  const getTodayStr = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - (offset * 60 * 1000));
    return local.toISOString().split('T')[0];
  };

  const todayStr = getTodayStr();
  const dateObj = new Date(selectedDate);
  const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const monthName = dateObj.toLocaleDateString('en-US', { month: 'long' });
  const yearNum = dateObj.getFullYear();

  const displayName = (profileName || 'Academy Member').split(' ')[0];

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 3 + i);
    return d;
  });

  const filteredItems = tasks
    .filter(t => {
      if (activeFilter === 'upcoming') return t.date && t.date > todayStr;
      if (activeFilter === 'todo') return t.date === selectedDate && !t.completed;
      return t.date === selectedDate;
    })
    .sort((a, b) => {
      if (activeFilter === 'upcoming') {
        const dateComp = (a.date || '').localeCompare(b.date || '');
        if (dateComp !== 0) return dateComp;
      }
      return (a.time || '00:00').localeCompare(b.time || '00:00');
    });

  const renderTextWithLinks = (text: string) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-blue-500 underline decoration-blue-500/30 hover:text-blue-600 transition-colors break-all">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const format12h = (time24?: string) => {
    if (!time24) return '10:00 am';
    const [h, m] = time24.split(':');
    let hour = parseInt(h);
    const suffix = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12;
    return `${hour}:${m} ${suffix}`;
  };

  const formatDateShort = (dateStr: string | null) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleTodayClick = () => {
    setSelectedDate(getTodayStr());
    onFilterChange('all');
  };

  return (
    <div className="flex flex-col h-full dark:bg-[#121212] transition-colors overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 pt-4 pb-4">
        <div className="mb-6">
          <p className="text-slate-400 dark:text-slate-500 text-[11px] font-black uppercase tracking-widest mb-1 opacity-70">
            Hi, {displayName}
          </p>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white leading-tight tracking-tight">
              Plan Your Day
            </h2>
            {activeFilter !== 'all' && (
              <button 
                onClick={() => onFilterChange('all')}
                className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 px-3 py-1 rounded-full bg-blue-50/50 dark:bg-blue-900/10"
              >
                Clear Filter
              </button>
            )}
          </div>
          
          <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-hide -mx-2 px-2">
             <StatusCard 
                count={todoCount} 
                label="To Do" 
                isActive={activeFilter === 'todo'}
                onClick={() => onFilterChange(activeFilter === 'todo' ? 'all' : 'todo')}
             />
             <StatusCard 
                count={upcomingCount} 
                label="Upcoming" 
                color="text-emerald-500" 
                isActive={activeFilter === 'upcoming'}
                onClick={() => onFilterChange(activeFilter === 'upcoming' ? 'all' : 'upcoming')}
             />
             <StatusCard 
                count={unplannedCount} 
                label="Unplanned" 
                onClick={onSwitchToUnplanned}
             />
          </div>

          <h3 className="text-[17px] font-black text-slate-800 dark:text-white mb-6 opacity-90">
            {activeFilter === 'upcoming' ? 'Upcoming Plans' : (activeFilter === 'todo' ? `To Do - ${formattedDate}` : formattedDate)}
          </h3>
        </div>

        <div className="relative pl-10">
          <div className="absolute left-[11px] top-0 bottom-0 w-[2.5px] bg-[#1D61E7] opacity-40 rounded-full"></div>

          {filteredItems.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-100 dark:border-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 dark:text-slate-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <p className="text-slate-400 dark:text-slate-500 font-bold text-sm tracking-tight">No events for this selection</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="relative mb-10 group animate-fadeIn">
                <div 
                  onClick={(e) => { e.stopPropagation(); onToggle(item.id); }}
                  className="absolute -left-[35px] top-1.5 z-10 flex items-center justify-center cursor-pointer transition-all duration-300"
                >
                  {item.type === 'task' ? (
                    item.completed ? (
                      <div className="w-6 h-6 rounded-full bg-[#1D61E7] flex items-center justify-center shadow-lg border border-[#1D61E7]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-white dark:bg-[#121212] border-2 border-[#1D61E7] shadow-sm"></div>
                    )
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-[#1D61E7] shadow-sm border-[2px] border-white dark:border-[#121212] ml-[6.5px]"></div>
                  )}
                </div>

                <div 
                  onClick={() => onEdit(item)}
                  className={`pl-1 transition-all duration-300 active:scale-[0.98] ${item.completed ? 'opacity-40' : 'opacity-100'}`}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className={`text-[17px] font-bold leading-tight tracking-tight flex items-center flex-wrap gap-2 ${item.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                          {item.title}
                          {/* Note Type Indicator Beside Title */}
                          {item.type === 'note' && (
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded-md inline-block">
                              {item.isBigNote ? 'Big Note' : 'Note'}
                            </span>
                          )}
                        </h3>
                      </div>
                      {activeFilter === 'upcoming' && (
                        <span className="text-[10px] font-black bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md uppercase tracking-widest">
                          {formatDateShort(item.date)}
                        </span>
                      )}
                    </div>
                    
                    {item.details && (
                      <p className="text-[12px] text-blue-600 dark:text-blue-400 font-bold mt-0.5 tracking-tight opacity-90 break-words">
                        {renderTextWithLinks(item.details)}
                      </p>
                    )}

                    {item.isBigNote && item.description && (
                      <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium whitespace-pre-wrap overflow-hidden">
                        {renderTextWithLinks(item.description)}
                      </p>
                    )}

                    <div className="flex items-center mt-2 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest space-x-2">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {format12h(item.time)}
                      </div>
                      {item.reminderMinutes !== undefined && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 text-blue-500"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1E1E1E] border-t border-slate-100 dark:border-white/5 p-4 rounded-t-[2.5rem] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] transition-colors relative z-20">
        <div className="flex justify-between items-center mb-4 px-2">
          <button 
            onClick={handleTodayClick}
            className="text-[#1D61E7] dark:text-[#5893FF] font-black text-[11px] uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            Today
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsMonthPickerOpen(!isMonthPickerOpen)}
              className="text-slate-800 dark:text-slate-100 font-black text-[11px] uppercase tracking-widest flex items-center hover:text-[#1D61E7] transition-colors"
            >
              {monthName} {yearNum}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`ml-2 transition-transform duration-300 ${isMonthPickerOpen ? 'rotate-180' : ''}`}><path d="m18 15-6-6-6 6"/></svg>
            </button>
            
            {isMonthPickerOpen && (
              <div className="absolute bottom-full right-0 mb-3 bg-white dark:bg-[#252525] border border-slate-100 dark:border-white/10 shadow-2xl rounded-[2rem] p-5 grid grid-cols-3 gap-2 w-64 z-[100] animate-slideIn">
                {months.map((m, idx) => (
                  <button
                    key={m}
                    onClick={() => {
                      const newD = new Date(selectedDate);
                      newD.setMonth(idx);
                      const offset = newD.getTimezoneOffset();
                      const local = new Date(newD.getTime() - (offset * 60 * 1000));
                      setSelectedDate(local.toISOString().split('T')[0]);
                      setIsMonthPickerOpen(false);
                      onFilterChange('all');
                    }}
                    className={`text-[10px] font-black uppercase p-2.5 rounded-2xl transition-all ${idx === dateObj.getMonth() ? 'bg-[#1D61E7] text-white shadow-lg' : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400'}`}
                  >
                    {m.substring(0, 3)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between px-1">
          {days.map((d, i) => {
            const offset = d.getTimezoneOffset();
            const local = new Date(d.getTime() - (offset * 60 * 1000));
            const dateStr = local.toISOString().split('T')[0];
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDate;
            const dayLabel = d.toLocaleDateString('en-US', { weekday: 'narrow' });
            return (
              <button
                key={i}
                onClick={() => { setSelectedDate(dateStr); onFilterChange('all'); }}
                className={`flex flex-col items-center p-2.5 rounded-[1.25rem] transition-all w-11 ${
                  isSelected ? 'bg-[#1D61E7] text-white shadow-lg scale-110' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:white/5'
                }`}
              >
                <span className={`text-[11px] font-black mb-1.5 uppercase ${isSelected ? 'text-blue-100/70' : 'text-slate-400 dark:text-slate-600'}`}>
                  {dayLabel}
                </span>
                <span className="text-[16px] font-black tracking-tighter">{d.getDate()}</span>
                {isToday && !isSelected && <div className="w-[5px] h-[5px] bg-[#EF4444] rounded-full mt-1.5"></div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({ count, label, color = "text-slate-800 dark:text-white", isActive = false, onClick }: { count: number, label: string, color?: string, isActive?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`bg-white dark:bg-[#1E1E1E] rounded-[1.5rem] p-4 flex flex-col items-center justify-center min-w-[95px] flex-1 border shadow-sm transition-all duration-300 active:scale-95 ${isActive ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/10 dark:bg-blue-900/10' : 'border-slate-100 dark:border-white/5'}`}
  >
    <span className={`text-[22px] font-black ${isActive ? 'text-blue-600' : color}`}>{count}</span>
    <span className="text-[9px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-[0.15em] mt-1 opacity-80">{label}</span>
  </button>
);

export default TimelineView;
