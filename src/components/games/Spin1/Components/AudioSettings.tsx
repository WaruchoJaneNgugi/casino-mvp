import { Volume2, VolumeX } from 'lucide-react';
import type { FC } from "react";

interface AudioSettingsProps {
    isMuted: boolean;
    onMuteToggle: () => void;
}

export const AudioSettings: FC<AudioSettingsProps> = ({ isMuted, onMuteToggle }) => {
    return (
        <div className="audio-settings">
            <h3 className="content-title">Audio Settings</h3>

            <div className="audio-controls">
                <button
                    className={`audio-btn ${isMuted ? 'muted' : ''}`}
                    onClick={onMuteToggle}
                >
                    {isMuted ? (
                        <>
                            <VolumeX size={24} />
                            <span>Sound Muted</span>
                        </>
                    ) : (
                        <>
                            <Volume2 size={24} />
                            <span>Sound Enabled</span>
                        </>
                    )}
                </button>

                <div className="audio-info">
                    <p>Toggle game sounds and wheel spin effects</p>
                    <p className="audio-status">
                        Current status: <strong>{isMuted ? 'Muted' : 'Enabled'}</strong>
                    </p>
                </div>
            </div>

            <div className="audio-features">
                <h4>Audio Features</h4>
                <ul>
                    <li>• Wheel spin sounds</li>
                    <li>• Win celebration effects</li>
                    <li>• Button click sounds</li>
                    <li>• Background ambiance</li>
                </ul>
            </div>
        </div>
    );
};