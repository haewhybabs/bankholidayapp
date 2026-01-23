export const formatHolidayDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);

    // Check if date is actually valid before formatting
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};