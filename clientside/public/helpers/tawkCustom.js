//POLLING MECHANISM
(function waitForTawkAPI() {
    if (window.Tawk_API) {
        // Proceed with your custom logic
        Tawk_API.onLoad = function () {
            Tawk_API.minimize();

            const backButton = document.querySelector('.tawk-icon-back');
            if (backButton) backButton.style.display = 'none';

            const breadcrumbs = document.querySelector('.tawk-breadcrumbs');
            if (breadcrumbs) breadcrumbs.style.display = 'none';
        };
    } else {
        console.log("Waiting for Tawk_API to load...");
        setTimeout(waitForTawkAPI, 100); // Check again in 100ms
    }
})();

