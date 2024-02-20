const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class PreCommitHookInstall {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            group: 'prettier',
            name: 'pre-commit-hook-install',
            directory: directory,
            description: 'Is the pre-commit hook installed?',
            passCheck: false,
        };
    }

    check() {
        try {
            const preCommitHookPath = path.join(this.directory, '.husky', 'pre-commit');
            this.result.passCheck = fs.existsSync(preCommitHookPath);
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    async fix() {
        try {
            if (!await this.isGitInitialized()) {
                await this.initializeGit();
            }
            await promisify(exec)(`npm_config_yes=true npx husky-init@8.0.0 --yes`, { cwd: this.directory });
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    /// Helper methods

    async isGitInitialized() {
        try {
            await promisify(exec)(`git rev-parse --is-inside-work-tree`, { cwd: this.directory });
            return true;
        } catch (e) {
            return false;
        }
    }

    async initializeGit() {
        try {
            await promisify(exec)(`git init`, { cwd: this.directory });
            return true;
        } catch (e) {
            return false;
        }
    }
}

module.exports = PreCommitHookInstall;
