module.exports = {
  name: 'cutcal-analyze',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/analyze',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
