function formatDateTimeIndia(dateTimeString) {
    const date = new Date(dateTimeString);

    // Define options for formatting date
    const dateOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };

    // Define options for formatting time
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Use 12-hour time format with AM/PM
    };

    // Format the date and time
    const formattedDate = date.toLocaleDateString('en-IN', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-IN', timeOptions);

    // Combine date and time
    return `${formattedDate} at ${formattedTime}`;
}

export { formatDateTimeIndia };