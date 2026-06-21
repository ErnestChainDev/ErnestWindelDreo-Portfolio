// src/hooks/useMediaQuery.js
import { useSyncExternalStore } from "react";

export function useMediaQuery(query) {
    const subscribe = (callback) => {
        const mql = window.matchMedia(query);
        mql.addEventListener("change", callback);
        return () => mql.removeEventListener("change", callback);
    };

    const getSnapshot = () => window.matchMedia(query).matches;

    const getServerSnapshot = () => false; // SSR fallback

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}