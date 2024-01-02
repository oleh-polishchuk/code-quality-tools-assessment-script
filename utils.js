const fs = require('fs');
const path = require('path');

function getDirectories() {
    const content = fs.readdirSync(process.cwd());
    const directories = content
        .filter(file => {
            try {
                return fs.statSync(path.join(process.cwd(), file)).isDirectory();
            } catch (e) {
                return false;
            }
        }).map(dir => {
            return path.join(process.cwd(), dir);
        });

    return directories;
}

function writeToCSV(results) {
    const header = 'tool,directory,question,answer';
    const data = results
        .map(result => {
            return `${result.tool},${result.directory},${result.question},${result.answer}`;
        })
        .join('\n');
    const csv = `${header}\n${data}`;
    fs.writeFileSync(path.join(process.cwd(), 'results.csv'), csv);
}

module.exports = {
    getDirectories: getDirectories,
    writeToCSV: writeToCSV,
}
