module.exports = {
  name: 'cutcal-meal-ingredient',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/meal-ingredient',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
