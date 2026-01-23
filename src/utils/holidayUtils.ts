import { Holiday, GovResponse, RawEvent } from '../types/holiday';

export const processHolidays = (rawData: GovResponse): Holiday[] => {
    const regions = ['england-and-wales', 'scotland', 'northern-ireland'];
    let allEvents: (RawEvent & { region: string })[] = [];

    regions.forEach((region) => {
        if (rawData[region]?.events) {
            // Attach the region name to each event before adding to the main list
            const eventsWithRegion = rawData[region].events.map(event => ({
                ...event,
                region: rawData[region].division
            }));
            allEvents = [...allEvents, ...eventsWithRegion];
        }
    });

    const now = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(now.getMonth() + 6);

    const uniqueMap = new Map<string, RawEvent & { region: string }>();

    allEvents.forEach((event) => {
        const eventDate = new Date(event.date);
        if (eventDate >= now && eventDate <= sixMonthsFromNow) {
            const uniqueKey = `${event.date}-${event.title.toLowerCase().trim()}`;

            // If the holiday exists in multiple regions, aggregate them
            if (uniqueMap.has(uniqueKey)) {
                const existing = uniqueMap.get(uniqueKey);
                if (existing && !existing.region.includes(event.region)) {
                    existing.region = `${existing.region}, ${event.region}`;
                }
            } else {
                uniqueMap.set(uniqueKey, { ...event });
            }
        }
    });
    // Convert the map back to an array, sort by date, limit to 5, and format
    return Array.from(uniqueMap.values())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5)
        .map((h) => ({
            ...h,
            id: `${h.date}-${h.title.replace(/\s+/g, '-').toLowerCase()}`,
            // Clean up the region display name
            region: h.region.replace(/-/g, ' ').replace(/\band\b/g, '&')
        }));
};