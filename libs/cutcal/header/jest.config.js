module.exports = {
  name: 'cutcal-header',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/header',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
