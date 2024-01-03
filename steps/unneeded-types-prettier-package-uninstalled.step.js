const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class UnneededTypesPrettierPackageUninstalledStep {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            tool: 'prettier',
            directory: directory,
            question: 'Is the unneeded @types/prettier package uninstalled?',
            answer: false,
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
                this.result.answer = true;
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
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = UnneededTypesPrettierPackageUninstalledStep;
