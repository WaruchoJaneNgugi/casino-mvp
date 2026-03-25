import { type FC } from "react";
import { initialColors } from "../Hooks/useColors.ts";

// Color key component
export const ColorKey: FC = () => {
    const colors = initialColors;

    // Filter to show only one of each color type with the highest multiplier
    const filteredColors = colors.reduce((acc, color) => {
        // Find existing color in accumulator
        const existingColor = acc.find(c => c.hex === color.hex);

        if (!existingColor) {
            // If color doesn't exist, add it
            acc.push(color);
        } else {
            // If color exists, keep the one with higher multiplier
            // Convert to number if needed
            const currentMultiplier = typeof color.multiplier === 'string'
                ? parseFloat(color.multiplier)
                : color.multiplier;
            const existingMultiplier = typeof existingColor.multiplier === 'string'
                ? parseFloat(existingColor.multiplier)
                : existingColor.multiplier;

            if (currentMultiplier > existingMultiplier) {
                const index = acc.indexOf(existingColor);
                acc[index] = color;
            }
        }

        return acc;
    }, [] as typeof colors);

    // Sort by multiplier value (descending) for consistent display
    const sortedColors = filteredColors.sort((a, b) => {
        const multiplierA = typeof a.multiplier === 'string' ? parseFloat(a.multiplier) : a.multiplier;
        const multiplierB = typeof b.multiplier === 'string' ? parseFloat(b.multiplier) : b.multiplier;
        return multiplierB - multiplierA;
    });

    return (
        <div style={{
            marginTop: "5px",
            display: 'flex',
            flexDirection: "row",
            justifyContent: "space-evenly",
            background: 'rgba(26, 31, 46, 0.9)',
            padding: '5px 0',
            borderRadius: '10px',
            border: '2px solid rgba(255, 214, 10, 0.3)',
            zIndex: 10,
            backdropFilter: 'blur(5px)'
        }}>
            {sortedColors.map((color, index) => (
                <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <div style={{
                        flex: '1',
                        padding: '10px',
                        backgroundColor: color.hex,
                        borderRadius: '4px',
                        border: '2px solid rgba(255, 255, 255, 0.3)'
                    }}></div>
                    <span style={{
                        color: '#fff',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        fontFamily: 'Arial, sans-serif'
                    }}>
                        {color.multiplier}x
                    </span>
                </div>
            ))}
        </div>
    );
};