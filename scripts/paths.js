'use strict'

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appManifest: resolveApp('./src/manifest.json'),
  contentScript: resolveApp('./src/contentScript/app.js')
}