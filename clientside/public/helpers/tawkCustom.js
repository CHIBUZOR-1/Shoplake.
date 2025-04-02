Tawk_API = Tawk_API || {};
Tawk_API.onLoad = function() {
    Tawk_API.minimize();
    const backButton = document.querySelector('.tawk-icon-back');
    if (backButton) backButton.style.display = 'none';

    // Hide breadcrumbs
    const breadcrumbs = document.querySelector('.tawk-breadcrumbs');
    if (breadcrumbs) breadcrumbs.style.display = 'none';
};
