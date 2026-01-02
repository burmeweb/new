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

// Firebase Configuration - Using your provided API keys
const firebaseConfig = {
    apiKey: "AIzaSyDRiJfxoqRfIBfKYE6o7ZdZfIdTEbk7FVU",
    authDomain: "burme-ai-assistant.firebaseapp.com",
    databaseURL: "https://burme-ai-assistant-default-rtdb.firebaseio.com",
    projectId: "burme-ai-assistant",
    storageBucket: "burme-ai-assistant.firebasestorage.app",
    messagingSenderId: "513378562144",
    appId: "1:513378562144:ios:c8572b22a1955a5f5c1305"
};

// App Configuration
const appConfig = {
    // Firebase
    firebase: firebaseConfig,
    
    // App Settings
    appName: "BurmeWeb",
    version: "1.0.0",
    defaultLanguage: "my", // Myanmar language code
    
    // API Endpoints
    api: {
        baseUrl: "https://burme-ai-assistant.firebaseio.com",
        auth: "https://identitytoolkit.googleapis.com/v1",
        storage: "https://firebasestorage.googleapis.com/v0/b/burme-ai-assistant.firebasestorage.app"
    },
    
    // Feature Flags
    features: {
        chat: true,
        groups: true,
        voiceMessages: false,
        videoCalls: false,
        darkMode: true,
        offlineMode: true
    },
    
    // UI Settings
    ui: {
        theme: {
            primaryColor: "#6a11cb",
            secondaryColor: "#2575fc",
            accentColor: "#ff9966",
            textColor: "#333333",
            backgroundColor: "#f8f9fa"
        },
        animations: {
            enabled: true,
            duration: 300
        }
    },
    
    // Storage Keys
    storageKeys: {
        userData: "burmeweb_user_data",
        authToken: "burmeweb_auth_token",
        settings: "burmeweb_settings",
        cache: "burmeweb_cache"
    }
};

// Initialize Firebase when this script loads
(function initializeFirebase() {
    try {
        // Check if firebase is available
        if (typeof firebase !== 'undefined') {
            firebase.initializeApp(firebaseConfig);
            console.log("Firebase initialized successfully");
            
            // Enable persistence for offline support
            if (firebase.firestore) {
                firebase.firestore().enablePersistence()
                    .catch((err) => {
                        console.warn("Firestore persistence failed:", err);
                    });
            }
        } else {
            console.warn("Firebase SDK not loaded yet");
        }
    } catch (error) {
        console.error("Firebase initialization error:", error);
    }
})();

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { firebaseConfig, appConfig };
} else {
    window.AppConfig = appConfig;
    window.FirebaseConfig = firebaseConfig;
        }
