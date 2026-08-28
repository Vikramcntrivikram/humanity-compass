// Main JavaScript functionality for Humanity Compass

document.addEventListener('DOMContentLoaded', function() {
    // Initialize current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    themeToggle.addEventListener('click', function() {
        const isDark = htmlElement.getAttribute('data-theme') === 'dark';
        htmlElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.setAttribute('aria-label', isDark ? 'Enable dark mode' : 'Enable light mode');

        // Save preference to localStorage
        localStorage.setItem('theme', isDark ? 'light' : 'dark');

        // Play click sound for accessibility feedback
        playClickSound();
    });

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        themeToggle.setAttribute('aria-label', savedTheme === 'dark' ? 'Enable light mode' : 'Enable dark mode');
    }

    // Language switch (placeholder - in a real implementation this would load different language files)
    const languageSwitch = document.getElementById('language-switch');
    languageSwitch.addEventListener('click', function() {
        // Cycle through languages: EN -> ES -> FR -> EN
        const currentLang = languageSwitch.textContent;
        let nextLang;
        switch(currentLang) {
            case 'EN':
                nextLang = 'ES';
                break;
            case 'ES':
                nextLang = 'FR';
                break;
            case 'FR':
                nextLang = 'EN';
                break;
            default:
                nextLang = 'EN';
        }
        languageSwitch.textContent = nextLang;
        // In a real app, you would load language resources here
        playClickSound();
    });

    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('main-content').focus();
    });

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    // Open modals
    document.getElementById('try-perspective').addEventListener('click', function() {
        openModal('perspective-modal');
        loadPerspectiveExercise();
    });

    document.getElementById('open-journal').addEventListener('click', function() {
        openModal('journal-modal');
        loadJournalEntries();
    });

        document.getElementById('try-systems').addEventListener('click', function() {
        openModal('systems-modal');
    });

    document.getElementById('try-culture').addEventListener('click', function() {
        openModal('culture-modal');
    });

    document.getElementById('try-ethics').addEventListener('click', function() {
        openModal('ethics-modal');
    });

    document.getElementById('open-tracker').addEventListener('click', function() {
        openModal('tracker-modal');
    });

    document.getElementById('open-insights').addEventListener('click', function() {
        openModal('insights-modal');
    });

    document.getElementById('download-guide').addEventListener('click', function() {
        alert('Generate a personalized action guide from the "Discover My Path" quiz above first — then this button will create your custom guide.');
    });

    // Close modals
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.visible');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });

    // Canvas drawing for hero section
    const canvas = document.getElementById('compass-canvas');
    if (canvas.getContext) {
        drawCompass(canvas);
    }

    // Issue card interactions
    const issueButtons = document.querySelectorAll('.issue-btn');
    issueButtons.forEach(button => {
        button.addEventListener('click', function() {
            const issueCard = button.closest('.issue-card');
            const issueType = issueCard.getAttribute('data-issue');
            // In a real implementation, this would open a detailed view of the issue
            showIssueDetails(issueType);
            playClickSound();
        });
    });

    // Action finder form
    const actionForm = document.getElementById('action-finder-form');
    actionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        findActionPath();
        playClickSound();
    });

    // Daily reflection
    loadDailyReflection();

    // Set up periodic updates for daily reflection (at midnight)
    setUpDailyReflectionUpdate();

    // Add hover/focus effects for better accessibility
    setupAccessibilityEnhancements();
});

// Helper Functions

function playClickSound() {
    const clickSound = document.getElementById('click-sound');
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log("Audio play failed:", e));
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    // Trigger reflow to enable transition
    void modal.offsetWidth;
    modal.classList.add('visible');
    // Focus on first focusable element
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

function closeModal(modal) {
    modal.classList.remove('visible');
    // Wait for transition to complete before hiding
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); // Match CSS transition duration
}

