class Dashboard {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadDashboardData();
        this.setupAutoRefresh();
    }

    async loadDashboardData() {
        try {
            const data = await FloodMonitoringAPI.getDashboardData();
            this.updateStats(data.stats);
            this.updateRecentAlerts(data.recentAlerts);
            this.renderWaterLevelChart(data.waterLevelData);
        } catch (error) {
            this.showError('Failed to load dashboard data');
        }
    }

    updateStats(stats) {
        const statsGrid = document.getElementById('statsGrid');
        
        const statsHTML = `
            <div class="stat-card">
                <div class="stat-label">Active Stations</div>
                <div class="stat-value">${stats.activeStations}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Current Alerts</div>
                <div class="stat-value ${stats.currentAlerts > 0 ? 'risk-high' : 'risk-low'}">${stats.currentAlerts}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Avg Water Level</div>
                <div class="stat-value">${stats.avgWaterLevel}m</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">System Status</div>
                <div class="stat-value">
                    <span class="status-indicator ${stats.systemStatus === 'normal' ? 'status-normal' : 'status-warning'}"></span>
                    ${stats.systemStatus}
                </div>
            </div>
        `;

        statsGrid.innerHTML = statsHTML;
    }

    updateRecentAlerts(alerts) {
        const alertsContainer = document.getElementById('recentAlerts');
        
        if (alerts.length === 0) {
            alertsContainer.innerHTML = '<div class="alert-item normal">No recent alerts</div>';
            return;
        }

        const alertsHTML = alerts.map(alert => `
            <div class="alert-item ${alert.severity}">
                <strong>${alert.title}</strong>
                <p>${alert.message}</p>
                <div class="alert-time">${new Date(alert.timestamp).toLocaleString()}</div>
            </div>
        `).join('');

        alertsContainer.innerHTML = alertsHTML;
    }

    renderWaterLevelChart(data) {
        // Simple chart implementation - you can integrate Chart.js or similar
        const chartContainer = document.getElementById('waterLevelChart');
        
        if (data && data.length > 0) {
            chartContainer.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <h4>Latest Reading: ${data[data.length - 1].value}m</h4>
                    <p>Chart visualization would be implemented with a charting library</p>
                </div>
            `;
        } else {
            chartContainer.innerHTML = '<p>No water level data available</p>';
        }
    }

    setupAutoRefresh() {
        // Refresh data every 30 seconds
        setInterval(() => {
            this.loadDashboardData();
        }, 30000);
    }

    showError(message) {
        // Simple error display
        alert(message);
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});