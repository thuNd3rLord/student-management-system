// Main application logic
const app = {
    init: function() {
        this.loadUserData();
        this.attachEventListeners();
        this.checkAuthentication();
    },

    loadUserData: function() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.updateUIWithUserData(user);
        }
    },

    attachEventListeners: function() {
        // Global event listeners
        document.addEventListener('click', function(e) {
            if (e.target.matches('.nav-link')) {
                app.handleNavigation(e);
            }
        });
    },

    checkAuthentication: function() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user && window.location.pathname !== '/index.html') {
            window.location.href = 'index.html';
        }
    },

    handleNavigation: function(e) {
        e.preventDefault();
        const page = e.target.dataset.page;
        this.loadPage(page);
    },

    loadPage: function(page) {
        // Handle page loading logic
        switch(page) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'students':
                this.loadStudents();
                break;
            // Add other pages
        }
    },

    updateUIWithUserData: function(user) {
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = user.username;
        }
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    app.init();
});