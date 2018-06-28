const sinon = require('sinon')
const plugin = require('../plugin')

const addModule = sinon.spy()
const info = sinon.spy()
const write = sinon.spy()  
const run = sinon.spy()
const start = sinon.spy()
const spin = sinon.spy()
const succeed = sinon.spy()
// mock a context

const context = {
  ignite: { addModule } ,
  print: { info, spin: { start, succeed } },
  system: { run },
  filesystem: { write }
}

test('adds the proper npm module', async () => {
  await plugin.add(context)
  expect(run.callCount).toEqual(2)
  expect(succeed.callCount).toBeGreaterThanOrEqual(4)
  expect(write.callCount).toEqual(1)
  expect(addModule.calledWith('detox')).toEqual(true)
})
