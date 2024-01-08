const fs = require('fs');
const path = require('path');

const CONFIG_FILE_NAME = '.code-inspector.json';

async function readConfig(configDir, options) {
    // read
    const config = await loadConfig(configDir);

    // handle extends
    let extendedConfigs = { rules: [], reporters: [] };
    if (config.extends) {
        for (const packageName of config.extends) {
            const config = await readConfig(
                path.resolve(options.packageDir, 'node_modules', packageName),
                options
            );
            extendedConfigs.rules = merge(
                extendedConfigs.rules,
                config.rules,
            );
            extendedConfigs.reporters = merge(
                extendedConfigs.reporters,
                config.reporters,
            );
        }
    }

    // transform rules
    const rules = merge(
        extendedConfigs.rules,
        config.rules,
    );

    // transform reporters
    const reporters = merge(
        extendedConfigs.reporters,
        config.reporters,
    );

    return { rules, reporters }
}

// helpers

async function loadConfig(configDir) {
    const configPath = path.resolve(configDir, CONFIG_FILE_NAME);
    const configContent = await fs.promises.readFile(configPath, 'utf-8');
    const configObject = JSON.parse(configContent);
    const config = {
        extends: configObject.extends || [],
        rules: setAttributes(
            toArray(configObject.rules || {}),
            configDir,
            'rules'
        ),
        reporters: setAttributes(
            configObject.reporters || [],
            configDir,
            'reporters'
        ),
    };
    return config;
}

function setAttributes(items, configDir, src) {
    return items.map(item => {
        return item.name
            ? {
                name: item.name,
                value: item.value,
                src: path.join(configDir, src, item.name)
            }
            : {
                name: item,
                value: true,
                src: path.join(configDir, src, item)
            }
    });
}

function toArray(rules = {}) {
    return Object
        .entries(rules)
        .map(([key, value]) => ({ name: key, value: value === 'on', }));
}

function merge(extendedRules = [], rules = []) {
    const result = [...extendedRules];
    for (const rule of rules) {
        const existingRule = result.find(r => r.name === rule.name);
        if (existingRule) {
            existingRule.value = rule.value;
            existingRule.src = rule.src;
        } else {
            result.push(rule);
        }
    }
    return result;
}

module.exports = {
    readConfig,
}