function drawCompass(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.4;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw cardinal points
    const points = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const pointRadius = radius * 0.85;

    points.forEach((point, index) => {
        const angle = (index * Math.PI / 4) - (Math.PI / 2); // Start at top
        const x = centerX + Math.cos(angle) * pointRadius;
        const y = centerY + Math.sin(angle) * pointRadius;

        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(point, x, y);
    });

    // Draw center marker
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    ctx.fill();

    // Draw animated needle (simple rotation)
    let angle = 0;
    function animateNeedle() {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);

        // Needle
        ctx.beginPath();
        ctx.moveTo(0, -radius * 0.6);
        ctx.lineTo(5, radius * 0.2);
        ctx.lineTo(0, 0);
        ctx.lineTo(-5, radius * 0.2);
        ctx.closePath();
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--danger-color');
        ctx.fill();

        ctx.restore();

        angle += 0.01; // Slow rotation
        if (angle > 2 * Math.PI) angle = 0;

        requestAnimationFrame(animateNeedle);
    }

    animateNeedle();
}

function loadPerspectiveExercise() {
    const modalBody = document.querySelector('#perspective-modal .modal-body');
    modalBody.innerHTML = `
        <div class="exercise-container">
            <h4>Walk in Their Shoes</h4>
            <p class="exercise-instructions">
                This exercise helps you practice seeing situations from different perspectives.
                Read the scenario below and consider how different people might experience it.
            </p>

            <div class="scenario">
                <h5>Scenario: Community Resource Allocation</h5>
                <p>
                    A small town has received funding to improve one community facility.
                    The options are: renovating the public library, expanding the youth sports complex,
                    or creating a senior center. Different community members have different priorities.
                </p>
            </div>

            <div class="perspectives">
                <div class="perspective-card">
                    <h6>Maria, 34, Single Parent</h6>
                    <p>
                        "I work two jobs and rely on the library for free internet to help my kids with homework.
                        Expanded hours would make a huge difference for our family."
                    </p>
                </div>

                <div class="perspective-card">
                    <h6>James, 16, High School Athlete</h6>
                    <p>
                        "The sports complex is where I spend most of my afternoons. Better facilities
                        would help our team compete and keep kids off the streets."
                    </p>
                </div>

                <div class="perspective-card">
                    <h6>Eleanor, 72, Retired Teacher</h6>
                    <p>
                        "Many seniors in our town are isolated. A senior center would provide
                        social connection, meals, and activities tailored to our needs."
                    </p>
                </div>

                <div class="perspective-card">
                    <h6>Town Council Perspective</h6>
                    <p>
                        "We need to consider long-term value, maintenance costs, and how many
                        residents each option would serve annually."
                    </p>
                </div>
            </div>

            <div class="reflection-questions">
                <h5>Reflection Questions:</h5>
                <ol>
                    <li>Which perspective did you initially find most compelling? Why?</li>
                    <li>How did your view change after reading all perspectives?</li>
                    <li>What values or needs are underlying each perspective?</li>
                    <li>Is there a solution that could address multiple perspectives?</li>
                </ol>
            </div>

            <textarea id="exercise-response" placeholder="Type your reflections here..." rows="4"></textarea>
            <div class="exercise-feedback">
                <p>There are no "right" answers in this exercise. The goal is to practice
                   considering multiple viewpoints before forming conclusions.</p>
            </div>
        </div>
    `;
}

function loadJournalEntries() {
    const modalBody = document.querySelector('#journal-modal .modal-body');
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');

    if (journalEntries.length === 0) {
        modalBody.innerHTML = `
            <p class="no-entries">
                No journal entries yet. Start your first reflection by clicking the
                "Save Response" button in the daily reflection section.
            </p>
        `;
        return;
    }

    modalBody.innerHTML = `
        <div class="journal-entries">
            ${journalEntries.map(entry => `
                <div class="journal-entry">
                    <div class="entry-date">
                        ${new Date(entry.timestamp).toLocaleDateString()} at
                        ${new Date(entry.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    <div class="entry-prompt">
                        <strong>Prompt:</strong> ${entry.prompt}
                    </div>
                    <div class="entry-response">
                        <strong>Your Response:</strong> ${entry.response}
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Add clear journal button
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear All Entries';
    clearButton.className = 'btn-outline';
    clearButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete all journal entries? This cannot be undone.')) {
            localStorage.removeItem('journalEntries');
            loadJournalEntries();
        }
    });
    modalBody.appendChild(clearButton);
}

