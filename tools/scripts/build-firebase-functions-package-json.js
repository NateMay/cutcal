/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @reference https://github.com/nrwl/nx/issues/836
 * @source https://github.com/spy4x/nx-with-firebase-functions/blob/master/tools/scripts/build-firebase-functions-package-json.js
 */

const packageJson = require('../../package.json') // Take root package.json
const fs = require('fs')
const deps = packageJson['firebase-functions-dependencies']

// Template of package.json for Firebase Functions
const firebaseFunctionsPackageJson = {
  engines: { node: '8' },
  main: 'index.js',

  // filter only dependencies we need for Firebase Functions
  dependencies: deps.reduce((acc, cur) => {
    acc[cur] = packageJson.dependencies[cur]
    return acc
  }, {})
}

// Show the package.json in the console for debugging:
console.log(
  'Firebase Functions package.json:\n',
  JSON.stringify(firebaseFunctionsPackageJson, null, 2)
)

const path = 'dist/functions/package.json' // Where to save generated package.json file

fs.writeFileSync(path, JSON.stringify(firebaseFunctionsPackageJson))
console.log(`${path} written successfully.`)
