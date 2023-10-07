document.addEventListener("DOMContentLoaded", function () {
    // Fetch the content of the videos.txt file
    fetch('videos.txt')
        .then(response => response.text())
        .then(data => {
            const videoSection = document.getElementById('video-section');
            const videoEntries = data.split('\n');
            let currentCategory = null; // Track the current category
            
            videoEntries.forEach(entry => {
                if (entry.startsWith('#')) {
                    // If the line starts with '#', it's a category label
                    currentCategory = entry.replace('#', '').trim();
                } else {
                    const [videoPath, videoTitle, ...otherInfo] = entry.split(',');
                    
                    // Create a video container div
                    const videoContainer = document.createElement('div');
                    videoContainer.classList.add('video-container');
                    
                    // Create a title element
                    const titleElement = document.createElement('h2');
                    titleElement.textContent = videoTitle;
                    
                    // Create a video element
                    const videoElement = document.createElement('video');
                    videoElement.src = videoPath;
                    videoElement.controls = true;
                    
                    // Append title and video to the container
                    videoContainer.appendChild(titleElement);
                    videoContainer.appendChild(videoElement);
                    
                    // Append the container to the video section with the category label
                    if (currentCategory) {
                        const categoryLabel = document.createElement('h2');
                        categoryLabel.textContent = currentCategory;
                        categoryLabel.classList.add('category');
                        videoSection.appendChild(categoryLabel);
                        currentCategory = null; // Reset the category label
                    }
                    videoSection.appendChild(videoContainer);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching videos:', error);
        });
});
