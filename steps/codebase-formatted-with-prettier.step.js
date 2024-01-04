const promisify = require('util').promisify;
const exec = require('child_process').exec;

class CodebaseFormattedWithPrettierStep {

    constructor(directory) {
        this.directory = directory;
        this.result = {
            tool: 'prettier',
            directory: this.directory,
            question: 'Is the codebase formatted with prettier?',
            answer: false,
        };
    }

    async check() {
        try {
            const { stdout } = await promisify(exec)(`./node_modules/.bin/prettier . --check`, { cwd: this.directory });
            this.result.answer = stdout.includes('All matched files use Prettier code style!');
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    async fix() {
        try {
            const { stdout } = await promisify(exec)(`./node_modules/.bin/prettier . --write`, { cwd: this.directory });
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = CodebaseFormattedWithPrettierStep;
