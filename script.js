document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const overlayImage = document.getElementById('overlayImage');
    const overlayCaption = document.getElementById('overlayCaption');
    const closeOverlay = document.getElementById('closeOverlay');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');

    let currentImgIndex = 0;
    const images = [...document.querySelectorAll('[data-img]')];

    // Function to open the overlay with the specified image
    function openOverlay(imgSrc, caption = '') {
        overlayImage.src = imgSrc;
        overlayCaption.textContent = caption || '';
        overlay.style.display = 'flex';
    }

    // Function to close the overlay
    function closeOverlayHandler() {
        overlay.style.display = 'none';
        overlayImage.src = ''; // Reset image
        overlayCaption.textContent = ''; // Reset caption
    }

    // Function to navigate images
    function navigateOverlay(direction) {
        currentImgIndex = (currentImgIndex + direction + images.length) % images.length;
        const imgElement = images[currentImgIndex];
        const imgSrc = imgElement.getAttribute('data-img');
        const caption = imgElement.getAttribute('data-caption');
        openOverlay(imgSrc, caption);
    }

    // Add click event listeners to all clickable elements with `data-img`
    images.forEach((element, index) => {
        element.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const imgSrc = element.getAttribute('data-img');
            const caption = element.getAttribute('data-caption');
            if (imgSrc) {
                currentImgIndex = index; // Update current image index
                openOverlay(imgSrc, caption);
            }
        });
    });

    // Event listeners for overlay navigation
    nextButton.addEventListener('click', () => navigateOverlay(1));
    prevButton.addEventListener('click', () => navigateOverlay(-1));

    // Event listener for closing the overlay
    closeOverlay.addEventListener('click', closeOverlayHandler);

    // Event listener for closing the overlay when clicking outside the image
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeOverlayHandler();
        }
    });

    // Keyboard shortcuts for navigation and closing
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeOverlayHandler();
        } else if (event.key === 'ArrowRight') {
            navigateOverlay(1);
        } else if (event.key === 'ArrowLeft') {
            navigateOverlay(-1);
        }
    });
});
