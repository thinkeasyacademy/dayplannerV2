
import React, { useState, useEffect } from 'react';
import { supabase } from '../../App';

interface AuthScreenProps {
  initialMode?: 'signin' | 'signup';
  onModeChange?: (mode: 'signin' | 'signup') => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ initialMode = 'signin', onModeChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsSignUp(initialMode === 'signup');
  }, [initialMode]);

  const toggleMode = () => {
    const nextMode = isSignUp ? 'signin' : 'signup';
    setIsSignUp(!isSignUp);
    if (onModeChange) onModeChange(nextMode);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: { data: { name: 'Academy Member' } } 
        });
        if (error) throw error;
        setMessage('Registration successful! Please check your email.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setMessage(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = Math.max(2026, new Date().getFullYear());

  return (
    <div className="flex flex-col h-screen w-full max-w-md bg-white dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden relative mx-auto">
      <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="flex-1 flex flex-col justify-center px-10 relative z-10">
        <div className="mb-12">
          <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white leading-tight tracking-tight">
            {isSignUp ? 'Join the Mission' : 'Welcome Back'}
          </h1>
          <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] mt-3">
            Think Easy, Life Easy
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <input 
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold dark:text-white"
          />
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold dark:text-white"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 p-2">
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {message && <p className={`text-[11px] font-bold text-center p-3 rounded-xl ${message.includes('successful') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{message}</p>}

          <button 
            type="submit" disabled={loading}
            className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <button onClick={toggleMode} className="mt-8 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>

      <div className="pb-8 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 dark:text-slate-700">
          © {currentYear} Think Easy Academy
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
