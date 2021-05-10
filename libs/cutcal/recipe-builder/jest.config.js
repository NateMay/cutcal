module.exports = {
  name: 'cutcal-recipe-builder',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/recipe-builder',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
}
