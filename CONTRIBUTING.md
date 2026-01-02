Contributing to BurmeWeb

Thank you for your interest in contributing to BurmeWeb! This document outlines the process for contributing to the project and our development guidelines.

Table of Contents

1. Code of Conduct
2. Getting Started
3. Development Workflow
4. Coding Standards
5. Commit Guidelines
6. Pull Request Process
7. Testing
8. Documentation
9. Bug Reports
10. Feature Requests
11. Security Issues
12. Community

Code of Conduct

Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

Our Standards

Examples of behavior that contributes to a positive environment:

· Using welcoming and inclusive language
· Being respectful of differing viewpoints and experiences
· Gracefully accepting constructive criticism
· Focusing on what is best for the community
· Showing empathy towards other community members

Examples of unacceptable behavior:

· The use of sexualized language or imagery, and sexual attention or advances
· Trolling, insulting or derogatory comments, and personal or political attacks
· Public or private harassment
· Publishing others' private information without explicit permission
· Other conduct which could reasonably be considered inappropriate in a professional setting

Enforcement

Project maintainers are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, threatening, offensive, or harmful.

Getting Started

Prerequisites

· Git
· A GitHub account
· A modern web browser (Chrome, Firefox, Safari, Edge)
· Text editor or IDE (VS Code, Sublime Text, etc.)
· Basic knowledge of HTML, CSS, and JavaScript

Setting Up Development Environment

1. Fork the Repository
   ```bash
   # Navigate to: https://github.com/burmeweb/burmeweb.github.io
   # Click the "Fork" button in the top-right corner
   ```
2. Clone Your Fork
   ```bash
   git clone https://github.com/YOUR_USERNAME/burmeweb.github.io.git
   cd burmeweb.github.io
   ```
3. Add Upstream Remote
   ```bash
   git remote add upstream https://github.com/burmeweb/burmeweb.github.io.git
   ```
4. Install Dependencies
   ```bash
   # No package manager required for basic setup
   # For development tools (optional):
   npm install
   ```
5. Set Up Firebase (Optional for Development)
   · Create a Firebase project at console.firebase.google.com
   · Enable Authentication (Email/Password)
   · Enable Realtime Database
   · Copy your Firebase config to config/app.config.js
6. Run Local Server
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if live-server is installed)
   npx live-server .
   
   # Or simply open index.html in your browser
   ```

Development Workflow

Branch Naming Convention

Use the following format for branch names:

```
[type]/[short-description]
```

Types:

· feat/ - New feature
· fix/ - Bug fix
· docs/ - Documentation changes
· style/ - Code style changes (formatting, missing semi-colons, etc.)
· refactor/ - Code refactoring
· test/ - Adding or updating tests
· chore/ - Maintenance tasks, dependencies updates

Examples:

```
feat/user-profile-page
fix/login-form-validation
docs/api-documentation
```

Workflow Steps

1. Sync with Upstream
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```
2. Create Feature Branch
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. Make Changes
   · Write your code
   · Add tests if applicable
   · Update documentation
   · Ensure code follows our standards
4. Test Your Changes
   · Test in multiple browsers
   · Test responsive behavior
   · Test with different user scenarios
5. Commit Changes
   ```bash
   git add .
   git commit -m "feat: add user profile page"
   ```
6. Push to Your Fork
   ```bash
   git push origin feat/your-feature-name
   ```
7. Create Pull Request
   · Go to your fork on GitHub
   · Click "Compare & pull request"
   · Fill out the PR template
   · Submit the PR

Coding Standards

HTML Guidelines

1. Semantic HTML
   ```html
   <!-- Good -->
   <header>
     <nav>
       <ul>
         <li><a href="/">Home</a></li>
       </ul>
     </nav>
   </header>
   
   <!-- Bad -->
   <div class="header">
     <div class="nav">
       <div class="nav-item"><a href="/">Home</a></div>
     </div>
   </div>
   ```
2. Accessibility
   · Use proper ARIA labels
   · Ensure keyboard navigation works
   · Provide alt text for images
   · Use proper heading hierarchy
3. Indentation: 2 spaces

CSS Guidelines

1. BEM Methodology
   ```css
   /* Block */
   .button {}
   
   /* Element */
   .button__icon {}
   
   /* Modifier */
   .button--primary {}
   .button--disabled {}
   ```
