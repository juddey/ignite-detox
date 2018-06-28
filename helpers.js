function detoxConfig(name) {
  return {
    configurations: {
      'ios.sim.debug': {
        binaryPath: `ios/build/Build/Products/Debug-iphonesimulator/${name}.app`,
        build: `xcodebuild -project ios/${name}.xcodeproj -scheme ${name} -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build`,
        type: "ios.simulator",
        name: "iPhone X"
      }
    },
    'runner-config': "e2e/config.json"
  }
}

const scripts = {
  'test:e2e': "detox test -c ios.sim.debug",
  'test:e2e:build': "detox build"
}

const jestAdditions = {
  "testPathIgnorePatterns": [ "<rootDir>/e2e" ]
}
module.exports = { detoxConfig, scripts, jestAdditions }  