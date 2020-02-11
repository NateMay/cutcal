module.exports = {
  name: 'cutcal-recipe-builder',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/recipe-builder',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
