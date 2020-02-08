module.exports = {
  name: 'cutcal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/cutcal',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
