import React, { useState } from 'react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'login' | 'register';
    onAuth: (phone: string, password: string, name?: string) => void;
    onSwitchMode: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
                                                        isOpen,
                                                        onClose,
                                                        mode,
                                                        onAuth,
                                                        onSwitchMode,
                                                    }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'login') {
            onAuth(phone, password);
        } else {
            onAuth(phone, password, name);
        }
        setPhone('');
        setPassword('');
        setName('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-stake-dark border border-stake-border rounded-2xl p-8 w-full max-w-md relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-4 glow-orange">
                        <span className="text-white text-2xl">🎰</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {mode === 'login' ? 'Welcome Back' : 'Join Stake'}
                    </h2>
                    <p className="text-stake-light-gray">
                        {mode === 'login' ? 'Sign in to your account' : 'Create your account and get $1,000 bonus'}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'register' && (
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-stake-gray border border-stake-border rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-stake-orange focus:glow-orange transition-all"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-white text-sm font-medium mb-2">
                            Phone
                        </label>
                        <input
                            type="tel" // Changed from email to tel
                            value={phone} // Changed from email to phone
                            onChange={(e) => setPhone(e.target.value)} // Changed from setEmail to setPhone
                            className="w-full bg-stake-gray border border-stake-border rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-stake-orange focus:glow-orange transition-all"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-stake-gray border border-stake-border rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-stake-orange focus:glow-orange transition-all"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full gradient-orange text-white py-3 rounded-xl font-bold hover-glow transition-all"
                    >
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                {/* Switch Mode */}
                <div className="text-center mt-6">
                    <p className="text-stake-light-gray">
                        {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={onSwitchMode}
                            className="text-stake-orange hover:text-stake-orange-light font-medium transition-colors"
                        >
                            {mode === 'login' ? 'Register' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};