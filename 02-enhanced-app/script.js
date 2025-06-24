// --- HELPER FUNCTIONS (Your original functions are perfect, no changes here) ---

function formatViews(num) {
    if (num >= 1000000) { return (num / 1000000).toFixed(1) + 'M'; }
    if (num >= 1000) { return Math.round(num / 1000) + 'K'; }
    return num;
}

function formatDuration(inputString) {
    if (!inputString) return "0:00";
    if (inputString.includes(':')) { return inputString; }
    const digitsOnly = inputString.replace(/\D/g, '');
    if (digitsOnly.length === 0) return "0:00";
    const paddedDigits = digitsOnly.padStart(2, '0');
    const seconds = paddedDigits.slice(-2);
    const minutesRaw = paddedDigits.slice(-4, -2);
    const hoursRaw = paddedDigits.slice(0, -4);
    if (hoursRaw) {
        const minutes = minutesRaw.padStart(2, '0');
        return `${hoursRaw}:${minutes}:${seconds}`;
    }
    if (minutesRaw) { return `${minutesRaw}:${seconds}`; }
    return `0:${seconds}`;
}

function formatAge(totalMonths) {
    if (totalMonths < 0) {
        const futureMonths = Math.abs(totalMonths);
        const yearText = futureMonths === 1 ? 'month' : 'months';
        return `Uploading in ${futureMonths} ${yearText}`;
    }
    if (totalMonths === 0) { return "This month"; }
    if (totalMonths < 12) { return `${totalMonths} ${totalMonths === 1 ? 'month' : 'months'} old`; }
    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;
    const yearText = `${years} ${years === 1 ? 'year' : 'years'}`;
    if (remainingMonths === 0) {
        return `${yearText} old`;
    } else {
        const monthText = `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
        return `${yearText}, ${monthText} old`;
    }
}

/**
 * Creates a complete video card HTML element. (Your function is great, no changes needed).
 */
function createVideoCard(videoData) {
    const card = document.createElement('div');
    card.className = 'maincontainer';
    const container1 = document.createElement('div');
    container1.className = 'maincontainer1';
    const thumbnailDiv = document.createElement('div');
    thumbnailDiv.className = 'thumbnail_url';
    const thumbnailImg = document.createElement('img');
    thumbnailImg.className = 'thumbnail-image';
    thumbnailImg.src = videoData.thumbnailUrl;
    thumbnailImg.alt = "Video Thumbnail";
    const durationSpan = document.createElement('div');
    durationSpan.className = 'video_duration';
    thumbnailDiv.append(thumbnailImg, durationSpan);
    container1.append(thumbnailDiv);
    const container2 = document.createElement('div');
    container2.className = 'maincontainer2';
    const titleDiv = document.createElement('div');
    titleDiv.className = 'video_title';
    const titleH3 = document.createElement('h3');
    titleDiv.append(titleH3);
    const channelSpan = document.createElement('span');
    channelSpan.className = 'channel_Name line-2';
    const viewsSpan = document.createElement('span');
    viewsSpan.className = 'video_views line-2';
    const ageSpan = document.createElement('span');
    ageSpan.className = 'video_howold line-2';

    if (videoData.monthsOld < 0) {
        card.classList.add('future-card');
        titleH3.textContent = "CLASSIFIED: Temporal Anomaly";
        channelSpan.textContent = "Dept. of Chrono-Integrity";
        viewsSpan.textContent = "??? views";
        durationSpan.textContent = "??:??";
        ageSpan.textContent = formatAge(videoData.monthsOld);
    } else {
        titleH3.textContent = videoData.title;
        channelSpan.textContent = videoData.channelName;
        viewsSpan.textContent = `${formatViews(videoData.views)} views`;
        durationSpan.textContent = videoData.duration;
        ageSpan.textContent = formatAge(videoData.monthsOld);
    }

    const createSeparator = () => {
        const sep = document.createElement('span');
        sep.textContent = ' • ';
        sep.style.margin = "0 4px";
        return sep;
    };

    container2.append(titleDiv, channelSpan, createSeparator(), viewsSpan, createSeparator(), ageSpan);
    card.append(container1, container2);
    return card;
}


// --- MAIN EXECUTION ---
const videoForm = document.getElementById('video-form');
const cardContainer = document.getElementById('card-container');
const durationInput = document.getElementById('duration');

videoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(videoForm);
    
    // --- NEW: Input Validation ---
    const title = formData.get('title');
    const channelName = formData.get('channelName');
    const views = formData.get('views');
    const monthsOld = formData.get('monthsOld');
    const duration = formData.get('duration');
    const thumbnailUrl = formData.get('thumbnailUrl');
    
    // Check if any field is empty
    if (!title || !channelName || !views || !monthsOld || !duration || !thumbnailUrl) {
        alert("Please fill out all fields before creating a card.");
        return; // Stop the function if validation fails
    }
    
    // --- END NEW ---

    const newVideoData = {
        title,
        channelName,
        views: parseInt(views),
        monthsOld: parseInt(monthsOld),
        duration: formatDuration(duration),
        thumbnailUrl
    };
    const newCard = createVideoCard(newVideoData);
    cardContainer.prepend(newCard); // prepend adds the new card to the top
    videoForm.reset(); // Clear the form fields
});

// Auto-formats the duration when the user clicks away
durationInput.addEventListener('blur', () => {
    durationInput.value = formatDuration(durationInput.value);
});

// On page load, create and display the initial card
const initialCard = createVideoCard({
    thumbnailUrl: "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw",
    duration: "31:22",
    title: "Introduction to Backend | Sigma Web Dev video #2",
    channelName: "CodeWithHarry",
    views: 560000,
    monthsOld: 7
});
cardContainer.append(initialCard);