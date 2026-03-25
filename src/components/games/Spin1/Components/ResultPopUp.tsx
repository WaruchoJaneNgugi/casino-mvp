import { Trophy, X, RotateCcw, Star, Coins } from 'lucide-react';

interface ResultPopupProps {
    winner: string | null;
    amountWon: number;
    onClose: () => void;
}

export const ResultPopup: React.FC<ResultPopupProps> = ({ winner, amountWon, onClose }) => {
    // Fix: Check if winner is null OR empty string
    if (!winner || winner === "") return null;

    const isWin = amountWon > 0;

    return (
        <div className="modern-popup-overlay">
            <div className={`modern-popup-container ${isWin ? 'popup-win' : 'popup-lose'}`}>

                {/* Header with Close Button */}
                <div className="popup-header">
                    <button className="popup-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Main Content */}
                <div className="popup-content">
                    {/* Animated Icon */}
                    <div className={`popup-icon ${isWin ? 'win-icon' : 'lose-icon'}`}>
                        {isWin ? (
                            <div className="icon-container">
                                <Trophy size={48} className="trophy-icon" />
                                <div className="sparkle-container">
                                    <Star size={16} className="sparkle sparkle-1" />
                                    <Star size={12} className="sparkle sparkle-2" />
                                    <Star size={14} className="sparkle sparkle-3" />
                                </div>
                            </div>
                        ) : (
                            <div className="icon-container">
                                <RotateCcw size={48} className="retry-icon" />
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h2 className={`popup-title ${isWin ? 'win-title' : 'lose-title'}`}>
                        {isWin ? 'Victory!' : 'Try Again'}
                    </h2>

                    {/* Result Message */}
                    <div className="popup-message">
                        {isWin ? (
                            <div className="win-message">
                                <div className="amount-display">
                                    <span className="currency">
                                        <Coins size={32} className="coins-icon" />
                                    </span>
                                    <span className="amount">{amountWon.toLocaleString()}</span>
                                </div>
                                <p className="message-text">Congratulations! You won big!</p>
                            </div>
                        ) : (
                            <div className="lose-message">
                                <p className="message-text">The wheel didn't favor you this time.</p>
                                <p className="encouragement">Better luck on the next spin!</p>
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="popup-stats">
                        <div className="stat-item">
                            <span className="stat-label">Multiplier:</span>
                            <span className="stat-value">{winner}</span>
                        </div>
                        {/*{isWin && (*/}
                        {/*    <div className="stat-item">*/}
                        {/*        <span className="stat-label">Multiplier:</span>*/}
                        {/*        <span className="stat-value">*/}
                        {/*            {isWin ? (amountWon).toFixed(1) + 'x' : '0x'}*/}
                        {/*        </span>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </div>

                    {/*/!* Action Button *!/*/}
                    {/*<button*/}
                    {/*    className={`popup-action-btn ${isWin ? 'win-btn' : 'lose-btn'}`}*/}
                    {/*    onClick={onClose}*/}
                    {/*>*/}
                    {/*    {isWin ? 'Claim Winnings' : 'Spin Again'}*/}
                    {/*</button>*/}
                </div>

                {/* Decorative Elements */}
                <div className="popup-decoration">
                    {isWin && (
                        <>
                            <div className="decoration-circle circle-1"></div>
                            <div className="decoration-circle circle-2"></div>
                            <div className="decoration-circle circle-3"></div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};