2. Organization
   ```css
   /* 1. Variables */
   :root {
     --color-primary: #6a11cb;
   }
   
   /* 2. Reset/Normalize */
   * { margin: 0; }
   
   /* 3. Base Elements */
   body { font-family: sans-serif; }
   
   /* 4. Layout */
   .container { max-width: 1200px; }
   
   /* 5. Components */
   .button { /* styles */ }
   
   /* 6. Utilities */
   .text-center { text-align: center; }
   ```
3. Mobile First Approach
   ```css
   /* Base styles (mobile) */
   .element { width: 100%; }
   
   /* Tablet */
   @media (min-width: 768px) {
     .element { width: 50%; }
   }
   
   /* Desktop */
   @media (min-width: 1024px) {
     .element { width: 25%; }
   }
   ```

JavaScript Guidelines

1. ES6+ Features
   ```javascript
   // Use const/let instead of var
   const user = { name: 'John' };
   let count = 0;
   
   // Arrow functions
   const add = (a, b) => a + b;
   
   // Template literals
   const greeting = `Hello, ${user.name}!`;
   
   // Destructuring
   const { name, email } = user;
   
   // Spread operator
   const newUser = { ...user, id: 1 };
   ```
2. Async/Await
   ```javascript
   // Good
   async function fetchUser() {
     try {
       const response = await fetch('/api/user');
       const data = await response.json();
       return data;
     } catch (error) {
       console.error('Error:', error);
     }
   }
   
   // Avoid
   function fetchUser() {
     return fetch('/api/user')
       .then(response => response.json())
       .catch(error => console.error('Error:', error));
   }
   ```
3. Error Handling
   ```javascript
   function processUserData(data) {
     if (!data || !data.user) {
       throw new Error('Invalid user data');
     }
     
     try {
       // Process data
     } catch (error) {
       console.error('Processing error:', error);
       // Handle gracefully
     }
   }
   ```
4. File Organization
   ```
   assets/js/
   ├── app.js              # Core application
   ├── auth.js             # Authentication logic
   ├── feed.js             # News feed functionality
   ├── chat.js             # Chat functionality
   ├── group.js            # Group management
   ├── admin.js            # Admin panel
   ├── ui.js               # UI interactions
   └── storage.js          # Data storage
   ```

Myanmar Language Support

1. Font Stack
   ```css
   font-family: 'Noto Sans Myanmar', 'Pyidaungsu', 'Myanmar3', sans-serif;
   ```
2. Unicode Support
   ```javascript
   // Ensure proper encoding
   const myanmarText = 'မြန်မာစာသား';
   
   // Use proper string methods
   const length = [...myanmarText].length; // Correct
   const badLength = myanmarText.length;   // Incorrect for some characters
   ```
3. RTL/LTR Mixing
   ```css
   .mixed-text {
     direction: ltr;
     unicode-bidi: embed;
   }
   ```

Commit Guidelines

Commit Message Format

```
type(scope): subject

body

footer
```

Types

· feat: New feature
· fix: Bug fix
· docs: Documentation
· style: Formatting, missing semi-colons, etc.
· refactor: Code refactoring
· test: Adding tests
· chore: Maintenance

Examples

```
feat(auth): add email verification flow

- Add email verification modal
- Implement verification API call
- Add success/error handling

Closes #123
```

```
fix(chat): message timestamp display

- Fix timezone conversion issue
- Add 24-hour format option
- Update timestamp styling

Fixes #456
```

```
docs(readme): update installation instructions

- Add Firebase setup steps
- Include environment variables guide
- Fix broken links
```

Pull Request Process

PR Template

When creating a PR, please use this template:

```markdown
## Description
<!-- Describe your changes in detail -->

## Related Issue
<!-- Link to the issue this PR addresses -->
Fixes #(issue number)

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement
- [ ] Test updates

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] All tests pass locally

## Screenshots (if applicable)
<!-- Add screenshots to help explain your changes -->

## Testing Instructions
<!-- Steps to test your changes -->
1. 
2. 
3. 
```

Review Process

1. Initial Review (Within 48 hours)
   · A maintainer will review your PR
   · Feedback will be provided if changes are needed
   · PR may be labeled (needs-work, approved, etc.)
2. Address Feedback
   · Make requested changes
   · Push updates to the same branch
   · The PR will update automatically
3. Final Review
   · Maintainers conduct final review
   · PR is merged when approved
   · You'll receive notification

Testing

Manual Testing Checklist

