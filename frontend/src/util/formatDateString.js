
function formatDate(isoDateString) {
// Create a new Date object from the ISO date string
    const date = new Date(isoDateString);

    // Define options for formatting
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    // Format the date to the desired string format
    return date.toLocaleDateString('en-GB', options);
}

export default formatDate