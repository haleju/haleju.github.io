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
                    const [videoPath, videoTitle, thumbnailPath] = entry.split(',');

                    // Create a thumbnail container div
                    const thumbnailContainer = document.createElement('div');
                    thumbnailContainer.classList.add('thumbnail-container');

                    // Create an anchor (link) element to video.html
                    const videoLink = document.createElement('a');
                    videoLink.href = 'video.html?src=' + encodeURIComponent(videoPath) + '&title=' + encodeURIComponent(videoTitle);

                    // Create a title element
                    const titleElement = document.createElement('h2');
                    titleElement.textContent = videoTitle;
                    
                    // Create an image element for the thumbnail
                    const thumbnailImage = document.createElement('img');
                    thumbnailImage.src = thumbnailPath;
                    thumbnailImage.alt = videoTitle;

                    // Append thumbnail image and title to the anchor
                    videoLink.appendChild(titleElement);
                    videoLink.appendChild(thumbnailImage);

                    // Append the anchor to the thumbnail container
                    thumbnailContainer.appendChild(videoLink);

                    // Append the container to the video section with the category label
                    if (currentCategory) {
                        const categoryLabel = document.createElement('h2');
                        categoryLabel.textContent = currentCategory;
                        categoryLabel.classList.add('category');
                        videoSection.appendChild(categoryLabel);
                        currentCategory = null; // Reset the category label
                    }
                    videoSection.appendChild(thumbnailContainer);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching videos:', error);
        });
});