Before submitting changes, test:

1. Browser Compatibility
   · Chrome (latest)
   · Firefox (latest)
   · Safari (latest)
   · Edge (latest)
2. Responsive Design
   · Mobile (320px - 480px)
   · Tablet (768px - 1024px)
   · Desktop (1024px+)
   · Landscape orientation
3. User Flows
   · Registration process
   · Login/logout
   · Creating/editing posts
   · Sending/receiving messages
   · Group creation/management
4. Accessibility
   · Keyboard navigation
   · Screen reader compatibility
   · Color contrast
   · Focus indicators

Automated Testing (Future)

We plan to implement:

· Unit tests (Jest)
· Integration tests (Cypress)
· End-to-end tests

Documentation

Code Documentation

1. JavaScript Documentation
   ```javascript
   /**
    * Authenticates a user with email and password
    * @param {string} email - User's email address
    * @param {string} password - User's password
    * @returns {Promise<Object>} Promise resolving to user data
    * @throws {Error} If authentication fails
    * @example
    * const user = await login('user@example.com', 'password123');
    */
   async function login(email, password) {
     // Implementation
   }
   ```
2. CSS Documentation
   ```css
   /* 
    * Primary button component
    * Use for main actions (submit, confirm, etc.)
    * 
    * Example:
    * <button class="button button--primary">Submit</button>
    */
   .button--primary {
     background-color: var(--color-primary);
     color: white;
   }
   ```

Project Documentation

Keep these files updated:

· README.md - Main project documentation
· CONTRIBUTING.md - This file
· CODE_OF_CONDUCT.md - Community guidelines
· CHANGELOG.md - Version history
· Wiki pages (if applicable)

Bug Reports

Before Submitting a Bug Report

1. Check if the bug has already been reported
2. Update to the latest version
3. Clear browser cache
4. Test in incognito/private mode

Bug Report Template

```markdown
## Bug Description
<!-- Clear and concise description -->

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
<!-- What should happen -->

## Actual Behavior
<!-- What actually happens -->

## Screenshots/Video
<!-- If applicable -->

## Environment
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Device: [e.g., Desktop, iPhone 12]
- Version: [e.g., 1.2.0]

## Console Errors
<!-- Copy any console errors -->

## Additional Context
<!-- Any other relevant information -->
```

Feature Requests

Before Submitting a Feature Request

1. Check if the feature already exists
2. Consider if it aligns with project goals
3. Think about implementation complexity

Feature Request Template

```markdown
## Problem Statement
<!-- What problem does this solve? -->

## Proposed Solution
<!-- Describe your solution -->

## Alternatives Considered
<!-- Other ways to solve the problem -->

## User Stories
<!-- How would users benefit? -->
- As a [type of user], I want [goal] so that [benefit]

## Mockups/Designs
<!-- If applicable -->

## Technical Considerations
<!-- Implementation details, dependencies, etc. -->

## Additional Context
<!-- Any other information -->
```

Security Issues

Reporting Security Vulnerabilities

DO NOT create public issues for security vulnerabilities.

Instead, please email: security@burmeweb.com

Include:

· Detailed description of the vulnerability
· Steps to reproduce
· Potential impact
· Suggested fix (if any)

Security Response

1. Acknowledgment (Within 24 hours)
   · You'll receive confirmation
   · Issue will be investigated
2. Assessment (Within 72 hours)
   · Severity determined
   · Fix timeline established
3. Fix Development
   · Patch created and tested
   · Coordinated disclosure
4. Release
   · Security update released
   · Credit given (if desired)

Community

Communication Channels

1. GitHub Issues - Bug reports and feature requests
2. Discussion Board - General discussions
3. Email - contact@burmeweb.com
4. Social Media - Links in README

Getting Help

1. Check Documentation First
   · README
   · Wiki
   · Code comments
2. Search Existing Issues
   · Your question might already be answered
3. Ask Clear Questions
   · Describe what you're trying to do
   · Include relevant code
   · Show what you've tried

Recognition

Contributors will be recognized in:

· Project README
· Release notes
· Contributor hall of fame

License

By contributing, you agree that your contributions will be licensed under the project's Apache License 2.0.

Questions?

If you have questions about contributing, please:

1. Check this document first
2. Search existing issues
3. Create a new discussion topic

---

Thank you for contributing to BurmeWeb! Your efforts help make Myanmar's digital community stronger. ❤️
