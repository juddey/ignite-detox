const sinon = require('sinon')
const plugin = require('../plugin')

const addModule = sinon.spy()
  
// mock a context
const context = {
  ignite: { addModule }
}

test('adds the proper npm module', async () => {
  await plugin.add(context)
  
  expect(addModule.calledWith('react-native-MODULENAME', { link: true })).toEqual(true)

})
