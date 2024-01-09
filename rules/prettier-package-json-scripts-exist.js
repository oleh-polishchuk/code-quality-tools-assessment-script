const fs = require('fs');
const path = require('path');

class PrettierPackageJsonScriptsExist {
    constructor(directory) {
        this.directory = directory;
        this.packageJsonPath = path.join(directory, 'package.json');
        this.result = {
            group: 'prettier',
            name: 'prettier-package-json-scripts-exist',
            directory: directory,
            description: 'Are the prettier package.json scripts present?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJsonContent = fs.readFileSync(this.packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            const scripts = packageJson.scripts;
            if (scripts['format:check'] && scripts['format:write']) {
                this.result.passCheck = true;
            }
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    async fix() {
        try {
            const packageJsonContent = fs.readFileSync(this.packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            packageJson.scripts = {
                'format:check': 'prettier --config ./.prettierrc.js \"./app/**/*.ts\" \"./tests/**/*.ts\"',
                'format:write': 'prettier --write --config ./.prettierrc.js \"./app/**/*.ts\" \"./tests/**/*.ts\"',
            }
            fs.writeFileSync(this.packageJsonPath, JSON.stringify(packageJson, null, 2));
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = PrettierPackageJsonScriptsExist;
