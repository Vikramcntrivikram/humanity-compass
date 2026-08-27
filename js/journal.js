// Journal functionality for Humanity Compass

document.addEventListener('DOMContentLoaded', function() {
    // Journal initialization
    console.log('Journal module loaded');

    // Additional journal-specific functionality could be added here
});

// Export functions for use in other modules if needed
window.JournalFunctions = {
    // Save a journal entry
    saveEntry: function(prompt, response) {
        const entry = {
            date: new Date().toDateString(),
            prompt: prompt,
            response: response,
            timestamp: new Date().toISOString()
        };

        const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        entries.push(entry);
        localStorage.setItem('journalEntries', JSON.stringify(entries));

        return entry;
    },

    // Get all journal entries
    getEntries: function() {
        return JSON.parse(localStorage.getItem('journalEntries') || '[]');
    },

    // Clear all journal entries
    clearEntries: function() {
        localStorage.removeItem('journalEntries');
    },

    // Get entries for a specific date
    getEntriesByDate: function(dateString) {
        const entries = this.getEntries();
        return entries.filter(entry => entry.date === dateString);
    }
};