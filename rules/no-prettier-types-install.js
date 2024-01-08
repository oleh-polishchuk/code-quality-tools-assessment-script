const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class NoPrettierTypesInstall {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            group: 'prettier',
            directory: directory,
            description: 'Is the unneeded @types/prettier package uninstalled?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(this.directory, 'package.json'), 'utf8'));
            const dependencies = packageJson.dependencies;
            const devDependencies = packageJson.devDependencies;

            const typesPrettierInstalled = dependencies && dependencies['@types/prettier'];
            const typesPrettierDevInstalled = devDependencies && devDependencies['@types/prettier'];

            if (!typesPrettierInstalled && !typesPrettierDevInstalled) {
                this.result.passCheck = true;
            }

            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    async fix() {
        try {
            await promisify(exec)(`npm uninstall @types/prettier`, { cwd: this.directory });
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = NoPrettierTypesInstall;
