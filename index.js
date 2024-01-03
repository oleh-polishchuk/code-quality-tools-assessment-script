#!/usr/bin/env node

const utils = require('./utils');
const { EditorconfigPlan, PrettierPlan, TSLintPlan } = require('./plans');
const path = require("path");

// prepare
const directories = utils.getDirectories();
const fix = process.argv.includes('--fix');

// process
const results = [];
directories.forEach(directory => {
    console.log(`Checking ${directory}`);

    const corporateTemplatesPath = path.join(__dirname, 'corporate-templates');

    const editorconfigPlan = new EditorconfigPlan(directory, corporateTemplatesPath, fix);
    const prettierPlan = new PrettierPlan(directory, corporateTemplatesPath, fix);
    const tslintPlan = new TSLintPlan(directory, corporateTemplatesPath, fix);

    results.push(...editorconfigPlan.execute());
    results.push(...prettierPlan.execute());
    results.push(...tslintPlan.execute());
});

// write results
const resultPath = utils.writeToCSV(results);

console.log('Done!');
console.log(`Results written to ${resultPath}`);
