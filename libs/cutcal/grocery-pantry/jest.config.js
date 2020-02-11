module.exports = {
  name: 'cutcal-grocery-pantry',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/grocery-pantry',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
