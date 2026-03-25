import { useCallback, useEffect, useMemo } from "react";

const AUDIO = {
    RollSnd: '/audio/wheelrolling.wav',
    popUpWin: '/audio/popupwin.wav',
    popUpLose: '/audio/popuplose.wav',
    BetAmountSnd: '/audio/betAmountsnd.wav',
    PlaySnd: '/audio/betsnd.wav',
    BonusWinSnd: '/audio/bonusSound.mp3',
    SpinBg: '/audio/spin-bg.mp3',
} as const;

const isBrowser = typeof window !== 'undefined';
const makeAudio = (src: string) => isBrowser ? new Audio(src) : null;

export const useSpinAudio = (isMuted: boolean, loop: boolean) => {
    const instances = useMemo(() => ({
        RollSnd: makeAudio(AUDIO.RollSnd),
        popUpWin: makeAudio(AUDIO.popUpWin),
        popUpLose: makeAudio(AUDIO.popUpLose),
        BetAmountSnd: makeAudio(AUDIO.BetAmountSnd),
        PlaySnd: makeAudio(AUDIO.PlaySnd),
        BonusWinSnd: makeAudio(AUDIO.BonusWinSnd),
    }), []);

    const bgSound = useMemo(() => {
        if (!isBrowser) return null;
        const s = new Audio(AUDIO.SpinBg);
        s.loop = loop;
        return s;
    }, [loop]);

    useEffect(() => {
        if (!bgSound) return;
        bgSound.volume = isMuted ? 0 : 0.5;
        bgSound.play().catch((err) => {
            if (err.name === 'NotAllowedError') {
                const resume = () => {
                    bgSound.play().catch(() => {});
                    document.removeEventListener('click', resume);
                    document.removeEventListener('keydown', resume);
                };
                document.addEventListener('click', resume);
                document.addEventListener('keydown', resume);
            }
        });
        return () => { bgSound.pause(); bgSound.currentTime = 0; };
    }, [bgSound, isMuted]);

    const playSpinWheelLoop = useCallback((spinDuration: number) => {
        if (isMuted || !instances.RollSnd) return;
        const snd = instances.RollSnd;
        snd.currentTime = 0;
        snd.play().catch(() => {});
        const interval = setInterval(() => {
            snd.currentTime = 0;
            snd.play().catch(() => {});
        }, (snd.duration || 2) * 1000);
        setTimeout(() => { clearInterval(interval); snd.pause(); snd.currentTime = 0; }, spinDuration);
    }, [instances.RollSnd, isMuted]);

    const playSpinCornerSnd = useCallback((soundKey: keyof typeof instances) => {
        if (isMuted) return;
        const snd = instances[soundKey];
        if (!snd) return;
        if (!snd.paused) { snd.pause(); snd.currentTime = 0; }
        snd.play().catch(() => {});
    }, [instances, isMuted]);

    return { playSpinCornerSnd, playSpinWheelLoop };
};
