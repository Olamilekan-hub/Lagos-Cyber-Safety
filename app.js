document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('Year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});

document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu-button');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuIcon = document.getElementById('menu-icon');
    let navBarOpen = false;

    menuButton.addEventListener('click', () => {
        navBarOpen = !navBarOpen;
        if (navBarOpen) {
            menuOverlay.classList.remove('hidden');
            menuIcon.innerHTML = `
                <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `;
        } else {
            menuOverlay.classList.add('hidden');
            menuIcon.innerHTML = `
                <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            `;
        }
    });
});

 // Close menu when any button in the overlay is clicked
    const menuButtons = menuOverlay.querySelectorAll('a'); // Assuming buttons inside overlay
    menuButtons.forEach(a => {
        a.addEventListener('click', () => {
            navBarOpen = false;
            menuOverlay.classList.add('hidden');
            menuIcon.innerHTML = `
                <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            `;
        });
    });
});
