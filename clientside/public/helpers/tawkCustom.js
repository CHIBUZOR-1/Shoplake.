// Ensure Tawk_API is defined
if (window.Tawk_API) {
    Tawk_API.onLoad = function () {
        // Your custom logic
        Tawk_API.minimize();

        const backButton = document.querySelector('.tawk-icon-back');
        if (backButton) backButton.style.display = 'none';

        const breadcrumbs = document.querySelector('.tawk-breadcrumbs');
        if (breadcrumbs) breadcrumbs.style.display = 'none';
    };
} else {
    console.error("Tawk_API is not defined. Make sure the Tawk.to script is loaded before running this custom script.");
}
