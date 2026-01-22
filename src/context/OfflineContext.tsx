import React, { createContext, useContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const OfflineContext = createContext<boolean>(false);

export const OfflineProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setIsOffline(offline);
        });

        return () => unsubscribe();
    }, []);

    return (
        <OfflineContext.Provider value={isOffline}>
            {children}
        </OfflineContext.Provider>
    );
};

export const useOffline = () => useContext(OfflineContext);