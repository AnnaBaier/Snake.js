const fs = require('fs')
const ini = require('ini')

const config = ini.parse(fs.readFileSync('./.env', 'utf-8'));

module.exports = config;
