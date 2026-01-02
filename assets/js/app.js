/**
 * @license
 * Copyright 2023 BurmeWeb
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// BurmeWeb Application Core
class BurmeWebApp {
    constructor() {
        this.user = null;
        this.isAuthenticated = false;
        this.config = window.AppConfig || {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuthState();
        this.loadUserPreferences();
        this.setupServiceWorker();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Language selector
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => this.changeLanguage(e.target.value));
        }

        // Form submissions
        document.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    checkAuthState() {
        // Check Firebase auth state
        if (firebase.auth) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.user = user;
                    this.isAuthenticated = true;
                    this.onUserLoggedIn(user);
                } else {
                    this.user = null;
                    this.isAuthenticated = false;
                    this.onUserLoggedOut();
                }
            });
        }
    }

    onUserLoggedIn(user) {
        console.log('User logged in:', user.email);
        
        // Update UI for logged in state
        const loginLinks = document.querySelectorAll('a[href*="login.html"]');
        const registerLinks = document.querySelectorAll('a[href*="register.html"]');
        
        loginLinks.forEach(link => {
            link.textContent = 'Profile';
            link.href = 'pages/profile.html';
        });
        
        registerLinks.forEach(link => {
            link.style.display = 'none';
        });

        // Show notification
        this.showNotification(`Welcome back, ${user.displayName || user.email}!`, 'success');
        
        // Redirect from auth pages if needed
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('register.html')) {
            window.location.href = 'pages/feed.html';
        }
    }

    onUserLoggedOut() {
        console.log('User logged out');
        
        // Reset UI to logged out state
        const loginLinks = document.querySelectorAll('a[href*="profile.html"]');
        const registerLinks = document.querySelectorAll('a[href*="register.html"]');
        
        loginLinks.forEach(link => {
            link.textContent = 'Login';
            link.href = 'pages/login.html';
        });
        
        registerLinks.forEach(link => {
            link.style.display = 'inline-block';
        });

        // Redirect from protected pages
        const protectedPages = ['feed.html', 'chat.html', 'profile.html', 'admin.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage)) {
            window.location.href = '../index.html';
        }
    }

    async login(email, password) {
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                error: this.getAuthErrorMessage(error.code) 
            };
        }
    }

    async register(email, password, username) {
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            
            // Update display name
            await userCredential.user.updateProfile({
                displayName: username
            });

            // Create user data in database
            await this.createUserData(userCredential.user.uid, username, email);
            
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Registration error:', error);
            return { 
                success: false, 
                error: this.getAuthErrorMessage(error.code) 
            };
        }
    }

    async createUserData(uid, username, email) {
        try {
            const userData = {
                username: username,
                email: email,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                profileImage: '',
                bio: '',
                location: '',
                friends: [],
                groups: [],
                settings: {
                    theme: localStorage.getItem('burmeweb-theme') || 'light',
                    language: 'my',
                    notifications: true,
                    privacy: 'public'
                }
            };

            await firebase.database().ref('users/' + uid).set(userData);
            return true;
        } catch (error) {
            console.error('Error creating user data:', error);
            return false;
        }
    }

    logout() {
        return firebase.auth().signOut();
    }

    getAuthErrorMessage(errorCode) {
        const messages = {
            'auth/invalid-email': 'Invalid email address',
            'auth/user-disabled': 'This account has been disabled',
            'auth/user-not-found': 'No account found with this email',
            'auth/wrong-password': 'Incorrect password',
            'auth/email-already-in-use': 'Email already registered',
            'auth/weak-password': 'Password is too weak (min 6 characters)',
            'auth/network-request-failed': 'Network error. Please check your connection',
            'auth/too-many-requests': 'Too many attempts. Please try again later'
        };
        
        return messages[errorCode] || 'An error occurred. Please try again.';
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('burmeweb-theme', newTheme);
        
        // Save theme preference to database if logged in
        if (this.isAuthenticated && this.user) {
            this.updateUserSetting('theme', newTheme);
        }
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        if (mobileMenu && mobileMenuToggle) {
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        }
    }

    changeLanguage(lang) {
        // In a real app, this would load translation files
        console.log('Changing language to:', lang);
        
        // For now, just save preference
        localStorage.setItem('burmeweb-language', lang);
        
        if (this.isAuthenticated && this.user) {
            this.updateUserSetting('language', lang);
        }
    }

    loadUserPreferences() {
        // Load theme
        const savedTheme = localStorage.getItem('burmeweb-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Load language
        const savedLang = localStorage.getItem('burmeweb-language') || 'my';
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = savedLang;
        }
    }

    async updateUserSetting(key, value) {
        if (!this.isAuthenticated || !this.user) return;
        
        try {
            await firebase.database().ref(`users/${this.user.uid}/settings/${key}`).set(value);
        } catch (error) {
            console.error('Error updating user setting:', error);
        }
    }

    showNotification(message, type = 'info', duration = 5000) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">${message}</div>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles if not already added
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: 8px;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    min-width: 300px;
                    max-width: 500px;
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .notification-success { background: #28a745; }
                .notification-error { background: #dc3545; }
                .notification-info { background: #17a2b8; }
                .notification-warning { background: #ffc107; color: #212529; }
                .notification-close {
                    background: none;
                    border: none;
                    color: inherit;
                    font-size: 20px;
                    cursor: pointer;
                    margin-left: 15px;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to document
        document.body.appendChild(notification);
        
        // Close button event
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, duration);
        }
        
        return notification;
    }

    handleFormSubmit(e) {
        const form = e.target;
        
        if (form.id === 'loginForm') {
            e.preventDefault();
            this.handleLoginForm(form);
        } else if (form.id === 'registerForm') {
            e.preventDefault();
            this.handleRegisterForm(form);
        }
    }

    async handleLoginForm(form) {
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';
        
        const result = await this.login(email, password);
        
        if (result.success) {
            this.showNotification('Login successful!', 'success');
        } else {
            this.showNotification(result.error, 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    async handleRegisterForm(form) {
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;
        const username = form.querySelector('#username').value;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating account...';
        
        const result = await this.register(email, password, username);
        
        if (result.success) {
            this.showNotification('Account created successfully!', 'success');
        } else {
            this.showNotification(result.error, 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(registration => {
                        console.log('ServiceWorker registration successful');
                    })
                    .catch(err => {
                        console.log('ServiceWorker registration failed: ', err);
                    });
            });
        }
    }

    // Utility methods
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    truncateText(text, maxLength = 100) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.BurmeWeb = new BurmeWebApp();
});
