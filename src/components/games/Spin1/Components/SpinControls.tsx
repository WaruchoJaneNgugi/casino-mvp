import {type Dispatch, type FC, type SetStateAction} from "react";

interface SpinControlsProps {
    handleSpin: () => void;
    spinState: boolean;
    betAmount: number;
    OnSetBetAmount: Dispatch<SetStateAction<number>>;
}

export const SpinControls: FC<SpinControlsProps> = ({
                                                        handleSpin,
                                                        spinState,
                                                        betAmount,
                                                        OnSetBetAmount,
                                                    }) => {

    return (
        <div>
            <div className="Spin-main-controls">
                <div className="Bet-amount-area-spin">
                    <div className="bet-Amount-text">
                        <div>Bet Amount</div>
                        <div>{betAmount}</div>
                    </div>

                    <div className="Bet-spin-area">
                        <div className="spin-short-bet">
                            {[10, 20, 50, 100,250, 500].map((amount) => (
                                <div
                                    className={`bet-short-spin ${betAmount === amount ? "active-bet":""}`}
                                    key={amount}
                                    onClick={() => OnSetBetAmount(amount)}
                                >
                                    {amount}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Color selection buttons */}


                <div
                    className={`control-spin-btn ${spinState ? "active-spin" : "Spin"}`}
                    onClick={() => {
                        if (spinState) {
                            return;
                        }
                        handleSpin();
                    }}
                >
                    {spinState ? "Spinning..." : "Spin"}
                </div>
            </div>
        </div>
    );
};