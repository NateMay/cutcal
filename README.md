# CutCal Monorepo

## Firebase Functions

Functions need to deploy with a unique package.json, however, we want a single package.json to ensure version compatibility. To achieve this, we added a `firebase-functions-dependencies` array to the root package.json. When deploying the cloud functions, we execute the script `build-firebase-functions-package-json.js`. This composes the package.json dynamically, but the drawback is that we have to maintain the `firebase-functions-dependencies` array manually.

## DietStats
