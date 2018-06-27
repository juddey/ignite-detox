// Ignite CLI plugin for Detox
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'detox'
const NPM_MODULE_VERSION = '8.0.0-alpha.1'

// const PLUGIN_PATH = __dirname
// const APP_PATH = process.cwd()


const add = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem } = context

  // install an NPM module and link it
  await ignite.addModule(NPM_MODULE_NAME, { link: true, version: NPM_MODULE_VERSION })

  

  // Example of copying templates/Detox to App/Detox
  // if (!filesystem.exists(`${APP_PATH}/App/Detox`)) {
  //   filesystem.copy(`${PLUGIN_PATH}/templates/Detox`, `${APP_PATH}/App/Detox`)
  // }

  // Example of patching a file
  // ignite.patchInFile(`${APP_PATH}/App/Config/AppConfig.js`, {
  //   insert: `import '../Detox/Detox'\n`,
  //   before: `export default {`
  // })
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

