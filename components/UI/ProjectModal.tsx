
import React, { useState } from 'react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSave: (projectData: Partial<Project>) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onSave }) => {
  const [name, setName] = useState(project?.name || '');
  const [color, setColor] = useState(project?.color || '#1D61E7');

  const colors = ['#1D61E7', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899'];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 animate-fadeIn">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative animate-slideIn">
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
            {project ? 'Edit Project' : 'New Project'}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Name</label>
              <input 
                autoFocus
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-semibold dark:text-white"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Color</label>
              <div className="flex justify-between">
                {colors.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full transition-all transform ${color === c ? 'ring-4 ring-offset-2 ring-blue-500 dark:ring-offset-slate-900 scale-110' : 'hover:scale-105'}`}
                    style={{ backgroundColor: c }}
                    aria-label={`Select color ${c}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={() => onSave({ name, color })}
              className="flex-1 py-3.5 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 dark:shadow-blue-900/20 active:scale-95 transition-all"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
