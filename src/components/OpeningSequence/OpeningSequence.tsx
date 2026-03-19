import { useCallback, useEffect, useState } from 'react';
import './OpeningSequence.css';

const OPENING_STORAGE_KEY = 'procomm-opening-seen-v1';
const OPENING_TOTAL_MS = 4200;
const OPENING_FADE_START_MS = 3600;
const QUICK_EXIT_MS = 380;

const OpeningSequence = () => {
    const [isVisible, setIsVisible] = useState(() => {
        if (typeof window === 'undefined') {
            return false;
        }

        const hasSeenOpening = sessionStorage.getItem(OPENING_STORAGE_KEY) === '1';
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion && !hasSeenOpening) {
            sessionStorage.setItem(OPENING_STORAGE_KEY, '1');
        }

        return !hasSeenOpening && !prefersReducedMotion;
    });
    const [isLeaving, setIsLeaving] = useState(false);

    const closeOverlay = useCallback(() => {
        setIsLeaving(true);

        window.setTimeout(() => {
            sessionStorage.setItem(OPENING_STORAGE_KEY, '1');
            setIsVisible(false);
        }, QUICK_EXIT_MS);
    }, []);

    useEffect(() => {
        if (!isVisible) {
            return;
        }

        const fadeTimer = window.setTimeout(() => {
            setIsLeaving(true);
        }, OPENING_FADE_START_MS);

        const hideTimer = window.setTimeout(() => {
            sessionStorage.setItem(OPENING_STORAGE_KEY, '1');
            setIsVisible(false);
        }, OPENING_TOTAL_MS);

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                window.clearTimeout(fadeTimer);
                window.clearTimeout(hideTimer);
                closeOverlay();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.clearTimeout(fadeTimer);
            window.clearTimeout(hideTimer);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [closeOverlay, isVisible]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className={`opening-overlay${isLeaving ? ' is-leaving' : ''}`} role="presentation" aria-hidden="true">
            <div className="opening-noise" />
            <div className="opening-glow-ring" />

            <div className="opening-title-wrap">
                <p className="opening-super">Hawkins Broadcast Network</p>
                <h1 className="opening-title">ProComm Hawkin;s Lab</h1>
                <p className="opening-sub">Entering the Upside Down</p>
            </div>

            <div className="opening-signal-bar" aria-hidden="true">
                <span />
            </div>

            <button type="button" className="opening-skip" onClick={closeOverlay}>
                Skip Intro
            </button>
        </div>
    );
};

export default OpeningSequence;
