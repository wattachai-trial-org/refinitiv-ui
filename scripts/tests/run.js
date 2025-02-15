#!/usr/bin/env node
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { summaryReporter } from '@web/test-runner';
import { browserstackLauncher } from '@web/test-runner-browserstack';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { env } from 'node:process';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { BrowserStack } from '../../browsers.config.js';
import { ELEMENTS_ROOT, checkElement, getElements } from '../../packages/elements/scripts/helpers/index.js';
import wtrConfig from '../../web-test-runner.config.js';
import { PACKAGES_ROOT, ROOT, error, info, success } from '../helpers/index.js';
import { useTestOptions } from './cli-options.js';
import { startQueueTestRunner, startTestRunner } from './runner.js';

// Create CLI
const cli = yargs(hideBin(process.argv)).option('package', {
  type: 'string',
  alias: 'p',
  description: 'Package name'
});

// Use shared test options for the CLI
useTestOptions(cli);

const argv = cli.argv;
const packageName = argv.package || path.basename(process.cwd()); // if no package provided, try to guess
const testAll = packageName === 'all' || packageName === undefined;
const basePath = path.join(PACKAGES_ROOT, testAll ? '*' : packageName);
const watch = argv.watch;
const snapshots = argv.updateSnapshots;
const optionBrowser = argv.browsers;
let browserstack = argv.browserstack;
const useBrowserStack = argv.browserstack && !watch;
const testCoverage = argv.includeCoverage;

// Target package or element
const target = argv._[0];
const testTarget = getElements().includes(target) ? target : packageName;

// Merge the base config and the config option from CLI
let config = {
  ...wtrConfig,
  files: [path.join(basePath, '/__test__/**/*.test.js')],
  watch,
  coverage: testCoverage,
  coverageConfig: {
    include: [`**/${packageName}/lib/**/*.js`]
  }
};

// Set up esbuild to transform modern JS to older version and avoid the issue `Could not import module`.
const esbuildConfig = { ts: true, js: true, target: 'auto' };
const tsConfigPath = path.join(basePath, 'tsconfig.json');
if (existsSync(tsConfigPath)) {
  esbuildConfig.tsconfig = tsConfigPath;
}
config.plugins.push(esbuildPlugin(esbuildConfig));

// Use HTTP2 (Safari browsers does not work with Web Test Runner)
if (env.TEST_HTTPS === 'true') {
  // Create paths
  const certsPath = path.join(ROOT, 'certs');
  const sslCert = path.join(certsPath, 'test-cert.pem');
  const sslKey = path.join(certsPath, 'test-key.pem');

  // Create certs directory, cert and key files
  if (!existsSync(certsPath)) mkdirSync(certsPath);
  if (!existsSync(sslCert) && env.TEST_SSL_CERT) writeFileSync(sslCert, env.TEST_SSL_CERT);
  if (!existsSync(sslKey) && env.TEST_SSL_KEY) writeFileSync(sslKey, env.TEST_SSL_KEY);

  success('Enable HTTPS with HTTP2');
  // Setup HTTP2 into Web Test Runner config
  config = {
    ...config,
    protocol: 'https:',
    http2: true,
    sslKey,
    sslCert
  };
}

// Handle outputs
if (argv.output === 'full') {
  config.reporters.push(summaryReporter());
} else if (argv.output === 'minimal') {
  config.browserLogs = false;
}

