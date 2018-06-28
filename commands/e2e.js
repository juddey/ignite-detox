// @cliDescription  Example Detox command
// Generates an end-to-end test in the 'e2e' directory.

module.exports = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { parameters, strings, print, ignite } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`ignite generate e2e <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const props = { name }
  
  const jobs = [{
    template: 'e2e.js.ejs',
    target: `e2e/${name}.spec.js`
  }]

  // make the templates and pass in props with the third argument here
  await ignite.copyBatch(context, jobs, props)
}
