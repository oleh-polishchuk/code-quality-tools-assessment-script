const fs = require('fs');
const path = require('path');

class PrettierignoreExist {
    constructor(directory) {
        this.directory = directory;
        this.configPath = path.join(this.directory, '.prettierignore');
        this.result = {
            group: 'prettier',
            name: 'prettierignore-exist',
            directory: this.directory,
            description: 'Is the .prettierignore file present?',
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

module.exports = PrettierignoreExist;
