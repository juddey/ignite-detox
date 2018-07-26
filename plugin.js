// Ignite CLI plugin for Detox
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'detox'
const NPM_MODULE_VERSION = '8.0.0'
const jetpack = require('fs-jetpack')
const PACKAGE_JSON = process.env.NODE_ENV === 'test'
  ? { 'devDependencies': { jest: '^2.0.0'} }
  : jetpack.read('./package.json', 'json')
const which = require('which')
const os = require('os')
const R = require('ramda')
const helpers = require('./helpers')

// const PLUGIN_PATH = __dirname
// const APP_PATH = process.cwd()

const add = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem, print, system } = context
  const spinner = process.env.NODE_ENV === 'test' ? print.spin : print.spin()

  // Check for OSX only.
  if (os.platform != 'darwin') {
    throw new Error('Sorry! Only OS/X supported right now.')
  }

  // Check OSX setup
  if (os.platform = 'darwin') {
    ret = await which.sync('brew', { nothrow: true })
    if (!ret) { throw new Error("You'll need to install brew to continue.") }

    ret = await which.sync('applesimutils', { nothrow: true })
    if (ret) { print.info('Apple Sim Utils Installed. Onward!') } else {
      spinner.start('Installing Apple Sim Utils')
      ret = await system.run('brew tap wix/brew && brew install applesimutils')
      if (ret.stderr) {
        spinner.fail('Installing Apple Sim Utils')
        spinner.stop()
        return
      } else { spinner.succeed('Installed Apple Sim Utils') }
    }
  } // End IOS specific requirements

  spinner.start('Installing Detox Cli globally')
  const detoxCli = await (system.run(`npm install -g detox-cli`))
  if (R.prop('stderr', detoxCli)) {
    spinner.fail('Failed to Install Detox Cli')
    spinner.stop()
    return
  } else { spinner.succeed('Installed Detox Cli') }

  // Check Jest is installed
  if (R.keys(PACKAGE_JSON.devDependencies).includes('jest')) {
    spinner.succeed('Found Jest Config in package.json') 
} else { throw new Error("Oops! Can't find jest installed") }

  spinner.start('Adding Detox key to package.json')
  // Patch package.json with detox key
  let newJSON = R.merge(PACKAGE_JSON, { detox: helpers.detoxConfig(PACKAGE_JSON.name) })
  let scripts = R.prop('scripts', PACKAGE_JSON)
  let newScripts = { scripts: R.merge(scripts, helpers.scripts) }
  let jestKey = R.prop('jest', newJSON)
  let newJest = { jest: R.merge(jestKey, helpers.jestAdditions) }
  fileJSON = R.mergeAll([newJSON, newScripts, newJest])
  await filesystem.write('package.json', fileJSON, { jsonIndent: 2 })
  spinner.succeed('Added Detox key to package.json')

  await ignite.addModule(NPM_MODULE_NAME, { version: NPM_MODULE_VERSION })

  spinner.start('Setting up for jest')
  await system.run('detox init -r jest')
  spinner.succeed('Set up for Jest')

  spinner.succeed('Ready to build your app for testing!')
  print.info("Run 'detox build' to kick off a build prior to testing")
  print.info('or try ignite g e2e <testname> to scaffold a new test.')

}

/**
 * Remove yourself from the project.
 */
const remove = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem } = context

  // remove the npm module and unlink it
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: true })

  // Example of removing App/Detox folder
  // const removeDetox = await context.prompt.confirm(
  //   'Do you want to remove App/Detox?'
  // )
  // if (removeDetox) { filesystem.remove(`${APP_PATH}/App/Detox`) }

  // Example of unpatching a file
  // ignite.patchInFile(`${APP_PATH}/App/Config/AppConfig.js`, {
  //   delete: `import '../Detox/Detox'\n`
  // )
}

// Required in all Ignite CLI plugins
module.exports = { add, remove }
