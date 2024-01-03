#!/usr/bin/env node

const utils = require('./utils');
const { EditorconfigPlan } = require('./plans');
const path = require("path");

// prepare
const directories = utils.getDirectories();
const fix = process.argv.includes('--fix');

// process
const results = [];
directories.forEach(directory => {
    console.log(`Checking ${directory}`);

    const editorconfigPlan = new EditorconfigPlan(directory, path.join(__dirname, 'corporate-templates'), fix);
    results.push(...editorconfigPlan.execute());
});

// write results
const resultPath = utils.writeToCSV(results);

console.log('Done!');
console.log(`Results written to ${resultPath}`);
