/**
 * dbService.js
 * Mock database service using localStorage to simulate application storage.
 */

const DB_KEY = 'pathfinder_applications';

export const dbService = {
    /**
     * Save a new application
     * @param {Object} applicationData 
     * @returns {string} The generated Application ID
     */
    saveApplication: (applicationData) => {
        const apps = JSON.parse(localStorage.getItem(DB_KEY) || '[]');

        // Check for duplicate (by phone or email)
        const exists = apps.find(a => a.phone === applicationData.phone || a.email === applicationData.email);
        if (exists) {
            throw new Error('An application with this email or phone number already exists.');
        }

        const appId = 'APP' + Math.floor(1000 + Math.random() * 9000);
        const newApp = {
            ...applicationData,
            appId,
            status: 'Pending Review',
            timestamp: new Date().toISOString(),
        };

        apps.push(newApp);
        localStorage.setItem(DB_KEY, JSON.stringify(apps));
        return appId;
    },

    /**
     * Log an error for the admin panel
     */
    logError: (errorDetail) => {
        const logs = JSON.parse(localStorage.getItem('pathfinder_logs') || '[]');
        logs.push({
            ...errorDetail,
            timestamp: new Date().toISOString(),
        });
        localStorage.setItem('pathfinder_logs', JSON.stringify(logs));
    },

    /**
     * Get all applications
     */
    getApplications: () => {
        return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    }
};
