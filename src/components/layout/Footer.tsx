import React from 'react';

export const Footer: React.FC = () => {
    const links = {
        Casino: ['Casino Home', 'Slots', 'Live Casino', 'New Releases', 'Table Games', 'Blackjack', 'Roulette'],
        Sports: ['Sports Home', 'Live Betting', 'Rules', 'Insights'],
        Promotions: ['VIP Club', 'Affiliate', 'Promotions', 'Lottery', 'Refer a Friend'],
        Support: ['Help Center', 'FAQ', 'Privacy Policy', 'Terms of Service', 'Responsible Gaming', 'AML'],
        Company: ['About Us', 'News', 'Careers', 'Business Contacts', 'Verify This Site'],
    };

    const socials = ['Discord', 'Telegram', 'Twitter', 'Instagram', 'YouTube'];

    return (
        <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] text-white mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Top */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-9 h-9 gradient-orange rounded-lg flex items-center justify-center glow-orange">
                                <span className="text-white font-bold">JW</span>
                            </div>
                            <span className="text-white font-bold text-lg gradient-text">JW Gaming</span>
                        </div>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-lg">
                            Explore 1000+ slots, live dealer tables, crash and original games, plus full sports betting.
                            Instant deposits, fast withdrawals, and provably fair systems on every bet.
                        </p>
                    </div>
                    <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border)]">
                        <h4 className="text-white font-semibold mb-2 text-sm">Contact Us</h4>
                        <p className="text-[var(--text-muted)] text-xs mb-3">We&apos;d love to hear your feedback.</p>
                        <div className="space-y-2 text-xs">
                            <div>
                                <span className="text-[var(--text-muted)]">General: </span>
                                <a href="mailto:feedback@jwgaming.com" className="text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors">feedback@jwgaming.com</a>
                            </div>
                            <div>
                                <span className="text-[var(--text-muted)]">Security: </span>
                                <a href="mailto:security@jwgaming.com" className="text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors">security@jwgaming.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-10">
                    {Object.entries(links).map(([section, items]) => (
                        <div key={section}>
                            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">{section}</h4>
                            <ul className="space-y-1.5">
                                {items.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-[var(--text-muted)] hover:text-white text-xs transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Socials */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {socials.map((s) => (
                        <button key={s} className="bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:text-white transition-colors">
                            {s}
                        </button>
                    ))}
                </div>

                {/* Warning */}
                <div className="bg-red-950/40 border border-red-900/50 rounded-xl p-4 mb-8">
                    <div className="flex gap-3">
                        <span className="text-red-400 text-lg flex-shrink-0">⚠️</span>
                        <div>
                            <h4 className="text-red-300 font-semibold text-sm mb-1">Responsible Gaming</h4>
                            <p className="text-red-200/80 text-xs leading-relaxed">
                                Gaming can be addictive. Play responsibly. By using JW Gaming you agree to our Terms of Service and Responsible Gaming Policy.
                                If you have a gambling problem, <a href="#" className="underline">visit our support page</a>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* License */}
                <div className="border-t border-[var(--border)] pt-6">
                    <p className="text-[var(--text-muted)] text-xs mb-1">
                        JW Gaming is legally authorized to conduct gaming operations for all games of chance and wagering.
                    </p>
                    <p className="text-[var(--green)] text-xs font-semibold">BCLB License Number: BCG-2024-08763</p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[var(--border)] bg-[var(--bg-primary)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <span className="text-[var(--text-muted)] text-xs">© 2025 JW Gaming. All rights reserved.</span>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                        <span>18+ Only</span>
                        <span>•</span>
                        <span>Play Responsibly</span>
                        <span>•</span>
                        <span>Terms Apply</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
