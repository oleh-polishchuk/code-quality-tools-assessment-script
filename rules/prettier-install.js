const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class PrettierInstall {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            group: 'prettier',
            directory: directory,
            description: 'Is the prettier package installed?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(this.directory, 'package.json'), 'utf8'));
            const devDependencies = packageJson.devDependencies;

            const prettierDevInstalled = devDependencies && devDependencies.prettier;
            if (prettierDevInstalled) {
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
            await promisify(exec)(`npm uninstall prettier`, { cwd: this.directory });
            await promisify(exec)(`npm install --save-dev prettier`, { cwd: this.directory });
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = PrettierInstall;
