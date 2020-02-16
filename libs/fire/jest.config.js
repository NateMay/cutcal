module.exports = {
  name: 'fire',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/fire',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
}
