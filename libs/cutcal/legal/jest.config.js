module.exports = {
  name: 'cutcal-legal',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/legal',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