// Test on BrowserStack`
if (useBrowserStack) {
  // Set default browsers if not specify any browsers
  browserstack = browserstack.length ? browserstack : BrowserStack.defaultBrowsers;

  const sharedCapabilities = {
    'browserstack.user': env.BROWSERSTACK_USERNAME,
    'browserstack.key': env.BROWSERSTACK_ACCESS_KEY,
    'browserstack.idleTimeout': 1800,
    acceptInsecureCerts: true,
    project: env.BROWSERSTACK_PROJECT_NAME || 'Refinitiv UI',
    name: testTarget,
    build: `build ${env.BROWSERSTACK_BUILD || 'unknown'}`
  };

  // Add BrowserStack launchers to config
  const launchers = [];
  browserstack.forEach((option) => {
    switch (option) {
      case 'default':
        BrowserStack.defaultBrowsers.forEach((browser) => launchers.push(BrowserStack.config[browser]));
        break;
      case 'latest':
        BrowserStack.latestBrowsers.forEach((browser) => launchers.push(BrowserStack.config[browser]));
        break;
      case 'supported':
        BrowserStack.supportedBrowsers.forEach((browser) => launchers.push(BrowserStack.config[browser]));
        break;
      default:
        launchers.push(BrowserStack.config[option]);
        break;
    }
  });

  // Create BrowserStack launchers
  const browsers = [];
  const defaultLauncherNames = {
    chrome: 'Chromium',
    firefox: 'Firefox',
    safari: 'Webkit'
  };

  /**
   * Check the launcher is test on latest desktop browser
   * @param {Object} BrowserStack launcher config
   * @returns boolean
   */
  const isLatestDesktopBrowser = (launcher) => {
    return (
      (launcher.browser in defaultLauncherNames && launcher.browser_version === 'latest') ||
      launcher.os_version === BrowserStack.config.safari.os_version
    ); // for Safari use os version to checking latest
  };

  /**
   * Get launcher in default config
   * @param {string} browserName name to check with default config
   * @returns {Object} launcher config
   */
  const getDefaultLauncher = (browserName) => {
    return config.browsers.find((browser) => browser.name === defaultLauncherNames[browserName]);
  };

  launchers.forEach((launcher) => {
    // Create browserName to show as a label in the progress bar reporter
    let browserName =
      `${launcher.browser ?? launcher.browserName ?? launcher.device ?? 'unknown'}${
        launcher.browser_version ? ` ${launcher.browser_version}` : ''
      }` + ` (${launcher.os} ${launcher.os_version})`;
    browserName = browserName.charAt(0).toUpperCase() + browserName.slice(1);
    // Default desktop browsers (latest) must use Playwright launcher in the default config
    let browserLauncher = undefined;
    if (env.BROWSERSTACK_LATEST_BROWSERS_LAUNCHER === 'Playwright' && isLatestDesktopBrowser(launcher)) {
      browserLauncher = getDefaultLauncher(launcher.browser);
    } else {
      browserLauncher = browserstackLauncher({
        capabilities: { ...sharedCapabilities, ...launcher, browserName }
      });
    }
    browsers.push(browserLauncher);
  });

  config.browsers = browsers; // Set all browsers to use BrowserStack
}

// Specify browser to run the unit test & convert browser naming to playwright's one
if (optionBrowser && optionBrowser.length) {
  config.browsers = config.browsers.filter((configBrowser) => {
    let browser;
    switch (configBrowser.product) {
      case 'chromium':
        browser = 'chrome';
        break;
      case 'webkit':
        browser = 'safari';
        break;
      default:
        browser = configBrowser.product;
        break;
    }
    return optionBrowser.includes(browser);
  });
}

// Strip argv (options) out to prevent web-test-runner picking them up
process.argv = process.argv.slice(0, 2);

info(watch ? `Start Dev Server: ${testTarget}` : `Test: ${testTarget}`);

if (snapshots) {
  info(`Update and prune snapshots: ${testTarget}`);
  // Web Test Runner does not provide a config to update snapshots, so the CLI option is the only way.
  process.argv.push('--update-snapshots');
}

process.on('uncaughtExceptionMonitor', (err) => {
  if (err.message) {
    error(err.message);
  } else {
    console.error(err);
  }
});

// Run unit testing
try {
  const singleElement = checkElement(testTarget);
  if ((env.TEST_SEPARATE_ELEMENT && testTarget === 'elements') || singleElement) {
    // Test each element individually for the elements package.
    const elements = singleElement ? [testTarget] : getElements();
    for (const element of elements) {
      // Create test files pattern for current element
      const elementTestFiles = [
        path.join(ELEMENTS_ROOT, 'src', `${element}/__test__/**/*.test.js`),
        '!**/node_modules/**/*' // exclude any node modules
      ];
      await startQueueTestRunner(element, config, elementTestFiles);
    }
  } else {
    if (testTarget === 'elements') {
      config.files = [path.join(ELEMENTS_ROOT, 'src', `**/__test__/**/*.test.js`)];
    }
    await startTestRunner({ config }); // Start single runner (no queue)
  }
} catch (err) {
  error(err);
  process.exit(1);
}
