document.addEventListener("DOMContentLoaded", function () {
    const videoContainer = document.getElementById('video-container');
    const titleElement = document.getElementById('title');
    const pageTitleElement = document.getElementById('video-title');

    // Get the video source and title from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const videoSource = urlParams.get('src');
    const videoTitle = urlParams.get('title');
    
    // Set the title of the page and video
    titleElement.textContent = videoTitle;
    pageTitleElement.textContent = videoTitle;

    
    // Create a video element
    const videoElement = document.createElement('video');
    videoElement.src = videoSource;
    videoElement.controls = true;
    
    // Append the video to the video container
    videoContainer.appendChild(videoElement);
});
