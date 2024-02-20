const { execSync } = require('child_process');

const validateEnvironment = () => {
    if (!isGitInstalled()) {
        console.error('Git is not installed');
        process.exit(1);
    }

    if (!isNpmInstalled()) {
        console.error('Npm is not installed');
        process.exit(1);
    }

    if (!isNodeInstalled()) {
        console.error('Node.js is not installed');
        process.exit(1);
    }
}

/**
 * Check if git is installed
 * @returns {boolean}
 */
const isGitInstalled = () => {
    try {
        execSync('git --version');
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Check if npm is installed
 * @returns {boolean}
 */
const isNpmInstalled = () => {
    try {
        execSync('npm --version');
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Check if node is installed
 * @returns {boolean}
 */
const isNodeInstalled = () => {
    try {
        execSync('node --version');
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = validateEnvironment;
