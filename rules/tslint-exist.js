const fs = require('fs');
const path = require('path');

class TSLintConfigExist {
    constructor(directory) {
        this.directory = directory;
        this.configPath = path.join(this.directory, 'tslint.json');
        this.result = {
            group: 'tslint',
            directory: this.directory,
            description: 'Is the tslint.json config file present?',
            passCheck: false,
        };
    }

    check() {
        try {
            this.result.passCheck = fs.existsSync(this.configPath);
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    fix() {
        try {
            fs.writeFileSync(this.configPath, '');
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = TSLintConfigExist;
