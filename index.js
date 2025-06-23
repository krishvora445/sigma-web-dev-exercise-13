
// function createCard(thumbnail_url, video_duration, video_title, channel_Name, video_views, video_howold){
//     // Finish this function
// }


// createCard("Introduction to Backend | Sigma Web Dev video #2", "CodeWithHarry", 560000, 7, "31:22", "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw")
 


// --- Function to format large numbers (e.g., views) ---
        function formatViews(num) {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + 'M';
            }
            if (num >= 1000) {
                return (num / 1000).toFixed(0) + 'K';
            }
            return num; 
        }   



        let a = formatViews(12020)

        console.log("krish",a);
