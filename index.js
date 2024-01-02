#!/usr/bin/env node

const utils = require('./utils');

const editorconfig = require('./checks/editorconfig');

const directories = utils.getDirectories();

const results = [];
directories.forEach(directory => {
    results.push(...editorconfig.check(directory));
});
utils.writeToCSV(results);

console.log('Done!');
