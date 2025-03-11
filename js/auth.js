const auth = {
    init: function() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }
    },

    handleLogin: function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (this.validateCredentials(username, password)) {
            this.authenticateUser(username, password);
        }
    },

    validateCredentials: function(username, password) {
        if (!username || !password) {
            this.showError('Please enter both username and password');
            return false;
        }
        return true;
    },

    authenticateUser: function(username, password) {
        // In real application, this would be an API call
        if (username === 'admin' && password === 'admin123') {
            const userData = {
                username: username,
                role: 'admin',
                token: 'sample-token-' + Date.now()
            };
            
            localStorage.setItem('user', JSON.stringify(userData));
            this.redirectToDashboard();
        } else {
            this.showError('Invalid credentials');
        }
    },

    redirectToDashboard: function() {
        window.location.href = 'dashboard.html';
    },

    showError: function(message) {
        alert(message); // In real app, use better error handling
    },

    logout: function() {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
};

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    auth.init();
});