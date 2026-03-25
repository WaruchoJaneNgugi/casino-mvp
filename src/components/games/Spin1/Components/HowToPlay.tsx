import { Target, Coins, TrendingUp, RotateCcw } from 'lucide-react';
import type { FC } from "react";

export const HowToPlay: FC = () => {
    return (
        <div className="how-to-play">
            <h3 className="content-title">How to Play Wheel of ODDs</h3>

            <div className="instructions-grid">
                <div className="instruction-card">
                    <div className="instruction-icon">
                        <Coins size={24} />
                    </div>
                    <h4>Place Your Bet</h4>
                    <p>Select your bet amount from the available chips (20, 50, 100, 150, 250, 500)</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <Target size={24} />
                    </div>
                    <h4>Choose Color</h4>
                    <p>Select a color multiplier to bet on (DarkBlue, SkyBlue, or Orange)</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <RotateCcw size={24} />
                    </div>
                    <h4>Spin the Wheel</h4>
                    <p>Click SPIN to start the wheel animation and wait for it to land</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <TrendingUp size={24} />
                    </div>
                    <h4>Win Big</h4>
                    <p>If the wheel lands on your chosen color multiplier, you win your bet multiplied!</p>
                </div>
            </div>

            <div className="game-rules">
                <h4>Game Rules</h4>
                <ul>
                    <li>• Choose your bet amount before selecting a color</li>
                    <li>• Each color has different multiplier values (up to 8x)</li>
                    <li>• Higher multipliers = bigger wins but appear less frequently</li>
                    <li>• The wheel contains multiple segments with different multipliers</li>
                    <li>• Win only if the wheel stops on your exact selected multiplier</li>
                    <li>• Balance updates automatically after each spin</li>
                </ul>
            </div>

            <div className="multiplier-info">
                <h4>Multiplier Values</h4>
                <div className="multiplier-list">
                    <div className="multiplier-item">
                        <span className="color-dot darkblue"></span>
                        <span>Blue: Up to 8x</span>
                    </div>
                    <div className="multiplier-item">
                        <span className="color-dot yellow"></span>
                        <span>Yellow: Up to 6x</span>
                    </div>
                    <div className="multiplier-item">
                        <span className="color-dot orange"></span>
                        <span>Orange: Up to 5x</span>
                    </div>
                </div>
            </div>
        </div>
    );
};