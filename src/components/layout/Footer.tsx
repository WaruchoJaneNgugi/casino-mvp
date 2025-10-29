import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-stake-darker border-t border-stake-border text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Top Section - Description */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h3 className="text-2xl font-bold gradient-text mb-4"> Online Casino</h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            Explore 1000+ slots, live dealer tables, crash and original games, plus full sports betting with pre-match and in-play odds. Instant deposits, low fees, fast withdrawals.
                        </p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Our provably fair systems and audited RNG protect every bet. One wallet across casino and sportsbook keeps things simple, and our mobile-ready site lets you play anywhere. New players can claim welcome bonuses and ongoing cashback. Need help? 24/7 support has you covered. Simple, secure, and built for real-money crypto gaming.
                        </p>
                    </div>

                    <div className="bg-stake-gray/50 rounded-xl p-6 border border-stake-border">
                        <h4 className="text-lg font-bold text-white mb-3">Help us improve your experience</h4>
                        <p className="text-gray-300 text-sm mb-4">Get rewarded for your valuable feedback!</p>

                        <div className="space-y-3">
                            <div>
                                <p className="text-gray-400 text-xs mb-1">Email us:</p>
                                <a href="mailto:feedback@bcgame.com" className="text-stake-orange hover:text-amber-400 text-sm">
                                    feedback@bcgame.com
                                </a>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs mb-1">
                                    If you find any vulnerabilities or leaks, please contact us (security-related issues only; non-related issues will be omitted).
                                </p>
                                <a href="mailto:security@bcgame.com" className="text-stake-orange hover:text-amber-400 text-sm">
                                    security@bcgame.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Links Sections */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
                    {/* Casino */}
                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Casino</h4>
                        <ul className="space-y-2 text-xs">
                            {['Casino Home', 'Slots', 'Live Casino', 'New Releases', 'Recommended', 'Table Game', 'BlackJack', 'Roulette', 'Baccarat'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sports */}
                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Sports</h4>
                        <ul className="space-y-2 text-xs">
                            {['Sports Home', 'Live', 'Rules', 'Sport Betting Insights'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Promo */}
                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Promo</h4>
                        <ul className="space-y-2 text-xs">
                            {['VIP Club', 'Affiliate', 'Promotions', 'Lottery', 'Refer a friend', 'BC Store'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support/Legal */}
                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Support/Legal</h4>
                        <ul className="space-y-2 text-xs">
                            {['Licenses', 'Help Center', 'Gamble Aware', 'Fairness', 'FAQ', 'Privacy Policy', 'Terms Of Service', 'Law Enforcement', 'Responsible Gambling', 'AML'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Design Resources */}
                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Design Resources</h4>
                        <ul className="space-y-2 text-xs">
                            {['APP', 'Live Support', 'CEO Inbox'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About Us */}
                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">About Us</h4>
                        <ul className="space-y-2 text-xs">
                            {['News', 'Work with us', 'Business Contacts', 'Help Desk', 'Verify Representative', 'Verify This Site'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Community Section */}
                <div className="bg-stake-gray/30 rounded-xl p-6 mb-8">
                    <h4 className="font-bold text-white mb-4 text-lg">Join Our Global Community</h4>
                    <div className="flex flex-wrap gap-4">
                        {['Discord', 'Telegram', 'Twitter', 'Instagram', 'Facebook', 'YouTube'].map((platform) => (
                            <button
                                key={platform}
                                className="bg-stake-dark hover:bg-stake-gray border border-stake-border px-4 py-2 rounded-lg text-sm text-white transition-colors"
                            >
                                {platform}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Final Description */}
                {/*<div className="text-center mb-8">*/}
                {/*    <p className="text-gray-300 text-sm leading-relaxed max-w-4xl mx-auto">*/}
                {/*        The ultimate crypto gaming destination, trusted by millions worldwide. We bring bold entertainment, cutting-edge experiences, and a thriving community together for non-stop thrills. Play, win, and stay untamed.*/}
                {/*    </p>*/}
                {/*</div>*/}

                {/* Warning Section */}
                <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 mb-8">
                    <div className="flex items-start space-x-3">
                        <div className="text-red-400 text-xl">⚠️</div>
                        <div>
                            <h4 className="font-bold text-red-300 mb-2">Responsible Gaming Warning</h4>
                            <p className="text-red-200 text-sm leading-relaxed">
                                Your use of and access to JW Gaming signifies that you fully understand and agree to be legally bound by the contents of our Terms of Service and Responsible Gaming Policy.
                            </p>
                            <p className="text-red-200 text-sm mt-2">
                                <strong>Remember:</strong> Gaming can be addictive. Play responsibly. If you or someone you know has a gambling problem, help is available.
                                <a href="#" className="underline ml-1">Visit our Responsible Gaming page</a> for support resources.
                            </p>
                        </div>
                    </div>
                </div>

                {/* License Information */}
                <div className="border-t border-stake-border pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs text-gray-400">
                        {/*<div>*/}
                        {/*    <p className="mb-2">*/}
                        {/*        <strong>Note:</strong> Crypto trading is not gambling by definition, therefore it is not covered by our gaming license.*/}
                        {/*    </p>*/}
                        {/*    <p>*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                        <div>
                            <p className="mb-2">
                                JW Gaming has passed all regulatory compliance and is legally authorized to conduct gaming operations for any and all games of chance and wagering.
                            </p>
                            <p className="text-stake-green font-semibold">
                                BCLB License Number: BCG-2024-08763
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-stake-border bg-stake-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <div className="text-gray-400 text-xs">
                            Copyright ©2025 JW Gaming ALL RIGHTS RESERVED.
                            <span className="ml-2 text-stake-green">1BTC=$111,107.87</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                            <span>18+ Only</span>
                            <span>•</span>
                            <span>Play Responsibly</span>
                            <span>•</span>
                            <span>Terms Apply</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};