// Issues exploration functionality for Humanity Compass

document.addEventListener('DOMContentLoaded', function() {
    // Issues module initialization
    console.log('Issues module loaded');
});

// Export functions for use in other modules if needed
window.IssuesExplorer = {
    // Get issue data (in a real app, this might come from a local JSON file)
    getIssueData: function(issueType) {
        // Mock data for demonstration
        const issueData = {
            climate: {
                title: "Climate Change",
                perspectives: [
                    {
                        group: "Small Island Nations",
                        view: "Face existential threat from sea-level rise; need immediate global action.",
                        concerns: ["Loss of territory", "Cultural displacement", "Economic devastation"]
                    },
                    {
                        group: "Farming Communities",
                        view: "Experience changing growing seasons and extreme weather; need adaptation support.",
                        concerns: ["Crop failure", "Water scarcity", "Livelihood instability"]
                    },
                    {
                        group: "Energy Industry Workers",
                        view: "Concerned about job transitions; need just transition policies.",
                        concerns: ["Unemployment", "Community impact", "Skill retraining"]
                    },
                    {
                        group: "Future Generations",
                        view: "Will inherit a drastically altered planet; demand intergenerational justice.",
                        concerns: ["Habitability", "Resource scarcity", "Inherited debt"]
                    }
                ],
                dataPoints: [
                    { label: "Global Temperature Increase", value: "+1.2°C since 1880", trend: "up" },
                    { label: "Sea Level Rise", value: "+20cm since 1900", trend: "up" },
                    { label: "Extreme Weather Events", value: "5x increase since 1970", trend: "up" }
                ]
            },
            health: {
                title: "Global Health",
                perspectives: [
                    {
                        group: "Rural Communities",
                        view: "Lack access to nearby healthcare facilities; need mobile clinics and telemedicine.",
                        concerns: ["Travel distance", "Specialist availability", "Emergency response"]
                    },
                    {
                        group: "Urban Poor",
                        view: "Face overburdened public health systems; need investment in public infrastructure.",
                        concerns: ["Wait times", "Quality of care", "Preventive care access"]
                    },
                    {
                        group: "Healthcare Workers",
                        view: "Experience burnout and resource shortages; need better support and compensation.",
                        concerns: ["Staffing levels", "Mental health", "Safety equipment"]
                    },
                    {
                        group: "Pharmaceutical Patients",
                        view: "Struggle with medication costs; need pricing reforms and generic alternatives.",
                        concerns: ["Affordability", "Insurance coverage", "Access to innovation"]
                    }
                ],
                dataPoints: [
                    { label: "Global Life Expectancy", value: "72.6 years (2019)", trend: "up" },
                    { label: "Infant Mortality", value: "28 per 1,000 live births", trend: "down" },
                    { label: "Healthcare Access", value: "50% lack essential services", trend: "stable" }
                ]
            }
            // Other issues would follow similar structure
        };

        return issueData[issueType] || null;
    },

    // Generate perspective cards HTML
    generatePerspectiveCards: function(perspectives) {
        return perspectives.map(p => `
            <div class="perspective-card">
                <h5>${p.group}</h5>
                <p><strong>View:</strong> ${p.view}</p>
                <p><strong>Concerns:</strong> ${p.concerns.join(', ')}</p>
            </div>
        `).join('');
    },

    // Generate data points HTML
    generateDataPoints: function(dataPoints) {
        return dataPoints.map(dp => `
            <div class="data-point">
                <span class="label">${dp.label}:</span>
                <span class="value ${dp.trend}">${dp.value}</span>
            </div>
        `).join('');
    }
};