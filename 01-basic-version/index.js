/*
 * Function to format view counts into a more readable format (e.g., 1.2M, 560K).
 */
function formatViews(num) {
    if (num >= 1000000) {
        // For one million or more views, show one decimal place (e.g., 1.2M)
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        // For one thousand or more, show a whole number (e.g., 560K)
        return Math.floor(num / 1000) + 'K';
    }
    return num.toString();
}


/**
 * Populates a pre-existing video card in the HTML with provided data.
 * @param {string} title - The title of the video.
 * @param {string} cName - The name of the channel.
 * @param {number} views - The total number of views for the video.
 * @param {number} monthsOld - How many months have passed since upload.
 * @param {string} duration - The duration of the video (e.g., "HH:MM:SS").
 * @param {string} thumbnailUrl - The URL for the video's thumbnail image.
 */
function populateCard(title, cName, views, monthsOld, duration, thumbnailUrl) {
    
    const thumbnailImageElement = document.querySelector('.thumbnail-image');
    const durationElement = document.querySelector('.video_duration');
    const titleElement = document.querySelector('.video_title h3');
    const channelElement = document.querySelector('.channel_Name');
    const viewsElement = document.querySelector('.video_views');
    const ageElement = document.querySelector('.video_howold');

    if (thumbnailImageElement) {
        thumbnailImageElement.src = thumbnailUrl; // Set the image source
    }
    if (durationElement) {
        durationElement.textContent = duration;
    }
    if (titleElement) {
        titleElement.textContent = title;
    }
    if (channelElement) {
        channelElement.textContent = cName;
    }
    if (viewsElement) {
        // Use the formatViews function to make the number readable
        viewsElement.textContent = `${formatViews(views)} views`;
    }
    if (ageElement) {
        ageElement.textContent = `${monthsOld} months ago`;
    }
}



populateCard(
    "Introduction to Backend | Sigma Web Dev video #2",
    "CodeWithHarry",
    597000,
    7,
    "1:31:22",
    "https://i.ytimg.com/vi/MbyqdUCyFPE/maxresdefault.jpg"
);