module.exports = {
  name: 'fdc',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/fdc',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
}