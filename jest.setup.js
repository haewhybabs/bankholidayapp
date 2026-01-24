

jest.mock('expo-calendar', () => ({
    EntityTypes: { EVENT: 'event' },
    PermissionStatus: {
        UNDETERMINED: 'undetermined',
        GRANTED: 'granted',
        DENIED: 'denied',
        RESTRICTED: 'restricted',
    },
    getCalendarPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'undetermined' })),
    requestCalendarPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    getDefaultCalendarAsync: jest.fn(() => Promise.resolve({ id: '1', title: 'Default' })),
    createCalendarAsync: jest.fn(),
    getCalendarsAsync: jest.fn(() => Promise.resolve([])),
    createEventAsync: jest.fn(() => Promise.resolve('event-id')),
}));

jest.mock('@react-native-community/netinfo', () => ({
    fetch: jest.fn(() => Promise.resolve({ isConnected: true, isInternetReachable: true })),
    addEventListener: jest.fn(() => jest.fn()),
    useNetInfo: jest.fn(() => ({ isConnected: true, isInternetReachable: true })),
}));

jest.mock('react-native-safe-area-context', () => ({
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('expo-router', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
    })),
    useLocalSearchParams: jest.fn(() => ({})),
}));