function loadDailyReflection() {
    const dailyPrompt = document.getElementById('daily-prompt');
    const reflections = JSON.parse(localStorage.getItem('reflections') || '[]');
    const today = new Date().toDateString();

    // Check if we already have a reflection for today
    const todayReflection = reflections.find(r => r.date === today);

    if (todayReflection) {
        dailyPrompt.innerHTML = `
            <p><strong>Today's Reflection:</strong> ${todayReflection.prompt}</p>
            <p><strong>Your Response:</strong> ${todayReflection.response}</p>
        `;
        document.getElementById('save-reflection').disabled = true;
        document.getElementById('save-reflection').textContent = 'Saved';
    } else {
        // Load a random prompt from our collection
        const prompts = [
            "When did you last change your mind about something important? What caused that change?",
            "Think of someone you disagree with. What might they be afraid of or hoping for?",
            "When have you felt like an outsider? What helped you feel more included?",
            "What assumptions do you make about people based on their appearance or accent?",
            "Describe a time when you helped someone without expecting anything in return.",
            "When have you witnessed injustice? What stopped you from intervening, or what helped you act?",
            "What does 'fairness' mean to you in different contexts (family, work, society)?",
            "How do you define 'success'? How might someone from a different background define it differently?",
            "Think of a habit or belief you inherited from your family. Do you still agree with it?",
            "When have you benefited from privilege you didn't earn? How does that affect your perspective?"
        ];

        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        dailyPrompt.innerHTML = `
            <p><strong>Today's Reflection:</strong> ${randomPrompt}</p>
            <textarea id="reflection-input" rows="3" placeholder="Share your thoughts..." aria-label="Reflection response"></textarea>
        `;
    }
}

function saveReflection() {
    const reflectionInput = document.getElementById('reflection-input');
    const dailyPrompt = document.getElementById('daily-prompt');
    const promptText = dailyPrompt.querySelector('p strong').nextSibling.textContent.trim();

    const reflection = {
        date: new Date().toDateString(),
        prompt: promptText,
        response: reflectionInput.value.trim(),
        timestamp: new Date().toISOString()
    };

    const reflections = JSON.parse(localStorage.getItem('reflections') || '[]');
    reflections.push(reflection);
    localStorage.setItem('reflections', JSON.stringify(reflections));

    // Update UI
    dailyPrompt.innerHTML = `
        <p><strong>Today's Reflection:</strong> ${promptText}</p>
        <p><strong>Your Response:</strong> ${reflection.response}</p>
    `;

    document.getElementById('save-reflection').disabled = true;
    document.getElementById('save-reflection').textContent = 'Saved';

    playClickSound();
}

function newPrompt() {
    loadDailyReflection();
    playClickSound();
}

