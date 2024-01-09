const fs = require("fs");
const path = require("path");

function getProcessDir(directory) {
    return [
        path.resolve(directory || process.cwd()),
    ];
}

function getProcessDirs(directory) {
    const dirs = [];
    const currentDir = path.resolve(directory || process.cwd());
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
        const filePath = path.join(currentDir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            dirs.push(filePath);
        }
    }
    return dirs;
}

module.exports = {
    getProcessDir,
    getProcessDirs,
}
