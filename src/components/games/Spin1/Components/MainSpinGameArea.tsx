import {Canvas} from "./Canvas";
import {useEffect, useState} from "react";
import "../assets/maincss.css";
import type {ColorBlock} from "../Utils/types.ts";
import {useSpinAudio} from "@/components/games/Spin1/SpinOddsAudio/useSpinAudio";
import {Topbar} from "@/components/games/Spin1/Components/Topbar";
import {SpinControls} from "@/components/games/Spin1/Components/SpinControls";
import {ResultPopup} from "@/components/games/Spin1/Components/ResultPopUp";


export const MainSpinGameArea = () => {
    const [spinState, setSpinState] = useState<boolean>(false);
    const [winner, setWinner] = useState<ColorBlock | null>(null);
    const [betAmount, setBetAmount] = useState<number>(10);
    const [amountWon, setAmountWon] = useState<number>(0);
    const [balance, setBalance] = useState<number>(1000);
    const [isMuted, setIsMuted] = useState<boolean>(false);

    // Initialize the audio hook
    const { playSpinCornerSnd, playSpinWheelLoop } = useSpinAudio(isMuted, true);

    const handleMuteToggle = () => {
        setIsMuted(!isMuted);
    };

    const handleSpin = () => {
        if (spinState) return;
        if(betAmount>balance)return;
        setBalance(prev => prev - betAmount);
        setSpinState(true);

        // Play bet sound when spinning starts
        playSpinCornerSnd("PlaySnd");

        // Play wheel rolling sound for 3 seconds (adjust duration as needed)
        playSpinWheelLoop(3000);
    };

    // Reset spin state when winner is set (wheel stops)
    useEffect(() => {
        if (winner) {
            setSpinState(false); // Reset spin state immediately when wheel stops

            // Play win/lose sound based on result
            if (winner.multiplier !== 0) {
                playSpinCornerSnd("popUpWin");
            } else {
                playSpinCornerSnd("popUpLose");
            }
        }
    }, [winner, playSpinCornerSnd]);

    useEffect(() => {
        if (!winner) return;

        let payout = 0;

        if (winner.multiplier !== 0) {
            payout = betAmount * winner.multiplier;
            setBalance(prev => prev + payout);
            console.log("DEBUG - WIN! Payout:", payout);

            // Play bonus sound for big wins (optional - adjust threshold as needed)
            if (winner.multiplier >= 5) {
                playSpinCornerSnd("BonusWinSnd");
            }
        } else {
            payout = 0;
            console.log("DEBUG - LOSE! Landed on zero");
        }

        setAmountWon(payout);

    }, [betAmount, winner, playSpinCornerSnd]);

    // Play bet amount sound when bet amount changes
    useEffect(() => {
        if (betAmount > 20) { // Don't play on initial load
            playSpinCornerSnd("BetAmountSnd");
        }
    }, [betAmount, playSpinCornerSnd]);

    return (
        <div className="Spin-main-container">
            <div className="spin-main-game-area">
                <Topbar
                    balance={balance}
                    onMuteToggle={handleMuteToggle}
                    isMuted={isMuted}
                />
                <div className="spin-game-area">

                    <Canvas
                        spinState={spinState}
                        OnSetWinner={setWinner}
                    />
                </div>
                <SpinControls
                    handleSpin={handleSpin}
                    spinState={spinState}
                    OnSetBetAmount={setBetAmount}
                    betAmount={betAmount}
                />
                <ResultPopup
                    winner={winner ? winner.name : null}
                    amountWon={amountWon}
                    onClose={() => setWinner(null)}
                />
            </div>
        </div>
    );
};