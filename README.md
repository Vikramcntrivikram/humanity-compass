# Humanity Compass

An interactive platform to develop empathy, understand complex global issues from multiple perspectives, and find meaningful ways to contribute to positive change.

## Features

- Interactive perspective-taking exercises
- Multi-perspective exploration of global issues
- Personalized action pathfinder
- Reflection journal and growth tracking
- Offline-first functionality with Service Worker
- Multilingual support (English, Spanish, French)
- Dark/light mode toggle
- Accessibility compliant (WCAG 2.1 AA)
- Fully static - no APIs or backend required
- Deployable anywhere with static hosting

## Deploying to GitHub Pages

Follow these steps to deploy Humanity Compass to GitHub Pages:

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" button in the top-right corner and select "New repository"
3. Name your repository (e.g., `humanity-compass`)
4. Make sure the repository is **Public** (GitHub Pages requires public repositories for free accounts)
5. Initialize with a README (optional)
6. Click "Create repository"

### Step 2: Upload the Website Files

You have two options:

#### Option A: Using GitHub Web Interface
1. On your new repository page, click "Add file" → "Upload files"
2. Drag and drop all files from the `humanity-compass` folder (not the folder itself)
3. Make sure to include all files and folders: `index.html`, `css/`, `js/`, `assets/`, etc.
4. Scroll down and add a commit message like "Initial commit"
5. Click "Commit changes"

#### Option B: Using Git Command Line
```bash
# Clone your new repository
git clone https://github.com/your-username/humanity-compass.git
cd humanity-compass

# Copy all website files into this directory
cp -r /path/to/humanity-compass/* .

# Add, commit, and push
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click the "Settings" tab
3. In the left sidebar, click "Pages"
4. Under "Source", select the branch you want to deploy from (usually `main` or `master`)
5. Select the folder (`/root` for the root of the repository)
6. Click "Save"
7. GitHub will provide your site URL (typically `https://your-username.github.io/humanity-compass/`)

### Step 4: Verify Deployment

Wait a few minutes for GitHub to build and deploy your site, then visit the URL provided in the Pages section.

## Local Development

To preview the site locally:

1. Make sure you have a web server installed (Python, Node.js, etc.)
2. Navigate to the project directory
3. Start a simple server:
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve` or `python -m http.server`
4. Open your browser to `http://localhost:8000`

## Customization

### Changing Content
- Edit `index.html` to modify text content
- Update CSS files in `css/` directory for styling changes
- Modify JavaScript files in `js/` directory for functionality changes

### Adding Languages
1. Create language JSON files in a `locales/` directory
2. Update the language switch functionality in `main.js`
3. Add language options to the language switch button

### Adding New Issues
1. Add new issue cards to the issue grid in `index.html`
2. Add issue data to the `getIssueData` function in `issues.js`
3. Add appropriate icons/images to the `assets/` directory

## Built With

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript (no frameworks)
- Service Worker APIs for offline functionality
- Responsive design principles

## Developed By

**VIKRAM CN TRIVIKRAM**

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by the need for greater global understanding and empathy
- Built with accessibility and inclusivity as core principles
- Designed to be completely deployable on static hosting platforms