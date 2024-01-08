const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class PackageJsonScriptsExist {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            group: 'prettier',
            directory: directory,
            description: 'Are the package.json scripts present?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(this.directory, 'package.json'), 'utf8'));
            const scripts = packageJson.scripts;
            if (scripts['format:check'] && scripts['format:write']) {
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
            await promisify(exec)(`npm install --save-dev prettier`, { cwd: this.directory });
            const packageJson = JSON.parse(fs.readFileSync(path.join(this.directory, 'package.json'), 'utf8'));
            packageJson.scripts = {
                'format:check': 'prettier --config ./.prettierrc.js \"./app/**/*.ts\" \"./tests/**/*.ts\"',
                'format:write': 'prettier --write --config ./.prettierrc.js \"./app/**/*.ts\" \"./tests/**/*.ts\"',
            }
            fs.writeFileSync(path.join(this.directory, 'package.json'), JSON.stringify(packageJson, null, 2));
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = PackageJsonScriptsExist;