function findActionPath() {
    const interest = document.getElementById('interest-area').value;
    const skill = document.getElementById('skill-type').value;
    const time = document.getElementById('time-commitment').value;

    if (!interest || !skill || !time) {
        alert('Please complete all fields to get your personalized path.');
        return;
    }

    const resultsDiv = document.getElementById('path-results');
    resultsDiv.classList.remove('hidden');

    // Generate personalized recommendations based on selections
    let recommendations = [];

    // Interest-based recommendations
    const interestMap = {
        environment: [
            "Join local conservation efforts or community garden projects",
            "Reduce your carbon footprint through lifestyle changes",
            "Advocate for environmental policies in your community",
            "Participate in citizen science projects"
        ],
        health: [
            "Volunteer at local health clinics or hospice centers",
            "Support mental health awareness initiatives",
            "Help organize community health fairs or vaccination drives",
            "Become a peer supporter or health educator"
        ],
        education: [
            "Tutor students or teach literacy classes",
            "Donate books or school supplies to underserved communities",
            "Mentor first-generation college students",
            "Support after-school programs in your area"
        ],
        "human-rights": [
            "Join local civil rights organizations",
            "Monitor elections or participate in peaceful advocacy",
            "Support refugee resettlement agencies",
            "Educate others about human rights issues"
        ],
        technology: [
            "Use your tech skills for nonprofit organizations",
            "Teach digital literacy to seniors or underserved communities",
            "Develop open-source tools for social good",
            "Advocate for equitable technology access"
        ],
        community: [
            "Organize neighborhood clean-ups or block parties",
            "Join your local parent-teacher association",
            "Participate in community planning meetings",
            "Start a skill-sharing workshop in your community"
        ]
    };

    // Skill-based recommendations
    const skillMap = {
        "direct-action": [
            "Hands-on volunteering opportunities",
            "Community service projects",
            "Disaster relief assistance",
            "Habitat for Humanity or similar builds"
        ],
        advocacy: [
            "Writing to elected officials",
            "Organizing awareness campaigns",
            "Public speaking on important issues",
            "Creating educational content"
        ],
        fundraising: [
            "Organizing charity events",
            "Grant writing for nonprofits",
            "Crowdfunding campaigns",
            "Corporate sponsorship development"
        ],
        technical: [
            "Website development for charities",
            "Data analysis for social causes",
            "App development for community needs",
            "IT support for nonprofits"
        ],
        creative: [
            "Designing materials for nonprofits",
            "Creating awareness through art or music",
            "Writing grant proposals or stories",
            "Video production for social causes"
        ],
        organizational: [
            "Project management for community initiatives",
            "Volunteer coordination",
            "Strategic planning for nonprofits",
            "Board service for community organizations"
        ],
        teaching: [
            "Formal or informal tutoring",
            "Workshop facilitation",
            "Mentoring programs",
            "Train-the-trainer programs"
        ],
        research: [
            "Literature reviews for social causes",
            "Data collection and analysis",
            "Policy research",
            "Needs assessment for communities"
        ]
    };

    // Time-based recommendations
    const timeMap = {
        micro: [
            "Sign online petitions (2 minutes)",
            "Share informative posts on social media (3 minutes)",
            "Donate small amounts through apps (1 minute)",
            "Make conscious purchasing decisions (ongoing)"
        ],
        occasional: [
            "Monthly volunteering (2-4 hours)",
            "Quarterly donation drives",
            "Annual participation in events",
            "Seasonal community projects"
        ],
        regular: [
            "Weekly volunteering (4-8 hours)",
            "Bi-weekly meeting participation",
            "Regular skill-sharing sessions",
            "Ongoing mentoring relationships"
        ],
        substantial: [
            "Part-time commitment (15-20 hours/week)",
            "Flexible scheduling with organizations",
            "Project-based consulting",
            "Seasonal intensive involvement"
        ],
        dedicated: [
            "Full-time volunteer positions",
            "Career transition to nonprofit sector",
            "Extended service commitments (6-12 months)",
            "Founding or leading community initiatives"
        ]
    };

    // Combine recommendations
    if (interestMap[interest]) recommendations = recommendations.concat(interestMap[interest]);
    if (skillMap[skill]) recommendations = recommendations.concat(skillMap[skill]);
    if (timeMap[time]) recommendations = recommendations.concat(timeMap[time]);

    // Remove duplicates and limit to 6
    recommendations = [...new Set(recommendations)].slice(0, 6);

    // Display results
    resultsDiv.innerHTML = `
        <h4>Your Personalized Path to Impact</h4>
        <p>Based on your interests in ${document.getElementById('interest-area').selectedOptions[0].text},
           skills in ${document.getElementById('skill-type').selectedOptions[0].text},
           and time commitment of ${document.getElementById('time-commitment').selectedOptions[0].text},
           here are some ways you can make a difference:</p>
        <ul class="recommendations-list">
            ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
        <div class="action-steps">
            <h5>Next Steps:</h5>
            <ol>
                <li>Choose one recommendation that resonates with you</li>
                <li>Research local organizations working in that area</li>
                <li>Reach out to learn about volunteer or participation opportunities</li>
                <li>Start small and build your involvement over time</li>
            </ol>
        </div>
        <button class="btn-outline" id="download-path-guide">
            Download This Guide
        </button>
    `;

    // Add download functionality
    document.getElementById('download-path-guide').addEventListener('click', function() {
        downloadActionGuide(interest, skill, time, recommendations);
    });

    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

function downloadActionGuide(interest, skill, time, recommendations) {
    const guideContent = `
Humanity Compass - Personal Action Guide
Generated on: ${new Date().toLocaleString()}

YOUR PROFILE:
- Interest Area: ${document.getElementById('interest-area').selectedOptions[0].text}
- Skills: ${document.getElementById('skill-type').selectedOptions[0].text}
- Time Commitment: ${document.getElementById('time-commitment').selectedOptions[0].text}

YOUR PERSONALIZED PATH TO IMPACT:
${recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

NEXT STEPS:
1. Choose one recommendation that resonates with you
2. Research local organizations working in that area
3. Reach out to learn about volunteer or participation opportunities
4. Start small and build your involvement over time

REFLECTION QUESTIONS TO CONSIDER:
- What motivates you to take action in this area?
- What skills or resources do you already have to contribute?
- What would you like to learn through this experience?
- How will you measure the impact of your involvement?

Remember: Small actions compound over time. Begin where you are, use what you have, do what you can.

Generated by Humanity Compass
Developed by VIKRAM CN TRIVIKRAM
    `;

    // Create blob and download
    const blob = new Blob([guideContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `humanity-compass-action-guide-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    playClickSound();
}

const issuePerspectives = {
    climate: {
        name: "Climate Change",
        perspectives: [
            { role: "Farmer in Sub-Saharan Africa", view: "Unpredictable rainfall has cut my harvests in half over ten years. Climate change isn't a future risk to me — it's why I can't feed my family the way my parents could." },
            { role: "Factory Owner", view: "Cutting emissions fast means higher costs and job losses now. I need a transition plan, not an overnight mandate, or my workers pay the price first." },
            { role: "Climate Scientist", view: "The data shows a narrowing window — every year of delay locks in worse outcomes that are far more expensive to reverse than to prevent." },
            { role: "Coastal City Resident", view: "My insurance premiums have tripled and my street floods every year now. I want action, but I also can't afford to move." }
        ],
        question: "Whose timeline should shape climate policy — the scientist's, the worker's, or the farmer's?"
    },
    health: {
        name: "Global Health",
        perspectives: [
            { role: "Rural Nurse", view: "The nearest hospital is four hours away. People die of treatable conditions simply because care isn't nearby." },
            { role: "Health Insurance Executive", view: "Expanding coverage without controlling costs bankrupts the system for everyone, including the people we're trying to help." },
            { role: "Patient with Chronic Illness", view: "I ration my medication some months because I can't afford the full dose. That's not a policy debate to me, it's survival." },
            { role: "Public Health Researcher", view: "Prevention is cheaper and saves more lives than treatment, but it's harder to fund because the payoff isn't immediate." }
        ],
        question: "Should health systems prioritize immediate treatment or long-term prevention when resources are limited?"
    },
    economy: {
        name: "Economic Inequality",
        perspectives: [
            { role: "Minimum Wage Worker", view: "I work two jobs and still can't save. Every price increase eats into money I don't have." },
            { role: "Small Business Owner", view: "Higher wages sound fair, but if my margins disappear, I can't hire anyone — including the person asking for a raise." },
            { role: "Economist", view: "Inequality above a certain threshold slows overall growth, but forced redistribution often has unintended side effects." },
            { role: "Philanthropist", view: "Private giving matters, but it can't substitute for structural fixes like education access and fair tax policy." }
        ],
        question: "Is inequality mainly a policy failure, an economic trade-off, or both?"
    },
    migration: {
        name: "Migration & Displacement",
        perspectives: [
            { role: "Refugee", view: "I didn't choose to leave my home. I want safety and the chance to rebuild, not charity — a chance to contribute." },
            { role: "Border Town Resident", view: "Our schools and clinics are already stretched thin. I'm not against helping people, but nobody planned for this many, this fast." },
            { role: "Immigration Officer", view: "Every case is a human story, but the system processes thousands of them with rules that can't bend for each one." },
            { role: "Economist studying migration", view: "Migrants often fill critical labor gaps and grow the economy over time, even though the short-term adjustment is hard." }
        ],
        question: "How do we balance a community's capacity to absorb newcomers with a migrant's urgent need for safety?"
    },
    technology: {
        name: "Technology & Society",
        perspectives: [
            { role: "Factory Worker facing automation", view: "The machine that replaced me doesn't need healthcare or a paycheck. Nobody retrained me for what comes next." },
            { role: "AI Researcher", view: "These tools can also create entirely new kinds of work and free people from dangerous or repetitive labor — the transition just needs support." },
            { role: "Rural Resident without reliable internet", view: "Everyone talks about the digital future, but I can't even get a stable connection to apply for jobs online." },
            { role: "Privacy Advocate", view: "Convenience is being traded for surveillance, and most people don't realize how much data they're giving away." }
        ],
        question: "Who is responsible for helping people adapt when technology moves faster than institutions can respond?"
    },
    food: {
        name: "Food Security",
        perspectives: [
            { role: "Smallholder Farmer", view: "I grow enough to sell, but not enough to guarantee my own family eats well every month — droughts wipe out margins fast." },
            { role: "Nutritionist in an urban food desert", view: "It's not just about hunger — it's that healthy food is often more expensive and harder to find than processed food." },
            { role: "Agribusiness Executive", view: "Scaling production efficiently is what actually lowers food prices globally, even if it looks less romantic than small farms." },
            { role: "Food Waste Reduction Advocate", view: "We already produce enough food to feed everyone — a huge share is lost or wasted before it ever reaches a plate." }
        ],
        question: "Is food insecurity mainly a production problem, a distribution problem, or an economic access problem?"
    }
};

function showIssueDetails(issueType) {
    const issue = issuePerspectives[issueType];
    if (!issue) return;

    document.getElementById('issue-modal-title').textContent = issue.name + ' — Multiple Perspectives';

    let html = '';
    issue.perspectives.forEach(p => {
        html += `<div class="perspective-block" style="margin-bottom: 1.25rem;">
            <h4 style="margin-bottom: 0.25rem;">${p.role}</h4>
            <p style="margin: 0;">"${p.view}"</p>
        </div>`;
    });
    html += `<hr style="margin: 1.5rem 0;"><p><strong>Reflect:</strong> ${issue.question}</p>`;

    document.getElementById('issue-modal-body').innerHTML = html;
    openModal('issue-modal');
    playClickSound();
}

function setUpDailyReflectionUpdate() {
    // Check if it's a new day and update the reflection
    const lastVisit = localStorage.getItem('lastVisitDate');
    const today = new Date().toDateString();

    if (lastVisit !== today) {
        // New day, load new reflection
        loadDailyReflection();
        localStorage.setItem('lastVisitDate', today);
    }
}

// Accessibility enhancements
function setupAccessibilityEnhancements() {
    // Add focus indicators for custom elements
    const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            el.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.5)';
        });

        el.addEventListener('blur', function() {
            el.style.boxShadow = '';
        });
    });

    // Ensure all interactive elements have accessible names
    const icons = document.querySelectorAll('svg[aria-hidden="true"]');
    icons.forEach(icon => {
        // These are decorative, so aria-hidden is correct
        // No action needed
    });

    // Add landmark roles for better navigation
    const header = document.querySelector('header.site-header');
    if (header) header.setAttribute('role', 'banner');

    const main = document.querySelector('main#main-content');
    if (main) main.setAttribute('role', 'main');

    const footer = document.querySelector('footer.site-footer');
    if (footer) footer.setAttribute('role', 'contentinfo');

    // Skip to content link already handled elsewhere
}

// Initialize any service worker for offline capability (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
