#!/usr/bin/env node
'use strict'

const { Parcel } = require('@parcel/core');
const paths = require('./paths');
const chalk = require('chalk');
const clearConsole = require('react-dev-utils/clearConsole');

const isInteractive = process.stdout.isTTY;

const bundler = new Parcel({
  entries: paths.appManifest,
  defaultConfig: '@parcel/config-webextension',
  serveOptions: {
    port: 3000
  },
  hmrOptions: {
    port: 3000
  }
});

bundler.watch((err, event) => {
  if (isInteractive) {
    clearConsole();
  }

  if (err) {
    throw err;
  }
  if (event.type === 'buildSuccess') {
    let bundles = event.bundleGraph.getBundles();

    console.log(`✨ ${chalk.green(`Built ${bundles.length} bundles in ${event.buildTime}ms!`)}`);
  } else if (event.type === 'buildFailure') {
    console.log(event.diagnostics);
  }

}).then(subscription => {
  ['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, async function () {
      await subscription.unsubscribe();
      process.exit();
    });
  });

}).catch(err => {
  if (err && err.message) {
    console.log(err.message);
  }
  process.exit(1);
});


