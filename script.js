// --- Data for Username Generator ---
const adjectives = [
    "Brave", "Swift", "Mighty", "Silent", "Clever", "Fierce", "Noble", "Shadow", 
    "Cosmic", "Neon", "Crimson", "Azure", "Golden", "Silver", "Crystal", "Electric",
    "Phantom", "Mystic", "Savage", "Loyal", "Lucky", "Happy", "Frozen", "Blazing",
    "Iron", "Steel", "Dark", "Light", "Solar", "Lunar", "Stellar", "Atomic"
];

const nouns = [
    "Tiger", "Dragon", "Phoenix", "Wolf", "Eagle", "Falcon", "Bear", "Lion",
    "Ninja", "Samurai", "Wizard", "Knight", "Ranger", "Hunter", "Ghost", "Viper",
    "Titan", "Nomad", "Pixel", "Cyber", "Nexus", "Vortex", "Pulse", "Storm",
    "Blade", "Sword", "Arrow", "Shield", "Comet", "Meteor", "Galaxy", "Universe"
];

const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "_", "-"];

// --- Logic for Username Generator ---
function generateUsername() {
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSpecial = document.getElementById('include-special').checked;

    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    let username = adj + noun;

    if (includeNumbers) {
        // Add random number between 10 and 9999
        const num = Math.floor(Math.random() * 9990) + 10;
        username += num;
    }

    if (includeSpecial) {
        const char = specialChars[Math.floor(Math.random() * specialChars.length)];
        username += char;
    }

    document.getElementById('username-output').value = username;
}

// --- Logic for Password Generator ---
const charSets = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

function generatePassword() {
    const length = parseInt(document.getElementById('password-length').value);
    const hasUpper = document.getElementById('pwd-upper').checked;
    const hasLower = document.getElementById('pwd-lower').checked;
    const hasNumbers = document.getElementById('pwd-numbers').checked;
    const hasSymbols = document.getElementById('pwd-symbols').checked;

    let availableChars = '';
    if (hasUpper) availableChars += charSets.upper;
    if (hasLower) availableChars += charSets.lower;
    if (hasNumbers) availableChars += charSets.numbers;
    if (hasSymbols) availableChars += charSets.symbols;

    if (availableChars === '') {
        showToast("Please select at least one character type!", true);
        return;
    }

    let password = '';
    // Use Crypto API for better randomness
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        password += availableChars[array[i] % availableChars.length];
    }

    document.getElementById('password-output').value = password;
}

// --- Utility Functions ---
function copyToClipboard(inputId) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement.value) return;

    inputElement.select();
    inputElement.setSelectionRange(0, 99999); /* For mobile devices */

    navigator.clipboard.writeText(inputElement.value).then(() => {
        showToast("Copied to clipboard!");
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback
        document.execCommand('copy');
        showToast("Copied to clipboard!");
    });
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = isError ? '#ef4444' : '#10b981';
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial generation
    generateUsername();
    generatePassword();

    // Range slider update
    const lengthSlider = document.getElementById('password-length');
    const lengthVal = document.getElementById('length-val');
    lengthSlider.addEventListener('input', (e) => {
        lengthVal.textContent = e.target.value;
    });

    // Buttons
    document.getElementById('generate-username').addEventListener('click', generateUsername);
    document.getElementById('generate-password').addEventListener('click', generatePassword);
    
    document.getElementById('copy-username').addEventListener('click', () => copyToClipboard('username-output'));
    document.getElementById('copy-password').addEventListener('click', () => copyToClipboard('password-output'));
});
