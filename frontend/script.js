// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navItems = document.querySelector('.nav-items');
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        navItems.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navItems.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = event.target.closest('.navbar');
        if (!isClickInsideNav && navItems.classList.contains('active')) {
            navItems.classList.remove('active');
        }
    });

    // Menu Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter menu categories
            menuCategories.forEach(category => {
                if (filterValue === 'all') {
                    category.classList.remove('hidden');
                } else {
                    const categoryValue = category.getAttribute('data-category');
                    if (categoryValue === filterValue) {
                        category.classList.remove('hidden');
                    } else {
                        category.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Booking Form Submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const people = document.getElementById('people').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            // Show confirmation message
            alert(`Reservation confirmed for ${people} people on ${date} at ${time}. Thank you for booking at The Table!`);
            
            // Reset form
            this.reset();
        });
    }

    // Inject a square (1:1) image into each menu item if not present.
    // If a menu-item has `data-img="path/to/img.png"`, use that; otherwise use placeholder.
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (!item.querySelector('img.item-img')) {
            const img = document.createElement('img');
            const src = item.getAttribute('data-img') || 'images/logo.png';
            img.src = src;
            img.alt = item.querySelector('.item-name')?.textContent.trim() || 'menu item';
            img.className = 'item-img';
            // insert image as first child so it sits on the left
            item.insertBefore(img, item.firstChild);
        }
    });

    // Carousel Functionality - SIMPLIFIED & ROBUST
    console.log('Starting carousel setup...');
    
    setTimeout(function() {
        console.log('Carousel timeout executed');
        
        const galleryImages = document.querySelectorAll('.gallery-img');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        console.log('Gallery Images:', galleryImages.length);
        console.log('Indicators:', indicators.length);
        console.log('Prev Button Found:', !!prevBtn);
        console.log('Next Button Found:', !!nextBtn);

        if (!prevBtn || !nextBtn || galleryImages.length === 0) {
            console.error('Missing required elements!');
            return;
        }

        let currentIndex = 0;

        function showImage(index) {
            console.log('Switching to image:', index);
            
            // Hide all images
            galleryImages.forEach((img) => {
                img.classList.remove('active');
            });

            // Show only current image
            if (galleryImages[index]) {
                galleryImages[index].classList.add('active');
            }

            // Update indicators
            indicators.forEach((indicator) => {
                indicator.classList.remove('active');
            });
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentIndex);
        }

        // Attach click handlers to buttons
        console.log('Attaching click handlers...');

        nextBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('⭐ NEXT BUTTON CLICKED');
            nextImage();
            return false;
        };

        prevBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('⭐ PREVIOUS BUTTON CLICKED');
            prevImage();
            return false;
        };

        // Make buttons clickable with direct event binding
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('⭐ NEXT BUTTON CLICKED (addEventListener)');
            nextImage();
        }, true);

        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('⭐ PREVIOUS BUTTON CLICKED (addEventListener)');
            prevImage();
        }, true);

        // Add indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('⭐ INDICATOR CLICKED:', index);
                currentIndex = index;
                showImage(index);
                return false;
            };

            indicator.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('⭐ INDICATOR CLICKED (addEventListener):', index);
                currentIndex = index;
                showImage(index);
            }, true);
        });

        console.log('✅ Carousel setup complete!');
    }, 50);
});
