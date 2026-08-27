// Utility functions for Humanity Compass

document.addEventListener('DOMContentLoaded', function() {
    // Utils initialization
    console.log('Utils module loaded');
});

// Export utility functions
window.Utils = {
    // Debounce function for limiting rate of function calls
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for limiting rate of function calls
    throttle: function(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Local storage helpers
    storage: {
        get: function(key, defaultValue = null) {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        },
        set: function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        remove: function(key) {
            localStorage.removeItem(key);
        },
        clear: function() {
            localStorage.clear();
        }
    },

    // Format numbers with commas
    formatNumber: function(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Calculate percentage
    calculatePercentage: function(part, total) {
        return total === 0 ? 0 : Math.round((part / total) * 100);
    },

    // Get random item from array
    getRandomItem: function(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    // Shuffle array (Fisher-Yates algorithm)
    shuffleArray: function(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },

    // Truncate text with ellipsis
    truncateText: function(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    },

    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Add comma to numbers
    addCommas: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};