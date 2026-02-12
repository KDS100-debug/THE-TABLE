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
});
