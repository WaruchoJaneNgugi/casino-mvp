import type {ColorBlock, ControlButton} from "../Utils/types.ts";
import {useEffect, useRef} from "react";

// More player-friendly version
export const initialColors: ColorBlock[] = [
    // High multipliers (very low probability) - 4 segments
    { id: 1, name: "3x", hex: "#8B0000", multiplier: 3.0 },
    { id: 2, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 3, name: "2.5x", hex: "rgb(6,0,148)", multiplier: 2.5 },
    { id: 4, name: "", hex: "#1a1f2e", multiplier: 0 },

    // Medium-high multipliers (low probability) - 6 segments
    { id: 5, name: "2.2x", hex: "#ffd60a", multiplier: 2.2 },
    { id: 6, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 7, name: "2x", hex: "rgb(253,114,40)", multiplier: 2.0 },
    { id: 8, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 9, name: "1.9x", hex: "rgb(6,0,148)", multiplier: 1.9 },
    { id: 10, name: "", hex: "#1a1f2e", multiplier: 0 },

    // Medium multipliers (medium probability) - 8 segments
    { id: 11, name: "1.8x", hex: "#ffd60a", multiplier: 1.8 },
    { id: 12, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 13, name: "1.7x", hex: "rgb(253,114,40)", multiplier: 1.7 },
    { id: 14, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 15, name: "1.6x", hex: "rgb(6,0,148)", multiplier: 1.6 },
    { id: 16, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 17, name: "1.5x", hex: "#ffd60a", multiplier: 1.5 },
    { id: 18, name: "", hex: "#1a1f2e", multiplier: 0 },

    // Low multipliers (high probability) - 12 segments
    { id: 19, name: "1.4x", hex: "rgb(253,114,40)", multiplier: 1.4 },
    { id: 20, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 21, name: "1.3x", hex: "rgb(6,0,148)", multiplier: 1.3 },
    { id: 22, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 23, name: "1.2x", hex: "#ffd60a", multiplier: 1.2 },
    { id: 24, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 25, name: "1.1x", hex: "rgb(253,114,40)", multiplier: 1.1 },
    { id: 26, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 27, name: "1x", hex: "rgb(6,0,148)", multiplier: 1.0 },
    { id: 28, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 29, name: "1x", hex: "#ffd60a", multiplier: 1.0 },
    { id: 30, name: "", hex: "#1a1f2e", multiplier: 0 },
];

export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined); // ✅ provide initial value
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export const controls: ControlButton[] = [
    { label: "orange", type: "range", value: "high" },
    { label: "Low (1-10)", type: "range", value: "low" },
];