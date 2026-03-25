'use client';
import React, { useState } from 'react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'login' | 'register';
    onAuth: (phone: string, password: string, name?: string) => void;
    onSwitchMode: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
    isOpen, onClose, mode, onAuth, onSwitchMode,
}) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAuth(phone, password, name || undefined);
        setPhone(''); setPassword(''); setName('');
    };

    if (!isOpen) return null;

    const inputClass = "w-full bg-[#1a1d27] border border-[#2a2f45] rounded-lg px-3 py-2.5 text-white text-sm placeholder-[#4b5563] focus:outline-none focus:border-[var(--accent)] transition-colors";

    return (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-[#13161e] border border-[#2a2f45] rounded-2xl overflow-hidden shadow-2xl">
                {/* Orange top bar */}
                <div className="h-0.5 w-full gradient-orange" />

                <div className="p-6">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-[#4b5563] hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Logo + title */}
                    <div className="flex flex-col items-center mb-5">
                        <div className="w-11 h-11 gradient-orange rounded-xl flex items-center justify-center mb-3 glow-orange">
                            <span className="text-lg">🎰</span>
                        </div>
                        <h2 className="text-white font-bold text-lg">
                            {mode === 'login' ? 'Welcome Back' : 'Join JW Gaming'}
                        </h2>
                        <p className="text-[#6b7280] text-xs mt-1 text-center">
                            {mode === 'login' ? 'Sign in to continue playing' : 'Create your account and claim KSh 1,000 bonus'}
                        </p>
                    </div>

                    {/* Tab switcher */}
                    <div className="flex bg-[#0d0f14] rounded-lg p-0.5 mb-5">
                        <button
                            type="button"
                            onClick={() => mode !== 'login' && onSwitchMode()}
                            className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
                                mode === 'login' ? 'gradient-orange text-white' : 'text-[#6b7280] hover:text-white'
                            }`}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => mode !== 'register' && onSwitchMode()}
                            className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
                                mode === 'register' ? 'gradient-orange text-white' : 'text-[#6b7280] hover:text-white'
                            }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                        {mode === 'register' && (
                            <div>
                                <label className="block text-[#9ca3af] text-xs mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={inputClass}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-[#9ca3af] text-xs mb-1.5">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={inputClass}
                                placeholder="+254 700 000 000"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-[#9ca3af] text-xs">Password</label>
                                {mode === 'login' && (
                                    <button type="button" className="text-[var(--accent)] text-xs hover:underline">
                                        Forgot password?
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`${inputClass} pr-9`}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4b5563] hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {mode === 'register' && (
                            <p className="text-[#4b5563] text-[11px] leading-relaxed">
                                By registering you agree to our{' '}
                                <a href="#" className="text-[var(--accent)] hover:underline">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="text-[var(--accent)] hover:underline">Privacy Policy</a>.
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full gradient-orange text-white py-2.5 rounded-lg font-semibold text-sm hover-glow transition-all mt-1"
                        >
                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-[#6b7280] text-xs mt-4">
                        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                        <button onClick={onSwitchMode} className="text-[var(--accent)] hover:underline font-medium">
                            {mode === 'login' ? 'Register' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
