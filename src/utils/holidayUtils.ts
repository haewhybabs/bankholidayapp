import { Holiday, GovResponse, RawEvent } from '../types/holiday';

export const processHolidays = (rawData: GovResponse): Holiday[] => {
    const regions = ['england-and-wales', 'scotland', 'northern-ireland'];
    let allEvents: RawEvent[] = [];

    //Aggregate all events from specified regions
    regions.forEach((region) => {
        if (rawData[region]?.events) {
            allEvents = [...allEvents, ...rawData[region].events];
        }
    });

    const now = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(now.getMonth() + 6);
    //Remove duplicates based on date and title (case-insensitive, trimmed) 
    const uniqueMap = new Map<string, RawEvent>();

    allEvents.forEach((event) => {
        const eventDate = new Date(event.date);

        // Filter for next 6 months
        if (eventDate >= now && eventDate <= sixMonthsFromNow) {
            const uniqueKey = `${event.date}-${event.title.toLowerCase().trim()}`;
            if (!uniqueMap.has(uniqueKey)) {
                uniqueMap.set(uniqueKey, event);
            }
        }
    });

    //Sort by date and take the next 5 upcoming holidays
    return Array.from(uniqueMap.values())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5)
        .map((h) => ({
            ...h,
            id: `${h.date}-${h.title.replace(/\s+/g, '-').toLowerCase()}`,
        }));
};