const dashboard = {
    init: function() {
        this.loadDashboardStats();
        this.setupEventListeners();
        this.updateUIElements();
    },

    setupEventListeners: function() {
        // Setup navigation
        document.querySelectorAll('.sidebar nav a').forEach(link => {
            link.addEventListener('click', this.handleNavigation.bind(this));
        });

        // Setup logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', this.handleLogout.bind(this));
        }
    },

    handleNavigation: function(e) {
        e.preventDefault();
        const page = e.target.dataset.page;
        
        // Update active state
        document.querySelectorAll('.sidebar nav a').forEach(link => 
            link.classList.remove('active'));
        e.target.classList.add('active');
        
        this.loadContent(page);
    },

    loadDashboardStats: function() {
        // In real application, these would be API calls
        const stats = {
            totalStudents: 150,
            totalTeachers: 15,
            activeCourses: 10,
            totalRevenue: 15000
        };

        this.updateStats(stats);
    },

    updateStats: function(stats) {
        document.getElementById('totalStudents').textContent = stats.totalStudents;
        document.getElementById('totalTeachers').textContent = stats.totalTeachers;
        document.getElementById('activeCourses').textContent = stats.activeCourses;
        document.getElementById('totalRevenue').textContent = 
            `$${stats.totalRevenue.toLocaleString()}`;
    },

    loadContent: function(page) {
        const contentArea = document.getElementById('contentArea');
        
        switch(page) {
            case 'dashboard':
                this.loadDashboardContent();
                break;
            case 'students':
                this.loadStudentContent();
                break;
            case 'teachers':
                this.loadTeacherContent();
                break;
            // Add other cases
        }
    },

    loadStudentContent: function() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="student-management">
                <h2>Student Management</h2>
                <div class="action-buttons">
                    <button onclick="dashboard.addStudent()">Add New Student</button>
                    <button onclick="dashboard.importStudents()">Import Students</button>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="studentTableBody">
                    </tbody>
                </table>
            </div>
        `;
        this.loadStudentData();
    },

    handleLogout: function() {
        auth.logout();
    },

    updateUIElements: function() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            document.getElementById('userName').textContent = user.username;
        }
    }
};

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    dashboard.init();
});