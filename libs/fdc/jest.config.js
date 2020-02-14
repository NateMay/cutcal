module.exports = {
  name: 'fdc',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/fdc',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
