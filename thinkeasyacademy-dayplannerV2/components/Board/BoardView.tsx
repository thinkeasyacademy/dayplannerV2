
import React, { useState } from 'react';
import { Task, Project } from '../../types';

interface BoardViewProps {
  tasks: Task[];
  projects: Project[];
  onToggle: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onAddProject: () => void;
}

const BoardView: React.FC<BoardViewProps> = ({ tasks, projects, onToggle, onEdit, onEditProject, onDeleteProject, onAddProject }) => {
  const [activeTab, setActiveTab] = useState<'All' | string>('All');

  const renderTextWithLinks = (text: string) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-blue-500 underline decoration-blue-500/30">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="px-6 py-4 dark:bg-slate-900 transition-colors animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight dark:text-white">Workspace</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage your projects</p>
          </div>
        </div>
        <button 
          onClick={onAddProject}
          className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-600 hover:text-white active:scale-95 transition-all shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>

      <div className="flex space-x-3 overflow-x-auto scrollbar-hide mb-8 pb-1">
        <button 
          onClick={() => setActiveTab('All')}
          className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest border-2 transition-all ${
            activeTab === 'All' 
              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' 
              : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'
          }`}
        >
          Overview
        </button>
        {projects.map(p => (
          <button 
            key={p.id}
            onClick={() => setActiveTab(p.id)}
            style={{ 
              backgroundColor: activeTab === p.id ? (p.color || '#1D61E7') : 'transparent',
              borderColor: activeTab === p.id ? (p.color || '#1D61E7') : 'inherit'
            }}
            className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest border-2 transition-all ${
              activeTab === p.id 
                ? 'text-white shadow-lg' 
                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {projects.map(p => {
          if (activeTab !== 'All' && activeTab !== p.id) return null;
          
          const projectTasks = tasks.filter(t => t.projectId === p.id);
          const completed = projectTasks.filter(t => t.completed).length;
          const total = projectTasks.length;
          const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
          const projectColor = p.color || '#1D61E7';

          return (
            <div key={p.id} className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-7 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow group animate-slideIn">
              <div className="flex justify-between items-start mb-5">
                <div className="flex-1">
                  <h4 className="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-2" style={{ color: activeTab === 'All' ? projectColor : 'inherit' }}>
                    {p.name}
                  </h4>
                  <div className="flex items-center text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                    <span className="bg-slate-50 dark:bg-slate-900/50 px-2 py-0.5 rounded-md mr-2">{total} ITEMS</span>
                    <span>{completed} COMPLETED</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-end mr-1">
                    <span className="text-lg font-black leading-none" style={{ color: projectColor }}>{percent}%</span>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Progress</span>
                  </div>

                  <div className="flex bg-slate-50 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <button 
                      onClick={() => onEditProject(p)}
                      className="p-2 text-slate-400 hover:text-blue-600 active:scale-90 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    </button>
                    <button 
                      onClick={() => onDeleteProject(p.id)}
                      className="p-2 text-slate-400 hover:text-red-500 active:scale-90 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-900/50 rounded-full overflow-hidden mb-6 shadow-inner">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out shadow-lg" 
                  style={{ width: `${percent}%`, backgroundColor: projectColor }}
                ></div>
              </div>

              <div className="space-y-3">
                {projectTasks.length === 0 ? (
                  <div className="py-4 text-center border-2 border-dashed border-slate-50 dark:border-slate-700/50 rounded-2xl">
                    <p className="text-[11px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">No active items</p>
                  </div>
                ) : (
                  projectTasks.map(task => (
                    <div 
                      key={task.id} 
                      className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5"
                      onClick={() => onEdit(task)}
                    >
                      <div 
                        onClick={(e) => { e.stopPropagation(); onToggle(task.id); }}
                        className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all ${
                          task.completed ? 'border-transparent scale-110' : 'bg-transparent'
                        }`}
                        style={{ 
                          backgroundColor: task.completed ? projectColor : 'transparent',
                          borderColor: projectColor
                        }}
                      >
                        {task.completed && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[14px] font-bold truncate flex items-center gap-2 ${task.completed ? 'line-through text-slate-400 opacity-60' : 'text-slate-800 dark:text-slate-200'}`}>
                          {task.title}
                          {/* Note/Big Note Indicator Beside Title */}
                          {task.type === 'note' && (
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-1.5 py-0.5 rounded-md inline-block">
                              {task.isBigNote ? 'Big Note' : 'Note'}
                            </span>
                          )}
                        </p>
                        <div className="flex items-center mt-0.5 space-x-2">
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{task.type}</span>
                           {task.details && <span className="text-[9px] font-black text-blue-500/70 truncate tracking-widest">• {renderTextWithLinks(task.details)}</span>}
                        </div>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardView;
