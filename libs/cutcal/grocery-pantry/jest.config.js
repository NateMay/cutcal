module.exports = {
  name: 'cutcal-grocery-pantry',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/grocery-pantry',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
}
