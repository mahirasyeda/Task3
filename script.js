document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    setupSlider();
    setupAccordion();
    fetchDataFromAPI();
});

// Tabs Functionality
function openTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');

    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

    // Optionally, set the default active tab
    tabButtons[0].click(); // Trigger click to activate the first tab by default


// Slider Functionality
function setupSlider() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slides img');

    function showSlides() {
        slides.forEach((slide, index) => {
            slide.style.display = 'none'; // Hide all slides
        });
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1; } // Reset index if out of bounds
        slides[slideIndex - 1].style.display = 'block'; // Show the current slide
    }

    function nextSlide() {
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1; }
        showSlides();
    }

    function prevSlide() {
        slideIndex--;
        if (slideIndex < 1) { slideIndex = slides.length; }
        showSlides();
    }

    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    showSlides(); // Initial call to start the slider
    setInterval(nextSlide, 3000); // Auto slide every 3 seconds
}

// Accordion Functionality
function setupAccordion() {
    const buttons = document.querySelectorAll('.accordion-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isCurrentlyVisible = content.style.display === 'block';

            // Close all accordion contents
            document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
            document.querySelectorAll('.accordion-button').forEach(b => b.classList.remove('active'));

            // Open clicked section if it was not already open
            if (!isCurrentlyVisible) {
                content.style.display = 'block';
                button.classList.add('active');
            }
        });
    });
}

// Fetch Data from API and Display Dynamically
function fetchDataFromAPI() {
    const apiURL = 'https://jsonplaceholder.typicode.com/posts';

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            container.innerHTML = data.map(post => `
                <div class="api-data">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}